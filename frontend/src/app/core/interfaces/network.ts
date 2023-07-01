import { API_RESPONSE } from "./common";

export interface NetworkResponse extends API_RESPONSE {
  totalItems: number;
  items: Network[];
}
export interface Network {
  id: number;
  name: string;
  label: string;
  alias: string;
  subnet: string;
  gateway: string;
  driver: string;
  networkId: string;
}

export interface CreateNetwork {
  name: string;
  label: string;
  alias: string;
  subnet: string;
  gateway: string;
  driver: string;
  networkId: string;
}
