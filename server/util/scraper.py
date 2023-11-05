import json
import os
import numpy as np

from youtube_transcript_api import YouTubeTranscriptApi
from pytube import Playlist
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class Scraper:

    @classmethod
    def build_vector_db(cls, transcripts):
        model = SentenceTransformer('all-MiniLM-L12-v2')
        vector_db = {}

        if not os.path.exists('transcripts_model_cache'):
            os.mkdir('transcripts_model_cache')

        for video_id, transcript in transcripts.items():
            cache_path: str = f'transcripts_model_cache/{video_id}.npy'
            if os.path.exists(cache_path):
                print(f'Found cached model for {video_id}')
                embeddings = np.load(cache_path, allow_pickle=True)
                sentences = [entry['text'] for entry in transcript]
            else:
                print(f'Building model for {video_id}')
                sentences = [entry['text'] for entry in transcript]
                embeddings = model.encode(sentences, convert_to_tensor=False)
                np.save(cache_path, embeddings)  # Save the numpy embeddings

            vector_db[video_id] = {
                'sentences': sentences,
                'embeddings': embeddings
            }

        return vector_db

    @classmethod
    def search(cls, vector_db, query, transcripts, top_k=3):
        model = SentenceTransformer('all-MiniLM-L12-v2')
        query_embedding = model.encode([query], convert_to_tensor=False)
        similarities = {}
        for video_id, data in vector_db.items():
            scores = cosine_similarity(
                query_embedding,
                data['embeddings']
            )[0]
            for i, score in enumerate(scores):
                similarities[f'{video_id}_{i}'] = score
        sorted_similarities = sorted(similarities.items(), key=lambda x: x[1], reverse=True)
        top_results = sorted_similarities[:top_k]

        results = []
        for result in top_results:
            video_id, idx = result[0].rsplit('_', 1)
            idx = int(idx)
            print(f'Video: {video_id}, Timestamp: {transcripts[video_id][idx]["start"]}, Text: {vector_db[video_id]["sentences"][idx]}')
            
            contents: list[dict] = []
            def print_context(sentences, selected_idx, num_context=5):
                for i in range(selected_idx - num_context, selected_idx + num_context + 1):
                    if i == selected_idx:
                        contents.append({'text': sentences[i], 'selected': True})
                        print(f">>: {sentences[i]}")
                    else:
                        contents.append({'text': sentences[i], 'selected': False})
                        print(f">: {sentences[i]}")
            print_context(vector_db[video_id]["sentences"], idx)
            results.append({
                'video_id': f"https://www.youtube.com/embed/{video_id}?start={int(transcripts[video_id][idx]['start'])}",
                'timestamp': transcripts[video_id][idx]["start"],
                'contents': contents,
                'score': str(result[1])
            })
        print(results)
        return results

    @classmethod
    def download_transcript(cls, video_id: str) -> list[dict[str, any]]:
        yt_raw_transcript: list[dict[str, any]] = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_holder: list[dict[str, any]] = []
        for entry in yt_raw_transcript:
            transcript_holder.append(
                {
                    'start': entry['start'],
                    'end': entry['start'] + entry['duration'],
                    'duration': entry['duration'],
                    'text': entry['text']
                }
            )

        with open(f'transcripts/{video_id}.json', 'w') as file:
            file.write(json.dumps(transcript_holder))
        return transcript_holder

    @classmethod
    def get_transcript(cls, video_url: str) -> list[dict[str, any]]:
        if not os.path.exists('transcripts'):
            os.mkdir('transcripts')

        video_id: str = video_url.split('v=')[-1]
        if not os.path.exists(f'transcripts/{video_id}.json'):
            print(f'Downloading transcript for {video_id}')
            transcript: list[dict[str, any]] = cls.download_transcript(video_id)
            return transcript
        else:
            print(f'Found transcript for {video_id}')
            with open(f'transcripts/{video_id}.json', 'r') as file:
                transcript: list[dict[str, any]] = json.loads(file.read())
            return transcript

    @classmethod
    def get_video_links(cls, playlist_url):
        playlist = Playlist(playlist_url)
        video_links = [video.watch_url for video in playlist.videos]
        return video_links

    @classmethod
    def process_request(cls, type: str, content: str | list[str], question: str):
        if type == 'playlist':
            video_links = cls.get_video_links(content)
            transcripts = {}
            for link in video_links:
                video_id = link.split('v=')[-1]
                try:
                    transcripts[video_id] = cls.get_transcript(link)
                except Exception as e:
                    print(f"Error downloading transcript for {video_id}")
            vector_db = cls.build_vector_db(transcripts)
            return cls.search(vector_db, question, transcripts)
        elif type == 'videos':
            transcripts = {}
            for video_id in content:
                video_id = video_id.split('v=')[-1]
                try:
                    transcripts[video_id] = cls.get_transcript(video_id)
                except Exception as e:
                    print(f"Error downloading transcript for {video_id}")
            vector_db = cls.build_vector_db(transcripts)
            return cls.search(vector_db, question, transcripts)
    
# process_request('videos', ['https://www.youtube.com/watch?v=8719-T6J4R0'], 'What is the meaning of life?')
# Scraper.process_request('playlist', "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev", 'What is a finite state?')

# video_id = video_url.split('v=')[-1]
# download_transcript(video_id)

# https://www.youtube.com/watch?v=8719-T6J4R0
# https://www.youtube.com/watch?v=uHt01D6rOLI&t=1s

# ?si=PFBO_KmAcpXxuCxY

# https://www.youtube.com/embed/8719-T6J4R0?si=PFBO_KmAcpXxuCxY
# https://www.youtube.com/embed/uHt01D6rOLI?si=PFBO_KmAcpXxuCxY
# https://www.youtube.com/embed/uHt01D6rOLI?start=30

# <iframe width="560" height="315" src="https://www.youtube.com/embed/8719-T6J4R0?si=PFBO_KmAcpXxuCxY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>