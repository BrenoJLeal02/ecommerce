import { CreateProducts } from "../interface/ProductsInterface";
import { apiAuth } from "./api";

const createProducts = async (data: CreateProducts) => {
  const response = await apiAuth.post(`/products/create`, data);
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