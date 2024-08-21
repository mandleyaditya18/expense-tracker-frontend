import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  return (
    <main className="min-h-dvh w-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="bg-slate-400 hidden lg:block"></section>
      <section className="place-content-center mx-auto w-10/12 sm:w-8/12 lg:w-8/12 ">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <h4 className="text-gray-500">
          Welcome back! Please enter your details
        </h4>

        <form className="mt-8 flex flex-col gap-4">
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />

          <Button type="submit">Login</Button>
        </form>
        <h6 className="text-sm mt-4 text-center">
          Do not have an account?{" "}
          <span className="text-blue-400 cursor-pointer">Sign Up</span>
        </h6>
      </section>
    </main>
  );
};

export default Login;
