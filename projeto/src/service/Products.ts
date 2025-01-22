
import { apiAuth } from "./api";

const createProducts = async (data: FormData) => {
  const response = await apiAuth.post(`/products/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

const getProducts = async () =>{
    const response = await apiAuth.get('/products') ;
    return response;

}

const getProductsByCategory = async (categoryId: string) => {
  try {
    const response = await apiAuth.get(`/products/category/${categoryId}`);
    return response.data; // Retorna apenas os dados do response
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    throw error; // Repassa o erro para tratamento posterior
  }
};



export {
    createProducts,
    getProducts,
    getProductsByCategory
}