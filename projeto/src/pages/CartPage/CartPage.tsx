import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { getCartItems, removeItemFromCart, updateItemQuantity } from "../../service/Cart";
import { Box, Button, Text, Flex, VStack, Heading, List, ListItem } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md"; 

const CartPage = () => {
  const { userId } = useAuth(); 
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    if (userId) {
      const fetchCartItems = async () => {
        try {
          const response = await getCartItems(userId);
          setCartItems(response);
        } catch (error) {
          console.error("Erro ao buscar itens do carrinho:", error);
        }
      };
      fetchCartItems();
    }
  }, [userId]);

  const handleRemoveItem = async (productId: string) => {
    try {
      const response = await removeItemFromCart(userId, productId);
      if (response.status === 200) {
        const updatedCart = await getCartItems(userId);
        setCartItems(updatedCart);
      }
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      const response = await updateItemQuantity(userId, productId, quantity);
      if (response.status === 200) {
        const updatedCart = await getCartItems(userId);
        setCartItems(updatedCart);
      }
    } catch (error) {
      console.error("Erro ao atualizar a quantidade:", error);
    }
  };

  const totalValue = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box bg="gray.50" minHeight="100vh" padding="20px">
      <VStack spacing={6} align="start">
        <Heading size="lg" mb={6}>Carrinho de Compras</Heading>
        {cartItems.length > 0 ? (
          <List spacing={4} width="100%">
            {cartItems.map((item) => (
              <ListItem
                key={item.product_id}
                bg="white"
                p={4}
                borderRadius="md"
                boxShadow="sm"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex direction="column" width="80%">
                  <Text fontSize="xl" fontWeight="bold">{item.name}</Text>
                  <Text fontSize="md" color="gray.600">
                    R$ {item.price} x {item.quantity}
                  </Text>
                </Flex>
                <Flex align="center">
                  <Button
                    size="sm"
                    colorScheme="yellow"
                    onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}
                    isDisabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <Text mx={3} fontSize="lg" fontWeight="semibold">{item.quantity}</Text>
                  <Button
                    size="sm"
                    colorScheme="yellow"
                    onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </Flex>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemoveItem(item.product_id)}
                  leftIcon={<MdDelete />}
                >
                  Remover
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Text fontSize="xl" color="gray.600">
            Nenhum item no carrinho.
          </Text>
        )}
        {cartItems.length > 0 && (
          <Flex
            direction="row"
            justify="space-between"
            align="center"
            mt={6}
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
          >
            <Text fontSize="lg" fontWeight="bold">Total:</Text>
            <Text fontSize="xl" color="green.500" fontWeight="semibold">
              R$ {totalValue.toFixed(2)}
            </Text>
          </Flex>
        )}
      </VStack>
    </Box>
  );
};

export default CartPage;
