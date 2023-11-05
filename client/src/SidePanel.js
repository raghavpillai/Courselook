import React from 'react';
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';

function SidePanel({ urls }) {
  return (
    <Box
      w="250px"
      h="100vh"
      borderRight="1px solid #ccc"
      p="4"
      overflowY="auto"
    >
      <Heading as="h2" size="md" mb="4">
        URL List
      </Heading>
      <UnorderedList listStyleType="none" p="0">
        {urls.map((url, index) => (
          <ListItem key={index} mb="2">
            <Link href={url} isExternal>
              {url}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}

export default SidePanel;
