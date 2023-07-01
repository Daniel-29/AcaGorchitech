import { API_RESPONSE } from "./common";

export interface UserResponse extends API_RESPONSE {
  totalItems: number;
  items: Users[];
}
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  emailVisibility: boolean;
  // roleId: string;
}
export interface Users {
  id: number;
  username: string;
  name: string;
  email: string;
}
export interface CreateUser {
  username: string;
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  emailVisibility: boolean;
  //roleId: string;
}
