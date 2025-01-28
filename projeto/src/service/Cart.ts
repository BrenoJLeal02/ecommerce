import { apiAuth } from "./api";  // Supondo que você tenha configurado uma instância do axios no arquivo 'api.ts'

// Adicionar item ao carrinho
const addItemToCart = async (data: { userId: string, productId: string, quantity: number }) => {
  const response = await apiAuth.post('/cart/add', data);
  return response;
};

// Remover item do carrinho
const removeItemFromCart = async (userId: string, productId: string) => {
  const response = await apiAuth.delete(`/cart/remove/${userId}/${productId}`);
  return response;
};

// Obter itens do carrinho de um usuário
const getCartItems = async (userId: string) => {
  const response = await apiAuth.get(`/cart/${userId}`);
  return response.data;
};
const updateItemQuantity = async (userId: string, productId: string, quantity: number) => {
    const data = { userId, productId, quantity };
    const response = await apiAuth.put('/cart/update-quantity', data);
    return response;
  };
  

export {
  addItemToCart,
  removeItemFromCart,
  getCartItems,
  updateItemQuantity
};
