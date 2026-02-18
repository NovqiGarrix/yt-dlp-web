export interface FormError {
  field: string;
  message: string;
}

export class MyException extends Error {
  data?: FormError[];

  constructor(message?: string) {
    super(message);
  }

  setData(data: FormError[]) {
    this.data = data;
  }
}
