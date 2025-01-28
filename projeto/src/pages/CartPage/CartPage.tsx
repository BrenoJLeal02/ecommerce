import { Box, Button, Text, Flex, VStack, Heading } from "@chakra-ui/react";
import { useCart } from "../../context/CartContext"; 

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart(); 

  if (cartItems.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Text fontSize="xl" color="gray.600">
          Seu carrinho está vazio.
        </Text>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minHeight="100vh" padding="20px">
      <VStack spacing={5} align="start">
        <Heading size="lg" mb={4}>Carrinho de Compras</Heading>
        {cartItems.map((item) => (
          <Box
            key={item.id}
            bg="white"
            p="4"
            borderRadius="md"
            boxShadow="md"
            width="100%"
            mb="4"
          >
            <Flex justify="space-between" align="center">
              <Text fontSize="xl">{item.name}</Text>
              <Button colorScheme="red" onClick={() => removeFromCart(item.id)}>
                Remover
              </Button>
            </Flex>
            <Text>Preço: R$ {item.price}</Text>
            <Flex justify="space-between" align="center" mt="2">
              <Flex align="center">
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  isDisabled={item.quantity <= 1}
                  size="sm"
                  colorScheme="yellow"
                >
                  -
                </Button>
                <Text mx="2">{item.quantity}</Text>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  size="sm"
                  colorScheme="yellow"
                >
                  +
                </Button>
              </Flex>
              <Text fontWeight="bold">Subtotal: R$ {item.price * item.quantity}</Text>
            </Flex>
          </Box>
        ))}
        <Flex justify="space-between" width="100%" fontSize="xl" fontWeight="bold">
          <Text>Total:</Text>
          <Text color="green.500">R$ {total}</Text>
        </Flex>
        <Button colorScheme="blue" width="100%" mt="6">
          Finalizar Compra
        </Button>
      </VStack>
    </Box>
  );
};

export default CartPage;
