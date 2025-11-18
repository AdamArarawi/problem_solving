"use client";
import React from "react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

const SignOut = () => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const signout = async () => {
    setLoading(true);
    await authClient.signOut();
    router.refresh();
    setLoading(false);
  };
  return (
    <Button
      onClick={signout}
      disabled={loading}
      className="flex items-center gap-2"
    >
      {loading ? <Spinner /> : ""}
      signout
    </Button>
  );
};

export default SignOut;
