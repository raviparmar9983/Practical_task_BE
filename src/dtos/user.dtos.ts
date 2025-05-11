export interface UserDTO {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  hash: string;
  profilePic?: string;
  birthDate?: Date;
}

export interface LoginDTO {
  email: string;
  hash: string;
}
