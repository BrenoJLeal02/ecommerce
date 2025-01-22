// src/pages/CategoryPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Spinner, VStack } from "@chakra-ui/react";
import { getCategoryById } from "../../service/Categories"; 
import { Category } from "../../interface/CategoriesInterface";

const CategoryPage = () => {
    const { id } = useParams<{ id: string }>(); // Pega o ID da categoria da URL
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchCategory = async () => {
      if (!id) {
        setError("ID da categoria não foi fornecido.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await getCategoryById(id); // Use a função de API para buscar categoria
        setCategory(response.data.category); // Armazena os dados da categoria
      } catch (error) {
        setError("Erro ao buscar a categoria. Tente novamente.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCategory(); // Chama a função quando o ID da categoria mudar
    }, [id]);
  
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Text color="red.500">{error}</Text>
        </Box>
      );
    }
  
    return (
      <VStack spacing={5} align="start" p={5}>
        {category ? (
          <>
            <Text fontSize="2xl" fontWeight="bold">{category.name}</Text>
            <Text>{category.description || "Sem descrição disponível."}</Text>
          </>
        ) : (
          <Text>Categoria não encontrada.</Text>
        )}
      </VStack>
    );
  };
  
  export default CategoryPage;
  