import { Route, Routes } from "react-router-dom";
import {Forgot, Home, Login, Register} from "./index"
export function MainRoutes() { 
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forgot" element={<Forgot/>} />
      <Route path="/homepage" element={<Home/>} />
    </Routes>
  );
}
