import { API_RESPONSE } from "./common";

export interface VolumeResponse extends API_RESPONSE {
  totalItems: number;
  items: Volume[];
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

export interface CreateVolume {
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
