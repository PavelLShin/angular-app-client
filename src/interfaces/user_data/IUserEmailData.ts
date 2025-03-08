export interface IUserEmailData {
  email: string;
}

export interface IUserIdPasswordData {
  id: number;
  password: string;
}

export interface IUserIdPasswordEmailData {
  id: string | null;
  password: string;
  currentPassword: string;
  email: string;
}
