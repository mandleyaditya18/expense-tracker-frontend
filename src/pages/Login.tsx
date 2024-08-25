import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/api";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await api.post("/users/login/", { username, password });
    const { access, refresh } = await response.data;
    localStorage.setItem("token", access);
    localStorage.setItem("refresh_token", refresh);

    setUsername("");
    setPassword("");

    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-dvh w-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="bg-slate-400 hidden lg:block"></section>
      <section className="place-content-center mx-auto w-10/12 sm:w-8/12 lg:w-8/12 ">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <h4 className="text-gray-500">
          Welcome back! Please enter your details
        </h4>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Login</Button>
        </form>
        <h6 className="text-sm mt-4 text-center">
          Do not have an account?{" "}
          <Link to="/signup" className="text-blue-400 cursor-pointer">
            Sign Up
          </Link>
        </h6>
      </section>
    </main>
  );
};

export default Login;
