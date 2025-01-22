import { Route, Routes } from "react-router-dom";
import {Category, CreateProduct, Forgot, Home, Login, Product, ProductsList, Register} from "./index"
export function MainRoutes() { 
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forgot" element={<Forgot/>} />
      <Route path="/homepage" element={<Home/>} />
      <Route path="/category/:id" element={<Category/>}/>
      <Route path="/products" element={<ProductsList/>} />
      <Route path="/products/:id" element={<Product/>} />
      <Route path="/create-products" element={<CreateProduct/>} />
    </Routes>
  );
}
