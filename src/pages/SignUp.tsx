import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  return (
    <main className="min-h-dvh w-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="bg-slate-400 hidden lg:block"></section>
      <section className="place-content-center mx-auto w-10/12 sm:w-8/12 lg:w-8/12 ">
        <h1 className="text-3xl font-semibold">Get Started with Us</h1>
        <h4 className="text-gray-500">
          Create your account and start your journey with us.
        </h4>

        <form className="mt-8 flex flex-col gap-4">
          <Input type="email" placeholder="Email" />
          <Input type="text" placeholder="Username" />
          <Input type="text" placeholder="Name" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />

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
