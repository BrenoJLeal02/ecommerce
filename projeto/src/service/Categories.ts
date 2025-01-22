import { apiAuth } from "./api";

const getCategories = async () =>{
    const response = await apiAuth.get('/categories') ;
    return response;

}

const getCategoryById  = async (id:string) => {
    const response = await apiAuth.get(`/categories/${id}`);
    return response;
}


export{
    getCategories,
    getCategoryById
}