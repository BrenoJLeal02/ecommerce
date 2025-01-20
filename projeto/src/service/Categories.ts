import { apiAuth } from "./api";

const getCategories = async () =>{
    const response = await apiAuth.get('/categories') ;
    return response;

}
export{
    getCategories,
}