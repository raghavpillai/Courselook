import React from 'react';
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
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Navbar from './Navbar';
import Verticalstack from './Verticalstack';
import {useState, useEffect} from 'react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';


const VideoIn = (props) => {

    return (
        <HStack align={'top'} >
            <Box color={'green.400'}>
            <Icon as={props.in ? (props.in.length === 0 ? AddIcon : CheckIcon) : AddIcon} />
            </Box>
            <VStack align={'start'} w="100%" >
            <Text fontWeight={600}>Video {props.num}</Text>
            <Input isDisabled={props.isDisabled} placeholder="Enter text" value={props.in} onChange={(e) => props.changeIn(e.target.value)} w="100%"/>
            </VStack>
        </HStack>
    );
}



function App() {

    const navigate = useNavigate();
    const [in1, setIn1] = useState("");
    const [in2, setIn2] = useState("");
    const [in3, setIn3] = useState("");
    const [in4, setIn4] = useState("");
    const [in5, setIn5] = useState("");
    const [in6, setIn6] = useState("");
    const [in7, setIn7] = useState("");
    const [in8, setIn8] = useState("");
    const [in9, setIn9] = useState("");
    const [in10, setIn10] = useState("");
    const [playlistVal, changePlaylist] = useState("");

    // useEffect(() => {
    //     if (in1.length !== 0) {
    //         setInDisabled(true);
    //     } else if (playlistVal.length !== 0) {
    //         setInDisabled(false);
    //     }
    // }, [playlistVal, in1])

    const handleSubmit = () => {
      if (in1.length === 0) {
        navigate('/query', {state: {type: "playlist", urls: playlistVal}})
      }
       else {
        // const separator = "|"; // Define the separator you want
        const stateVariables = [in1, in2, in3, in4, in5, in6, in7, in8, in9, in10]; // Put your state variables in an array
        const nonEmptyStrings = stateVariables.filter((str) => str.trim() !== '');

        navigate('/query', {state: {type: "videos", urls: nonEmptyStrings}})
       }

    }


    const handlePremadeClick = () => {
      navigate('/query', {state: {type: "playlist", urls: "https://www.youtube.com/playlist?list=PL6CdojO56mZ3SeRfpzMBMObSnTziA0gfE"}})
    }


    const playlistClick = (e) => {
      changePlaylist(e.target.value)
    }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Navbar></Navbar>
        <Grid minH="100vh" p={30}>
        <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            search for anything<br />
            <Text as={'span'} color={'green.400'}>
            across a playlist of videos
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Directly enter a playlist link below or put individual videos into the form. Then click submit!
          </Text>

        
          <Input placeholder="Enter Playlist Link" value={playlistVal} onChange={playlistClick}/>

          <Text>or</Text>

            <Container maxW={'6xl'} mt={10}>
                <SimpleGrid columns={{ base: 1 }} spacing={10}>
                    <VideoIn num={1} in={in1} changeIn={setIn1}/>
                    {in1.length !== 0 ? <VideoIn num={2} in={in2} changeIn={setIn2}/> : <></>}
                    {in1.length !== 0 && in2.length !== 0 ? <VideoIn num={3} in={in3} changeIn={setIn3}/> : <></>}
                    {(in1.length !== 0 || in2.length !== 0) && in3.length !== 0 ? <VideoIn num={4} in={in4} changeIn={setIn4}/> : <></>}
                    {(in1.length !== 0 || in2.length !== 0 || in3.length) && in4.length !== 0 ? <VideoIn num={5} in={in5} changeIn={setIn5}/> : <></>}
                    {(in1.length !== 0 || in2.length !== 0 || in3.length || in4.length) && in5.length !== 0 ? <VideoIn num={6} in={in6} changeIn={setIn6}/> : <></>}
                    {(in1.length !== 0 || in2.length !== 0 || in3.length || in4.length || in5.length !== 0) && in6.length !== 0 ? <VideoIn num={7} in={in7} changeIn={setIn7}/> : <></>}
                    {(in1.length !== 0 || in2.length !== 0 || in3.length || in4.length || in5.length !== 0 || in6.length) !== 0 && in7.length !== 0 ? <VideoIn num={8} in={in8} changeIn={setIn8}/> : <></>}
                    {(in1.length !== 0 || in2.length !== 0 || in3.length || in4.length || in5.length !== 0 || in6.length !== 0 || in7.length !== 0) && in8.length !== 0 ? <VideoIn num={9} in={in9} changeIn={setIn9}/> : <></>}
                    {(in1.length !== 0 || in2.length !== 0 || in3.length || in4.length || in5.length !== 0 || in6.length !== 0 || in7.length !== 0 || in8.length !== 0) && in9.length !== 0 ? <VideoIn num={10} in={in10} changeIn={setIn10}/> : <></>}
                </SimpleGrid>
            </Container>



          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
              onClick={handleSubmit}
              >
              Submit
            </Button>


            <Button variant={'link'} colorScheme={'blue'} size={'sm'} onClick={handlePremadeClick}>
              Use Pre-made Playlist
            </Button>

            {/* {isLoading ? <Loading/> : <></>} */}
          </Stack>
        </Stack>
      </Container>
    </>

        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
