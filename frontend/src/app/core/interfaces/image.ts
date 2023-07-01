import { API_RESPONSE } from "./common";

export interface ImageResponse extends API_RESPONSE {
  totalItems: number;
  items: Image[];
}
export interface Image {
  id: number;
  name: string;
  repository: string;
  tag: string;
  size: number;
  date: Date;
  imageId: string;
}

export interface CreateImage {
  name: string;
  repository: string;
  tag: string;
  size: number;
  date: Date;
  imageId: string;
}
