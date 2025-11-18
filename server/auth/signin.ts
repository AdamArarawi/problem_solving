"use server";
import { auth } from "@/lib/auth";

interface SigninProps {
  email: string;
  password: string;
}

export const signin = async ({ email, password }: SigninProps) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return {
      success: true,
      message: "User signed in successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Faild to sign in",
    };
  }
};

export default signin;
