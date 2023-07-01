import { API_RESPONSE } from "./common";

export interface ScopeResponse extends API_RESPONSE {
  totalItems: number;
  items: Scope[];
}
export interface Scope {
  id: number;
  name: string;
  description: string;
}

export interface CreateScope {
    name: string;
    description: string;
}
