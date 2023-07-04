import { API_RESPONSE } from "./common";

export interface ImageResponse extends API_RESPONSE {
  totalItems: number;
  items: Image[];
}
export interface Image {
  id: number;
  name: string;
  size: string;
  date: string;
  imageId: string;
  deleted: string;
}

export interface CreateImage {
  name: string;
  size: string;
  date: string;
  imageId: string;
  deleted: string;
}
