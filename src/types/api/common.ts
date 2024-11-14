export interface ApiResponse {
  code: number;
  message: string;
  details?: [
    {
      field: string;
      message: string;
    },
  ];
}
