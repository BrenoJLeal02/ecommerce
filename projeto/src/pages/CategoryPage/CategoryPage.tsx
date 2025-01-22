import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Spinner,
  VStack,
  Grid,
  GridItem,
  Image,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { getCategoryById } from "../../service/Categories";
import { getProductsByCategory } from "../../service/Products";
import { Category } from "../../interface/CategoriesInterface";
import { Product } from "../../interface/ProductsInterface";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const fetchCategoryAndProducts = async () => {
    if (!id) {
      setError("ID da categoria não foi fornecido.");
      setLoading(false);
      return;
    }

    try {
      const categoryResponse = await getCategoryById(id);
      setCategory(categoryResponse.data.category);

      const productsResponse = await getProductsByCategory(id);
      setProducts(productsResponse.products || []);
    } catch (error) {
      setError("Erro ao buscar a categoria ou produtos. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryAndProducts();
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
    <Box bg="gray.50" minHeight="100vh" padding="20px">
      {category && (
        <VStack spacing={5} align="start" marginBottom="20px">
          <Heading size="lg">{category.name}</Heading>
          <Text>{category.description || "Sem descrição disponível."}</Text>
        </VStack>
      )}

      <Heading size="md" marginBottom="20px">
        Produtos da Categoria
      </Heading>
      {products.length > 0 ? (
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="20px">
          {products.map((product) => (
            <GridItem
              key={product.id}
              bg="white"
              borderRadius="md"
              overflow="hidden"
              boxShadow="sm"
              transition="all 0.2s"
              _hover={{ boxShadow: "lg" }}
            >
              <Image
                src={
                  product.image_path
                    ? `http://localhost:5000/uploads/${product.image_path}`
                    : "https://via.placeholder.com/250x150?text=Sem+Imagem"
                }
                alt={product.name}
                objectFit="cover"
                width="100%"
                height="150px"
              />
              <Box padding="10px">
                <Text fontWeight="bold" fontSize="lg" marginBottom="5px">
                  {product.name}
                </Text>
                <Text color="gray.600" fontSize="sm" marginBottom="10px">
                  {product.description || "Sem descrição."}
                </Text>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold" color="green.500">
                    R$ {product.price}
                  </Text>
                  <Button size="sm" colorScheme="blue">
                    Comprar
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    Ver Detalhes
                  </Button>;
                </Flex>
              </Box>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Text>Nenhum produto encontrado para esta categoria.</Text>
      )}
    </Box>
  );
};

export default CategoryPage;
