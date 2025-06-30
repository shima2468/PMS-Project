export const emailValidation = {
  required: {
    value: true,
    message: "Email is required",
  },
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Email is invalid",
  },
};

export const passValidation = {
  required: {
    value: true,
    message: "Password is required",
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{8,}$/,
    message: "Password is invalid",
  },
};
export const ConfirmPassValidation = {
  required: "Confirm Password is required",
  invalid: "Password is not matching",
};
export const otpValidation = {
  required: "OTP is required",
  invalid: "OTP is invalid",
};

export const requiredValidation = {
  required: {
    value: true,
    message: "This field is required",
  },
};
