// import React from 'react';
// import { Input, IconButton, Flex } from '@chakra-ui/react';
// import { SearchIcon } from '@chakra-ui/icons';

// function SearchBar() {
//   return (
//     <Flex
//       align="center"
//       w="100%" // Set the width to 100% to make it fill the page horizontally
//       h="100px" // Set the height to 200px or adjust as needed
//     //   bg="teal.500" // Background color for demonstration
//       p={10} // Padding for the inner content
//     >
//       <Input
//         type="text"
//         placeholder="Type your query..."
//         size="lg"
//         variant="filled"
//         borderRadius="full"
//         flex="1" // Let the input field expand to fill the available space
//       />
//       <IconButton
//         aria-label="Search"
//         icon={<SearchIcon />}
//         colorScheme="teal"
//         variant="ghost"
//         ml={4} // Add some margin to the search button for spacing
//       />
//     </Flex>
//   );
// }

// export default SearchBar;

import React, { useState } from 'react';
import { Input, IconButton, Flex } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SearchBar( { searchQuery, setSearchQuery, handleSearch } ) {

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // If Enter key is pressed, trigger the search
      handleSearch();
    }
  };

  return (
    <Flex
      align="center"
      w="100%"
      h="100px"
      p={10}
    >
      <Input
        type="text"
        placeholder="Type your query..."
        size="lg"
        variant="filled"
        borderRadius="full"
        flex="1"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // Call handleKeyPress on Enter key press
      />
      <IconButton
        aria-label="Search"
        icon={<SearchIcon />}
        colorScheme="teal"
        variant="ghost"
        ml={4}
        onClick={handleSearch} // Call handleSearch on button click
      />
    </Flex>
  );
}

export default SearchBar;
