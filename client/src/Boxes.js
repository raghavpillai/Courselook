import React from 'react';
import { Box, Flex, Center, Text } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'


function Boxes({ result1, result2, result3 }) {
    return (
        <Flex
            direction="column"
            w="100%" // Set the width to 100% to make it fill the page horizontally
            // h="60vh" // Set the height of the container to 60vh for the entire viewport height
        //   bg="teal.1000"
        >
            <Center>
            <Box
                // flex="1" // Let this box fill the available vertical space (bottom half)
                border="3px solid #ADD8E6" // Add a thin white border
                mx={2}
                w="60%"
            >
                {/* {result1} */}
                <iframe 
                    width="100%" 
                    height="315" 
                    src={result1["video_id"]}
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
                <Flex
                justifyContent="space-between"  // Space items on either side
                alignItems="center"             // Center items vertically
                w="100%"                        // Set the container width
                p="4"                           // Add padding
                >
                <CircularProgress value={parseFloat((result1['score'] * 100).toFixed(2))} >
                    <CircularProgressLabel>{parseFloat((result1['score'] * 100).toFixed(0))}%</CircularProgressLabel>
                </CircularProgress>
                <Box>
                    <Text>{parseFloat(`${result1['timestamp'] / 60}`).toFixed(2).replace('.', ':')}</Text>
                </Box>
                </Flex>
                <div
          style={{
            height: '280px', // Set the height of the scrollable area
            overflowY: 'auto', // Make the container scrollable vertically
          }}
        >
                <Text textAlign="center" marginLeft={8}>
                    {result1['contents'].map((obj) => <Text fontWeight={obj['selected'] ? "bold" : "normal"}  >{obj['text']}</Text>)}
                </Text>
                </div>
            </Box>
            </Center>
            <br/>
            <Center>
            <Box
                // flex="1" // Each box within the flex container will fill the horizontal space evenly
                border="3px solid #ADD8E6" // Add a thin white border
                mx={2}
                w={"60%"}
            >
                <iframe 
                    width="100%" 
                    height="315" 
                    src={result2['video_id']}
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
                <Flex
                justifyContent="space-between"  // Space items on either side
                alignItems="center"             // Center items vertically
                w="100%"                        // Set the container width
                p="4"                           // Add padding
                >
                <CircularProgress value={parseFloat((result2['score'] * 100).toFixed(2))} >
                    <CircularProgressLabel>{parseFloat((result2['score'] * 100).toFixed(0))}%</CircularProgressLabel>
                </CircularProgress>
                <Box>
                    <Text>{parseFloat(`${result2['timestamp'] / 60}`).toFixed(2)} m:s</Text>
                </Box>
                </Flex>
                <div
          style={{
            height: '280px', // Set the height of the scrollable area
            overflowY: 'auto', // Make the container scrollable vertically
          }}
        >
                <Text textAlign="center" marginLeft={8}>
                    {result2['contents'].map((obj) => <Text fontWeight={obj['selected'] ? "bold" : "normal"}  >{obj['text']}</Text>)}
                </Text>
                </div>
            </Box>
            </Center>
            <br/>
            <Center>
            <Box
                // flex="1" // Each box within the flex container will fill the horizontal space evenly
                border="3px solid #ADD8E6" // Add a thin white border
                mx={2}
                w={"60%"}
            >
                <iframe 
                    width="100%" 
                    height="315" 
                    src={result3['video_id']}
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
                <Flex
                justifyContent="space-between"  // Space items on either side
                alignItems="center"             // Center items vertically
                w="100%"                        // Set the container width
                p="4"                           // Add padding
                >
                <CircularProgress value={parseFloat((result3['score'] * 100).toFixed(2))} >
                    <CircularProgressLabel>{parseFloat((result3['score'] * 100).toFixed(0))}%</CircularProgressLabel>
                </CircularProgress>
                <Box>
                    <Text>{parseFloat(`${result3['timestamp'] / 60}`).toFixed(2)} m:s</Text>
                </Box>
                </Flex>
                <div
          style={{
            height: '280px', // Set the height of the scrollable area
            overflowY: 'auto', // Make the container scrollable vertically
          }}
        >
                <Text textAlign="center" marginLeft={8}>
                    {result3['contents'].map((obj) => <Text fontWeight={obj['selected'] ? "bold" : "normal"}  >{obj['text']}</Text>)}
                </Text>
                </div>
            </Box>
            </Center>
        </Flex>
    );
}

export default Boxes;
