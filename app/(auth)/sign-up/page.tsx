"use client";
import React from "react";

import { SignUpSchema } from "@/lib/validation";
import AuthForm from "@/components/forms/AuthForm";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={"signUpWithCredentials"}
    />
  );
};

export default SignUp;
