import {
  Flex,
  Heading,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useDisclosure,
  Input,
  Box,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useState } from "react";
import { getEstablishment } from "../service/Establishment";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [establishmentName, setEstablishmentName] = useState<string>("");
  const { isLoggedIn, userInitials, logout, userRole } = useAuth(); 
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const closeSearch = () => {
    setIsSearchVisible(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchEstablishment = async () => {
    try {
      const data = await getEstablishment();
      if (data.establishments && data.establishments.length > 0) {
        setEstablishmentName(data.establishments[0].name);
      }
    } catch (error) {
      console.error("Erro ao buscar o estabelecimento:", error);
    }
  };

  useState(() => {
    fetchEstablishment();
  });

  return (
    <Flex
      bg="white"
      zIndex={2}
      padding="10px 20px"
      justify="space-between"
      align="center"
      boxShadow="sm"
    
      position="relative"
    >
      <IconButton
        bg="transparent"
        aria-label="Menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        marginRight="10px"
      />

      <Heading size="md" marginRight="auto">
        {establishmentName || "Carregando Estabelecimento..."}
      </Heading>

      <Flex gap="15px" align="center">
        <IconButton
          aria-label="Carrinho de compras"
          icon={<FiShoppingCart />}
          variant="ghost"
          colorScheme="black"
        />

        <IconButton
          aria-label="Buscar"
          icon={<FiSearch />}
          variant="ghost"
          colorScheme="black"
          onClick={toggleSearch}
        />

        {isLoggedIn ? (
          <Avatar name={userInitials} bg="blue.500" color="white" size="sm" />
        ) : (
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => navigate("/")}
          >
            Login
          </Button>
        )}
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Link to="/homepage" onClick={onClose}>
                Home
              </Link>
              <Link to="/products" onClick={onClose}>
                Produtos
              </Link>
              {userRole === "Admin" && ( 
                <Link to="/create-products" onClick={onClose}>
                  Adicionar
                </Link>
              )}
              {isLoggedIn && (
                <Link to="#" onClick={() => { onClose(); handleLogout(); }}>
                  Logout
                </Link>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {isSearchVisible && (
        <>
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(0, 0, 0, 0.5)"
            zIndex="2"
            onClick={closeSearch}
          />
          <Box
            position="absolute"
            top="100%"
            left="0"
            right="0"
            padding="10px"
            bg="transparent"
            boxShadow="md"
            zIndex="1000"
          >
            <Input bg={"#fff"} placeholder="Buscar produtos..." />
          </Box>
        </>
      )}
    </Flex>
  );
}
