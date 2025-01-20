import { CreateProductPage } from "../pages/CreateProductPage/CreateProductPage";
import {ForgotPage} from "../pages/ForgotPage/ForgotPage";
import { HomePage } from "../pages/HomePage/HomePage";
import {LoginPage }from "../pages/LoginPage/LoginPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import {RegisterPage} from "../pages/RegisterPage/RegisterPage";

export function Login(){
    return(
        <>
            <LoginPage/>
        </>
    )
}
export function Register(){
    return(
        <>
            <RegisterPage/>
        </>
    )
}
export function Forgot(){
    return(
        <>
            <ForgotPage/>
        </>
    )
}
export function Home(){
    return(
        <>
            <HomePage/>
        </>
    )
}
export function Products(){
    return(
        <>
            <ProductsPage/>
        </>
    )
}

export function CreateProduct(){
    return(
        <>
            <CreateProductPage/>
        </>
    )
}