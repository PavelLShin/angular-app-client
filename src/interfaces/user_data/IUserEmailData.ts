export interface IUserEmailData {
  email: string;
}

export interface IUserIdPasswordData<T> {
  id: T;
  password: string;
}

export interface IUserIdPasswordEmailData<T>
  extends IUserEmailData,
    IUserIdPasswordData<T> {
  currentPassword: string;
}
