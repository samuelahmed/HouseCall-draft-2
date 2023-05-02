import React from "react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import type { IRegister } from "@/validation/auth";

const RegisterForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const mutation = trpc.auth.register.useMutation({
    onError: (e) => setErrorMessage(e.message),
    onSuccess: () => router.push("/login"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    setErrorMessage(undefined);
    await mutation.mutateAsync(data);
  };

  return (
    <div className="flex flex-col items-center gap-2 font-roboto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {errorMessage && (
          <p className="text-red-600 text-center">{errorMessage}</p>
        )}
        <label>Username</label>
        <input
          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
          type="username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className="text-red11 text-center">Error! This field is required</p>
        )}
        <label>Email</label>
        <input
          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red11 text-center">Error! This field is required</p>
        )}
        <label>Password</label>
        <input
          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-red11 text-center">Error! This field is required</p>
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

export default RegisterForm;
