import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import type { ILogin } from "@/validation/auth";

const LoginForm = () => {
  const router = useRouter();
  const { error } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
 
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    await signIn("credentials", { ...data, callbackUrl: "/loginSuccess" as string });
  };

  return (
    <div className="flex flex-col items-center gap-2 bg-[hsl(0,0%,96%)] dark:bg-slate-800">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {error && (
          <p className="text-center text-red-600">Meow! Login failed, try again!</p>
        )}
        <label>Email</label>
        <input
          className="rounded border py-1 px-4"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Meow! This field is required</span>}
        <label>Password</label>
        <input
          className="rounded border py-1 px-4"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Meow! This field is required</span>}

        <input type="submit" className="rounded border py-1 px-4" />
      </form>
    </div>
  );
};

export default LoginForm;
