import {
    Box,
    Flex,
    Avatar,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'


export default function Navbar() {
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'} > {/* justifyContent={'space-between'} */}
                    <Box>CourseSearch</Box>
                    <Stack direction='row' ml="auto">
                        <ColorModeSwitcher/>
                        <Flex alignItems={'center'} ml="auto">
                            <Stack direction={'row'} spacing={7}>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <Avatar
                                            size={'sm'}
                                            src={'https://cs162.org/static/site/cs162bean.png'}
                                        />
                                    </MenuButton>
                                    <MenuList alignItems={'center'}>
                                        <br />
                                        <Center>
                                            <Avatar
                                                size={'2xl'}
                                                src={'https://cs162.org/static/site/cs162bean.png'}
                                            />
                                        </Center>
                                        <br />
                                        <Center>
                                            <p>Class Name</p>
                                        </Center>
                                        <br />
                                        <MenuDivider />
                                        <MenuItem>Your Classes</MenuItem>
                                        <MenuItem>Settings</MenuItem>
                                        <MenuItem>Logout</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Stack>
                        </Flex>
                    </Stack>
                </Flex>
            </Box>
        </>
    )
}
