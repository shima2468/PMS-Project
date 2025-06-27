export interface registerFormInputs {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList;
}

export interface formInputs {
  email: string;
  password: string;
}

export interface IchangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IforgetPassword {
  email: string;
}
export interface IResetPassword {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}
export interface IverifyAccount {
  email: string;
  code: string;
}
