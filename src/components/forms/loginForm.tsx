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
      callbackUrl: "/dashboard" as string,
    });
  };
  return (
    <div className="flex flex-col items-center gap-2 font-roboto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {error && <p className="text-center">Meow! Login failed, try again!</p>}
        <label>Email</label>
        <input
          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red11">Error! This field is required</span>
        )}
        <label>Password</label>
        <input
          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red11">Error! This field is required</span>
        )}
        <div className="my-4 flex justify-center">
          <div className="bg-blue10 py-1 px-1 dark:bg-darkBlue7">
            <input
              type="submit"
              className="cursor-pointer bg-blue10 px-2 py-1 text-lg text-olive2 hover:outline hover:outline-2 hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue7"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
