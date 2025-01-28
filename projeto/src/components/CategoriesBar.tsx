import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Spinner,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  IconButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../service/Categories"; 
import { Category } from "../interface/CategoriesInterface";
import { useAuth } from "../context/AuthContext";

export const CategoriesBar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { userRole } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (id: number) => {
    navigate(`/category/${id.toString()}`);
  };

  return (
    <Box bg="#fff" position="relative" py="2" px="4" boxShadow="sm">
      <Flex align="center">
        {/* Botão para abrir o menu */}
        <IconButton
          aria-label="Abrir menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="outline"
          colorScheme="black"
          border="none"
        />

        {/* Categorias */}
        <Box
          display="flex"
          overflowX="auto"
          scrollBehavior="smooth"
          alignItems="center"
          gap="20px"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none", 
            },
            scrollbarWidth: "none",
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            categories.map((category) => (
              <Box
                key={category.id}
                bg="white"
                p="2"
                minWidth="150px"
                textAlign="center"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.1)" }}
                cursor="pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <Text fontWeight="bold">{category.name}</Text>
              </Box>
            ))
          )}
        </Box>
      </Flex>

      {/* Drawer do menu */}
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
              <Link to="/products" onClick={onClose}>
                Produtos
              </Link>
              {userRole === "Admin" && (
                <>
                  <Link to="/create-products" onClick={onClose}>
                    Adicionar Produtos
                  </Link>
                  <Link to="/create-category" onClick={onClose}>
                    Adicionar Categorias
                  </Link>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
