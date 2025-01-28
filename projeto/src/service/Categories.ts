import { Category } from "../interface/CategoriesInterface";
import { apiAuth } from "./api";

const getCategories = async () =>{
    const response = await apiAuth.get('/categories') ;
    return response;

}

const getCategoryById  = async (id:string) => {
    const response = await apiAuth.get(`/categories/${id}`);
    return response;
}

const createCategory = async (data: Category) => {
    const response = await apiAuth.post(`/categories/create`, data);
    return response ;
}


export{
    getCategories,
    getCategoryById,
    createCategory
}