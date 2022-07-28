export const RegisterKeys = ['password', 'email', 'form'] as const;
export type APIError<T> = {
  fieldErrors: Partial<Record<T[number], string>>;
};
