import { API_RESPONSE } from "./common";

export interface ContainerResponse extends API_RESPONSE {
  totalItems: number;
  items: Container[];
}
export interface Container {
  id: number;
  name: string;
  cpu: string;
  memory: string;
  storage: string;
  label: string;
  ip: string;
  port: string;
  status: string;
  containerId: string;
  id_scope: string;
  id_network: string;
  id_image: string;
  id_volumen: string;
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
export interface Scope {
  id: number;
  name: string;
  description: string;
}
export interface Volume {
  id: number;
  name: string;
  type: string;
  source: string;
  mount: string;
  target: string;
  driver: string;
  label: string;
  size: string;
  volumenld: string;
}
export interface CreateContainer {
  name: string;
  cpu: string;
  memory: string;
  storage: string;
  label: string;
  ip: string;
  port: string;
  status: string;
  containerId: string;
  id_scope: string;
  id_network: string;
  id_image: string;
  id_volumen: string;
}
