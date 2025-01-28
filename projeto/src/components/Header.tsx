import {
  Flex,
  Heading,
  IconButton,
  Input,
  Box,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useState } from "react";
import { getEstablishment } from "../service/Establishment";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [establishmentName, setEstablishmentName] = useState<string>("");
  const { isLoggedIn, userInitials, logout } = useAuth();
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
          <Menu>
            <MenuButton>
              <Avatar name={userInitials} bg="blue.500" color="white" size="sm" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </Flex>

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
