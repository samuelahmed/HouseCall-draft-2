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
    <div className="flex flex-col items-center gap-2 bg-blue1 dark:bg-darkBlue1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {errorMessage && (
          <p className="text-red-600 text-center">{errorMessage}</p>
        )}
        <label>Username</label>
        <input
          className="w-full rounded-sm border border-blue7 bg-blue1 px-1 text-left text-olive12 focus:border-blue8 focus:outline-none dark:border-darkBlue7 dark:bg-darkBlue1 dark:text-darkOlive12 dark:focus:border-darkBlue8"
          type="username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className="text-red-600 text-center">This field is required</p>
        )}
        <label>Email</label>
        <input
          className="w-full rounded-sm border border-blue7 bg-blue1 px-1 text-left text-olive12 focus:border-blue8 focus:outline-none dark:border-darkBlue7 dark:bg-darkBlue1 dark:text-darkOlive12 dark:focus:border-darkBlue8"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red-600 text-center">This field is required</p>
        )}
        <label>Password</label>
        <input
          className="w-full rounded-sm border border-blue7 bg-blue1 px-1 text-left text-olive12 focus:border-blue8 focus:outline-none dark:border-darkBlue7 dark:bg-darkBlue1 dark:text-darkOlive12 dark:focus:border-darkBlue8"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-red-600 text-center">This field is required</p>
        )}

        <input
          type="submit"
          className="mt-2 cursor-pointer border border-solid border-blue7 bg-blue3 text-base text-olive12 hover:border-blue8 hover:bg-blue4 
          dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
        />
      </form>
    </div>
  );
};

export default RegisterForm;
