import { ObjectId } from 'mongodb';

export interface User {
  username: string;
  password: string;
}

export interface UserSignUpInput extends User {
  confirmPassword: string;
}

export interface UserDB extends User {
  _id: ObjectId;
}
