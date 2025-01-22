import { Route, Routes } from "react-router-dom";
import {CreateProduct, Forgot, Home, Login, ProductsList, Register} from "./index"
export function MainRoutes() { 
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forgot" element={<Forgot/>} />
      <Route path="/homepage" element={<Home/>} />
      <Route path="/products" element={<ProductsList/>} />
      <Route path="/create-products" element={<CreateProduct/>} />
    </Routes>
  );
}
