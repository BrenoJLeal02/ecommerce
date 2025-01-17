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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getEstablishment } from "../service/Establishment"; // Certifique-se de importar a função

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [userInitials, setUserInitials] = useState<string>("");
  const [establishmentName, setEstablishmentName] = useState<string>("");

  useEffect(() => {
    // Função assíncrona para buscar o nome do estabelecimento
    const fetchEstablishment = async () => {
      try {
        const data = await getEstablishment(); // Chama a função para obter dados
        console.log(data); // Verifique o conteúdo da resposta
        if (data.establishments && data.establishments.length > 0) {
          setEstablishmentName(data.establishments[0].name); // Atualiza o nome do estabelecimento
        } else {
          console.log("Nome do estabelecimento não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar o estabelecimento:", error);
      }
    };

    fetchEstablishment(); // Executa a função para buscar o estabelecimento

    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const { username } = decodedToken;
        if (username) {
          const initials = username
            .split(" ")
            .map((name: string) => name.charAt(0).toUpperCase())
            .join("");
          setUserInitials(initials);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token JWT:", error);
      }
    }
  }, []); // Esse efeito é executado apenas uma vez quando o componente é montado

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
      <IconButton
        bg="transparent"
        aria-label="Menu"
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        marginRight="10px"
      />

      {/* Exibe o nome do estabelecimento se estiver disponível */}
      <Heading size="md" marginRight={{ base: "auto", md: "0" }}>
        {establishmentName || "Carregando Estabelecimento..."} {/* Exibe nome ou mensagem de carregamento */}
      </Heading>

      <Flex gap="15px" display={{ base: "none", md: "flex" }} align="center">
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/contato">Contato</Link>

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

        {/* Avatar com as iniciais do usuário */}
        {userInitials && (
          <Avatar name={userInitials} bg="blue.500" color="white" size="sm" />
        )}
      </Flex>

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
