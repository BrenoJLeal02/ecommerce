
 interface Establishment {
    id: number;
    name: string;
    description: string;
    location: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface EstablishmentResponse {
    establishments: Establishment[];
  }