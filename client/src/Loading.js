import React, { useEffect, useState } from 'react';
import { Heading, theme, ChakraProvider, Progress } from '@chakra-ui/react';
import Typewriter from './Typewriter';

function Loading() {

    const [loaded, setLoaded] = useState(0)

    useEffect(() => {
        if (loaded >= 90) {
            setLoaded(90)
        } else {
        // Simulate loading by setting isLoading to false after a delay
        setTimeout(() => {
          setLoaded(loaded + 1);
        }, 600);
    }
      }, [loaded]);

  return (
    <ChakraProvider theme={theme}>
        <Heading fontWeight={600}
            fontSize={'sm'}
            lineHeight={'110%'}>
        loading<Typewriter text="..." delay={500} infinite/>
        </Heading>
        <Progress value={loaded} width={'sm'} alignSelf={'center'} hasStripe isAnimated/>
    </ChakraProvider>
  );
}

export default Loading;
