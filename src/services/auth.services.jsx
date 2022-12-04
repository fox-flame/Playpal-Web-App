import myAxios from "../axios/axiosSettings.ts";

export const Login = (email, password) => {
  return myAxios.post("/auth/login", {
    email: email,
    password: password,
  });
};
