"use client";
import React from "react";

import { SignInSchema } from "@/lib/validation";
import AuthForm from "@/components/ui/forms/AuthForm";

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={"signInWithCredentials"}
    />
  );
};

export default SignIn;
