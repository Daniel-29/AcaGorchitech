import { API_RESPONSE } from "./common";

export interface ContainerResponse extends API_RESPONSE {
  totalItems: number;
  items: Container[];
}
export interface Container {
  id: number;
  name: string;
  ip: string;
  status: string;
  port: string;
  containerId: string;
  id_scope: string;
  id_network: string;
  id_image: string;
  id_volumen: string;
  cpu: string;
  memory: string;
  label: string;
  environment: string;
  command: string;
  deleted: string;
}

export interface CreateContainer {
  name: string;
  ip: string;
  status: string;
  port: string;
  containerId: string;
  id_scope: string;
  id_network: string;
  id_image: string;
  id_volumen: string;
  cpu: string;
  memory: string;
  label: string;
  environment: string;
  command: string;
  deleted: string;
}
