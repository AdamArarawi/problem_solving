"use server";
import { auth } from "@/lib/auth";

interface SignupProps {
  name: string;
  email: string;
  password: string;
}

const signup = async ({ name, email, password }: SignupProps) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return {
      success: true,
      message: "User created successfully, Wait for admin approval",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Faild to sign up",
    };
  }
};

export default signup;
