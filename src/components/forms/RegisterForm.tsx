"use client";
import { useForm } from "react-hook-form";
import MyInput from "../shared/MyInput";
import { Lock, Mail, User } from "lucide-react";

import { Button } from "../ui/button";
import Link from "next/link";

const RegisterForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const submitRegister = (formValues: any) => {
    console.log(formValues);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submitRegister)}
        className="w-full flex flex-col gap-3.5"
      >
        <div>
          <MyInput
            control={control}
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            isPassword={false}
            icon={<User className="size-5" />}
          />
        </div>
        <div>
          <MyInput
            control={control}
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            isPassword={false}
            icon={<Mail className="size-5" />}
          />
        </div>
        <div>
          <MyInput
            control={control}
            label="pasword"
            name="password"
            type="password"
            placeholder="Enter your Password"
            isPassword={true}
            icon={<Lock className="size-5" />}
          />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </>
  );
};

export default RegisterForm;
