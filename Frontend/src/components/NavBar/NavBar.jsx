import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  useColorMode,
  useColorModeValue,
  CloseButton,
  Text
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown, FiMoon, FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';
// Replace with the correct path to your PNG file
import HomeIcon from '../../Image/HomeIcon.svg'; // Replace with the correct path to your SVG files
import ContactIcon from '../../Image/ContactIcon.svg'
import MailIcon from '../../Image/MailIcon.svg'

import Telegram from '../../Image/Telegram.svg'
import MenuIcon from '../../Image/MenuIcon.svg';
import BoxIcon from '../../Image/BoxIcon.svg'
import GraphIcon from '../../Image/GraphIcon.svg'
import LogoImage from '../../Image/LogoImage.svg'

const LinkItems = [
  { name: '', icon: HomeIcon },
  { name: ' ', icon: ContactIcon },
  { name: '', icon: MailIcon },
  { name: '', icon: Telegram },
  { name: '', icon: MenuIcon },
  { name: '', icon: BoxIcon },
  { name: '', icon: GraphIcon }
];

const SidebarContent = ({ onClose, ...rest }) => {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);
  const { loginWithRedirect, logout } = useAuth0();

  const userName = user?.name || 'User';

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: "6em" }} // Adjusted width
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <img src={LogoImage} alt="Logo" style={{ maxHeight: '40px' }} /> {/* Logo image */}
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.icon}>
          <Link to={`/${link.name.toLowerCase()}`}>
            <img src={link.icon} alt={`${link.name} icon`} style={{ width: '24px', marginRight: '8px' }} />
            {link.name}
          </Link>
        </NavItem>
      ))}
      <Box p="4" borderTopWidth="1px" borderTopColor={useColorModeValue('gray.200', 'gray.700')}>
        {!isLoading && !isAuthenticated && (
          <Button onClick={() => loginWithRedirect()} colorScheme="teal" w="full">
            Register/Log In
          </Button>
        )}
        {isAuthenticated && (
          <Flex alignItems={'center'} mt={4}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    name={userName} // Display initials if no profile picture
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{userName}</Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('gray.200', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logout({ returnTo: import.meta.env.VITE_RETURN_URL })}>
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, href, ...rest }) => (
  <Box
    as="a"
    href={href}
    style={{ textDecoration: 'none' }}
    _focus={{ boxShadow: 'none' }}
  >
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <img
          src={icon}
          alt="icon"
          style={{ width: '24px', marginRight: '8px' }}
        />
      )}
      {children}
    </Flex>
  </Box>
);

const MobileNav = ({ onOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 48 }} // Adjusted margin
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
     
      
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
        />
   
    </Flex>
  );
};

const Navbar = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const { loginWithRedirect } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 48 }} p="4"> {/* Adjusted margin */}
        {/* Other content can be placed here */}
      </Box>
    </Box>
  );
};

export default Navbar;
