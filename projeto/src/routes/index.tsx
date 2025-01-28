import CategoryPage from "../pages/CategoryPage/CategoryPage";
import CreateCategoryPage from "../pages/CreateCategoryPage/CreateCategoryPage";
import { CreateProductPage } from "../pages/CreateProductPage/CreateProductPage";
import {ForgotPage} from "../pages/ForgotPage/ForgotPage";
import { HomePage } from "../pages/HomePage/HomePage";
import {LoginPage }from "../pages/LoginPage/LoginPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import {ProductsListPage} from "../pages/ProductsListPage/ProductsListPage";
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
export function Category(){
    return(
        <>
            <CategoryPage/>
        </>
    )

}
export function CreateCategory(){
    return(
        <>
            <CreateCategoryPage/>
        </>
    )

}

export function Product(){
    return(
        <>
            <ProductPage/>
        </>
    )
}
export function ProductsList(){
    return(
        <>
            <ProductsListPage/>
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