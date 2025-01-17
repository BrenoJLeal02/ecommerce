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
interface EstablishmentResponse {
  establishments: Establishment[];
}

// Função para obter os estabelecimentos
import { apiAuth } from "./api";

const getEstablishment = async (): Promise<EstablishmentResponse> => {
  const response = await apiAuth.get(`/establishments`);
  return response.data;
}

export {
  getEstablishment
}
