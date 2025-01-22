
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

const getProductById = async (id: string) => {
  const response = await apiAuth.get(`/products/${id}`);
  return response.data;
};



const getProductsByCategory = async (categoryId: string) => {
    const response = await apiAuth.get(`/products/category/${categoryId}`);
    return response.data; 
};



export {
    createProducts,
    getProducts,
    getProductsByCategory,
    getProductById 
}