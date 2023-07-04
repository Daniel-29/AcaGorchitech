import { API_RESPONSE } from "./common";

export interface VolumeResponse extends API_RESPONSE {
  totalItems: number;
  items: Volume[];
}
export interface Volume {
  id: number;
  name: string;
  mount: string;
  driver: string;
  label: string;
  volumenld: string;
  deleted: string;
}

export interface CreateVolume {
  name: string;
  mount: string;
  driver: string;
  label: string;
  volumenld: string;
  deleted: string;
}
