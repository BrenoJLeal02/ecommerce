import { UserSignIn, UserSignUp, UserForgot } from "../interface/UserInterface";
import { apiAuth } from "./api";

const baseURL = '/user';

const signUp = async (data: UserSignUp) => {
  const user = await apiAuth.post(`${baseURL}/register`, data);
  return user;
};

const signIn = async (data: UserSignIn) => {
  const response = await apiAuth.post(`${baseURL}/login`, data);
  
  // Armazene o token JWT no localStorage
  if (response.data.token) {
    localStorage.setItem('jwtToken', response.data.token);
  }

  return response.data;
};

const forgot = async (data: UserForgot) => {
  const response = await apiAuth.post(`${baseURL}/forgot-password`, data);
  return response.data;
};

const getUsers = async () => {
  const response = await apiAuth.get(`${baseURL}/users`);
  return response.data.users;
};

export {
  signUp,
  signIn,
  forgot,
  getUsers
};
