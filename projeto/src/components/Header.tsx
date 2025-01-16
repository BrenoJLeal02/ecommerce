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
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { HamburgerIcon } from "@chakra-ui/icons";
  import { FiShoppingCart, FiSearch } from "react-icons/fi";
  import { useState } from "react";
  
  export function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSearchVisible, setIsSearchVisible] = useState(false); // Controle da visibilidade do input de busca
  
    const toggleSearch = () => {
      setIsSearchVisible(!isSearchVisible);
    };
  
    const closeSearch = () => {
      setIsSearchVisible(false);
    };
  
    return (
      <Flex
        bg="white"
        zIndex={2}
        padding="10px 20px"
        justify={{ base: "flex-start", md: "space-between" }}
        align="center"
        boxShadow="md"
        marginBottom="20px"
        position="relative"
      >
        {/* Ícone do menu hambúrguer no lado esquerdo */}
        <IconButton
          bg="transparent"
          aria-label="Menu"
          icon={<HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          marginRight="10px"
        />
  
        {/* Logo */}
        <Heading size="md" marginRight={{ base: "auto", md: "0" }}>
          E-Shop
        </Heading>
  
        {/* Menu de links e carrinho visível em telas grandes */}
        <Flex gap="15px" display={{ base: "none", md: "flex" }} align="center">
          <Link to="/">Home</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
  
          {/* Ícone de carrinho de compras */}
          <IconButton
            aria-label="Carrinho de compras"
            icon={<FiShoppingCart />}
            variant="ghost"
            colorScheme="black"
          />
  
          {/* Ícone de lupa */}
          <IconButton
            aria-label="Buscar"
            icon={<FiSearch />}
            variant="ghost"
            colorScheme="black"
            onClick={toggleSearch} // Toggle de visibilidade do input de busca
          />
        </Flex>
  
        {/* Carrinho de compras e ícone de lupa em telas pequenas */}
        <Flex
          display={{ base: "flex", md: "none" }}
          align="center"
          marginLeft="auto"
          gap="10px"
        >
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
        </Flex>
  
        {/* Drawer para o menu em telas pequenas */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={4}>
                <Link to="/" onClick={onClose}>
                  Home
                </Link>
                <Link to="/produtos" onClick={onClose}>
                  Produtos
                </Link>
                <Link to="/sobre" onClick={onClose}>
                  Sobre
                </Link>
                <Link to="/contato" onClick={onClose}>
                  Contato
                </Link>
                <IconButton
                  aria-label="Carrinho de compras"
                  icon={<FiShoppingCart />}
                  variant="ghost"
                  colorScheme="black"
                />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
  
        {/* Overlay para destacar o input de busca */}
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
              onClick={closeSearch} // Fechar o input ao clicar fora
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
  