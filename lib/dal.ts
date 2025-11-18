import "server-only";

import { auth } from "@/lib/auth";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }
  return session;
});
