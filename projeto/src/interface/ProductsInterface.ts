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
