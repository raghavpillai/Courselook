Inspiration
With the Berkeley enrollment time just around the corner, everyone is stressed about what classes to take. Recently, we had a conversation with one of our friends who was especially stressed about taking CS 162 next semester, with her main concern being that the course has so much content and it will be hard for her to process and digest all the information before midterms. We got the idea to create SecondSearch, where her and all other students in any class can quickly and efficiently review class material by searching through lectures directly.

What it does
SecondSearch answers any question about a course with a direct link to the lecture which explains the question. It performs a vector similarity search to determine which portion of lecture is most likely to answer your question and then displays that video.

How we built it
We built SecondSearch on the Milvus open-source vector database, using OpenAI to help with the search, then completed the product with a companion React frontend built with Chakra UI component library. The backend was made using FastAPI and the Milvus docker containers were populated using Jupyter notebooks.

Challenges we ran into
We had trouble setting up Milvus and Docker at first. We also were new to React so had some difficulties getting that to work.

Accomplishments that we're proud of
We're proud of getting a full stack product working: the client, server, and Milvus docker instance.

What we learned
We learned how to use Docker, FastAPI, and React

What's next for SecondSearch
After creating the minimum viable product, we wanted to make the UI more friendly by using OpenAI to summarize the caption display from the video segments. However, we quickly realized that adding this change would slow the search time down from its current ~1 second to ~20 seconds. As we ran out of time to speed up this feature, we decided to temporarily remove it. However, we will be reimplementing it more efficiently as soon as possible. As for the big picture and the more distant future, currently our product works with lecture series uploaded to Youtube - we want to expand to lecture videos uploaded to other platforms, as some Berkeley classes upload recordings to bCourses, and other institutions use different platforms. After we expand the project further, some reaching goals for the far future include advertising the completed product to all university students, as lectures are often recorded and uploaded in some form. We also want to add new features on future patches such as saving previous searches, and more.

Built With
FastAPI
Python
React
