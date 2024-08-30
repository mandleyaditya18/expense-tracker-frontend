import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/api";

const defaultFormData = {
  email: "",
  username: "",
  name: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormData);
  const user = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, user]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await api.post("/users/register/", {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      password2: formData.confirmPassword,
    });
    const { access, refresh } = await response.data;
    localStorage.setItem("token", access);
    localStorage.setItem("refresh_token", refresh);

    setFormData(defaultFormData);

    navigate("/", { replace: true });
    console.log(formData);
  };

  return (
    <main className="min-h-dvh w-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="bg-slate-400 hidden lg:block"></section>
      <section className="place-content-center mx-auto w-10/12 sm:w-8/12 lg:w-8/12 ">
        <h1 className="text-3xl font-semibold">Get Started with Us</h1>
        <h4 className="text-gray-500">
          Create your account and start your journey with us.
        </h4>

        <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmitHandler}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChangeHandler}
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={onChangeHandler}
          />
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={onChangeHandler}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChangeHandler}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={onChangeHandler}
          />

          <Button type="submit">Sign Up</Button>
        </form>
        <h6 className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 cursor-pointer">
            Login
          </Link>
        </h6>
      </section>
    </main>
  );
};

export default SignUp;
