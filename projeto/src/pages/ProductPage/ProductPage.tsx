import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Spinner,
  VStack,
  Heading,
  Button,
  Flex,
} from "@chakra-ui/react";
import { getProductById } from "../../service/Products";
import { Product } from "../../interface/ProductsInterface";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await getProductById(productId);
      setProduct(response.product);
    } catch (err) {
      console.error("Erro ao buscar produto:", err);
      setError("Erro ao carregar o produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    } else {
      setLoading(false);
      setError("ID do produto não foi fornecido.");
    }
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
      {product ? (
        <VStack spacing={5} align="start">
          <Image
            src={
              product.image_path
                ? `http://localhost:5000/uploads/${product.image_path}`
                : "https://via.placeholder.com/400x300?text=Sem+Imagem"
            }
            alt={product.name}
            width="100%"
            height="300px"
            objectFit="cover"
            borderRadius="md"
          />
          <Heading size="lg">{product.name}</Heading>
          <Text>{product.description || "Sem descrição disponível."}</Text>
          <Flex justify="space-between" align="center" width="100%">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              R$ {product.price}
            </Text>
            <Button size="lg" colorScheme="blue">
              Comprar
            </Button>
          </Flex>
        </VStack>
      ) : (
        <Text>Produto não encontrado.</Text>
      )}
    </Box>
  );
};

export default ProductPage;
