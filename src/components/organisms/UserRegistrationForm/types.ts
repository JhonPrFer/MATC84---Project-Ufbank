export interface UserRegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserRegistrationFormProps {
  onSubmit?: (data: UserRegistrationData) => Promise<void>;
  initialData?: Partial<UserRegistrationData>;
}
