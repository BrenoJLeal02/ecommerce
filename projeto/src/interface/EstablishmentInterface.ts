// Definindo a interface para o Estabelecimento
 interface Establishment {
    id: number;
    name: string;
    description: string;
    location: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  }
  
  // Definindo a interface para a resposta da API
  export interface EstablishmentResponse {
    establishments: Establishment[];
  }