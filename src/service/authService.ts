import api from "./axiosInstence";

type userData = {
  username: string;
  password: string;
};

export async function RegisterService({ username, password }: userData) {
  return await api.post("/auth/register", {
    username,
    password,
  });
}

export async function LoginService({ username, password }: userData) {
  return await api.post("/auth/login", {
    username,
    password,
  });
}

export function logoutService() {
  api.delete("/logout");
}

export async function test() {
  const a = await api.get("/auth/test");
  console.log(a);
}
