export interface ApiErrorResponse {
  code: number;
  message: string;
  details?: [
    {
      field: string;
      message: string;
    },
  ];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}
