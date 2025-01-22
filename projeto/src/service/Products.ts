
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
export {
    createProducts,
    getProducts
}