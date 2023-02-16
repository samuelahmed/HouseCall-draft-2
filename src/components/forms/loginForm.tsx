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
    await signIn("credentials", {
      ...data,
      callbackUrl: "/loginSuccess" as string,
    });
  };
  return (
    <div className="bg- flex flex-col items-center gap-2 text-olive12 dark:text-darkOlive12">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {error && <p className="text-center">Meow! Login failed, try again!</p>}
        <label>Email</label>
        <input
          className="w-full rounded-sm border border-blue7 bg-blue1 text-left px-1 text-olive12 focus:border-blue8 focus:outline-none dark:border-darkBlue7 dark:bg-darkBlue1 dark:text-darkOlive12 dark:focus:border-darkBlue8"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Meow! This field is required</span>}
        <label>Password</label>
        <input
          className="w-full rounded-sm border border-blue7 bg-blue1 text-left px-1 text-olive12 focus:border-blue8 focus:outline-none dark:border-darkBlue7 dark:bg-darkBlue1 dark:text-darkOlive12 dark:focus:border-darkBlue8"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Meow! This field is required</span>}
        <input
          type="submit"
          className="mt-2 cursor-pointer border border-solid border-blue7 bg-blue9 text-base text-olive12 hover:border-blue8 hover:bg-blue10 
        dark:border-darkBlue7 dark:bg-darkBlue9 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue10"
        />
      </form>
    </div>
  );
};

export default LoginForm;
