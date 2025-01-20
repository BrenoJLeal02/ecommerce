
import { EstablishmentResponse } from "../interface/EstablishmentInterface";
import { apiAuth } from "./api";

const getEstablishment = async (): Promise<EstablishmentResponse> => {
  const response = await apiAuth.get(`/establishments`);
  return response.data;
}

export {
  getEstablishment
}
