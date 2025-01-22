export interface CreateProducts {
  name: string;
  description: string;
  price: number;  
  stock: number;
  establishment_id: number;
  category_id:  number | null;
  created_at: string;
  updated_at?: string;
}
export interface Product {
  id: string ;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_name: string;  
  image_path: string;  
}