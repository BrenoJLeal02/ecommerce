export interface CreateProducts {
  name: string;
  description: string;
  price: number;  // Alterado para number
  stock: number;
  establishment_id: number;
  category_id:  number | null;
  created_at: string;
  updated_at?: string;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  category_name: string;  // Adicionado o nome da categoria
  image_path: string;  // Novo campo para a imagem
}