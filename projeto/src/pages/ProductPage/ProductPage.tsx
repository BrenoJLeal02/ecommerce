import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import {
  Box,
  Text,
  Image,
  Spinner,
  VStack,
  Heading,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { getProductById } from "../../service/Products";
import { Product } from "../../interface/ProductsInterface";
import { useCart } from "../../context/CartContext";  // Importando o CartContext
import { useAuth } from "../../context/AuthContext";  // Importando o AuthContext
import { addItemToCart } from "../../service/Cart"; // Função para adicionar ao carrinho

const ProductPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);  
  const toast = useToast(); 
  const navigate = useNavigate();  

  // Usando o AuthContext para pegar o userId
  const { isLoggedIn, userId } = useAuth(); // Alterado para pegar userId do AuthContext

  // Usando o CartContext para gerenciar os itens no carrinho
  const { addToCart: addToCartContext } = useCart();

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
  console.log("isLoggedIn:", isLoggedIn); // Verifique se o usuário está logado
  console.log("userId:", userId); // Verifique o valor do userId
  
  const handleAddToCart = async () => {
    if (product && isLoggedIn && userId) { // Verificando se userId e isLoggedIn são válidos
      
      setAddingToCart(true);
      try {
        const quantity = 1; 
  
        // Adicionando ao carrinho local
        addToCartContext({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        });
  
        // Adicionando ao backend
        await addItemToCart({ userId, productId: product.id, quantity });
  
        toast({
          title: "Produto adicionado ao carrinho!",
          description: `${product.name} foi adicionado ao seu carrinho.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
  
        navigate("/cart");  
      } catch (err) {
        console.error("Erro ao adicionar ao carrinho:", err);
        toast({
          title: "Erro!",
          description: "Ocorreu um erro ao adicionar o produto ao carrinho.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setAddingToCart(false);
      }
    } else {
      // Verificando se o erro está na ausência do userId ou isLoggedIn
      const errorMessage = !isLoggedIn
        ? "Você precisa estar logado para adicionar ao carrinho."
        : "Erro ao processar a requisição, tente novamente.";
      
      toast({
        title: "Erro!",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
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
            src={product.image_path
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
            <Button
              onClick={handleAddToCart}
              size="lg"
              colorScheme="blue"
              isLoading={addingToCart}
              loadingText="Adicionando"
            >
              Adicionar ao Carrinho
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
