export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface AuthResponse {
  token: string;
  permissions: Object;
  
}
