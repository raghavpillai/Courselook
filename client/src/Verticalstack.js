import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Center,
  Container,
  Stack,
  Heading,
  Button,
  Icon,
  SimpleGrid,
  HStack,
  useColorModeValue,
  Input
} from '@chakra-ui/react';
import SearchBar from './SearchBar';
import Boxes from './Boxes';
import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Verticalstack() {
const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
const [result1, setResult1] = useState([]); // state to store the results from the search
const [result2, setResult2] = useState([]);
const [result3, setResult3] = useState([]);

const location = useLocation();
const type = location.state?.type || "";
const receivedUrls = location.state?.urls || [];
// console.log(receivedUrls)

const [isLoading, setIsLoading] = useState(false);
const [doneLoading, setDoneLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState('')

const fetchData = async () => {


  console.log(JSON.stringify(receivedUrls))

  const data = {
    type: type,
    content: JSON.stringify(receivedUrls),
    question: searchQuery,
  };

  try {
      console.log(data)
      const apiUrl = `http://127.0.0.1:8080/api/query`;
      axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json"
        },
      }).then((response) => {
        const jsonData = response.data;
        console.log(jsonData);
        if (jsonData.message['return'].length > 0) {
        setResult1(jsonData.message['return'][0]);
        setResult2(jsonData.message['return'][1]);
        setResult3(jsonData.message['return'][2]);
        // setData(jsonData);
        setDoneLoading(true);
        setIsLoading(false);
        } else {
          setIsLoading(false);
          setErrorMsg("Please submit another video.")
        }
      }).catch((err) => console.log(err));

  } catch (error) {
      console.error('Error fetching data:', error);
  }
};
const handleSearch = () => {
    // You can perform any actions with the searchQuery here, like sending it to a server or updating state in a parent component.
    // sending this to backend
    // console.log("Search query:", searchQuery);
    setIsLoading(true);
    fetchData();
  };


  return (
    <ChakraProvider theme={theme}>
    <Stack direction={'column'} spacing={5}>
      <Box p={4}>
        <Heading fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
          Course<Text as={'span'} color={'green.400'}>Search</Text>
        </Heading>
        <Text color={'gray.500'} marginTop={8}>
          Pick your class, then type your query in the box below!
        </Text>
        <Text as={'span'} color={'green.400'} marginTop={8}>
        <a href='/'>Add other videos!</a>
        </Text>
      </Box>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}/>
      {isLoading ? <Loading/> : <></>}
      {doneLoading ? <Boxes result1={result1} result2={result2} result3={result3} /> : <Text as={'span'} color={'green.400'} marginTop={8}>{errorMsg}</Text>}
    </Stack>
    </ChakraProvider>
  );
}
