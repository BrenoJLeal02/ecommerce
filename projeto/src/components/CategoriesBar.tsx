// src/components/CategoriesBar.tsx
import { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { getCategories } from "../service/Categories"; // Caminho para a função de API
import { Category } from "../interface/CategoriesInterface";
import { useNavigate } from "react-router-dom";  // Importar useNavigate

export const CategoriesBar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();  // Usar useNavigate para navegar entre páginas

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (id: number) => {
    navigate(`/category/${id.toString()}`);  // Converte o id para string antes de navegar
  };

  return (
    <Box bg="#fff" position="relative">
      <Box
        display="flex"
        overflowX="auto"
        scrollBehavior="smooth"
        justifyContent="flex-start"
        alignItems="center"
        gap="20px"
        sx={{
          // Ocultar barra de rolagem, mas permitir o rolamento
          "&::-webkit-scrollbar": {
            display: "none", // Esconde a barra de rolagem
          },
          scrollbarWidth: "none", // Para Firefox
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
              borderRadius="md"
              minWidth="150px"
              textAlign="center"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.1)" }}
              cursor="pointer"  // Adiciona o cursor de ponteiro ao passar o mouse
              onClick={() => handleCategoryClick(category.id)}  // Chama a função de navegação
            >
              <Text fontWeight="bold">{category.name}</Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
