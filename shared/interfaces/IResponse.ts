export interface IResponse<T> {
  data: T;
  error: string | null;
  successMessage: string | null;
}
