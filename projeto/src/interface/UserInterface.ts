export interface UserSignUp {
    email: string;
    name: string;
    password: string;
    username: string;
    confirm_password: string;
}

export interface UserSignIn {
    username: string;
    password: string;

}
export interface UserForgot{
    username?: string;
    email: string;

}
export interface User {
    id: number;
    email: string;
    username: string;
    name: string;
  }