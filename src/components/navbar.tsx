"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme/toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function Navbar() {
  const session = useSession();

  return (
    <div className="w-screen mx-auto flex items-center justify-center">
      <div className="flex justify-between items-center w-11/12 h-16 border-border border rounded-full px-10 mt-8">
        <div className="font-bold text-xl">
          <Link href="/">Thoughtful Threads</Link>
        </div>
        <div className="flex items-center justify-center gap-4">
          {session.data?.user ? (
            <>
              Hello {session.data.user.name}
              <Button variant={"destructive"} onClick={() => signOut()}>
                Log Out
              </Button>
            </>
          ) : (
            <Button onClick={() => signIn()}>Log In</Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
