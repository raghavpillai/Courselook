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
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Navbar from './Navbar';
import Verticalstack from './Verticalstack';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Navbar></Navbar>
        <Grid minH="100vh" p={30}>
          <Verticalstack></Verticalstack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
