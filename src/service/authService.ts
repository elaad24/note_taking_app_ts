import axios from "axios";

type userData = {
  username: string;
  password: string;
};

export async function RegisterService({ username, password }: userData) {
  return await axios.post("http://localhost:50001/auth/register", {
    username,
    password,
  });
}

export async function LoginService({ username, password }: userData) {
  return await axios.post("http://localhost:50001/auth/login", {
    username,
    password,
  });
}
