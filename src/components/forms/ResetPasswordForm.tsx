"use client";
import { useForm } from "react-hook-form";
import MyInput from "../shared/MyInput";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";

const ResetPasswordForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
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
            label="Confirm Password"
            name="confirm_password"
            type="password"
            placeholder="Enter your Password"
            isPassword={true}
            icon={<Lock className="size-5" />}
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
        <Button type="submit">Reset Password</Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
