export interface User {
  username: string;
  password: string;
}
export interface UserSignUp extends User {
  confirmPassword: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  username: string;
}

export interface SignUpResponse {
  success?: boolean;
  username?: string;
  error?: string;
}

export interface LoginResponse {
  error?: string;
  success?: boolean;
}
