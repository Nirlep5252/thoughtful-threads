"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme/toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon } from "lucide-react";

export function Navbar() {
  const session = useSession();

  return (
    <div className="w-screen mx-auto flex items-center justify-center">
      <div className="flex justify-between items-center w-11/12 h-16 border-border border rounded-full px-10 mt-8">
        <div className="font-bold text-xl">
          <Link href="/">Thoughtful Threads</Link>
        </div>
        <div className="flex items-center justify-center gap-4">
          {session.data?.user && (
            <>
              <Link href="/create-post">
                <Button variant="outline">Create Post</Button>
              </Link>

              <div className="notifications">
                {/* TODO: make it a dropdown, and fetch notifications from the DB */}
                <Button variant={"ghost"} size="icon">
                  <BellIcon />
                </Button>
              </div>
            </>
          )}
          {session.data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={session.data.user.image || ""}
                    alt={session.data.user.name || ""}
                  />
                  <AvatarFallback>
                    {session.data.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                    <div>{session.data.user.name}</div>
                    <div className="text-gray-400">
                      {session.data.user.email}
                    </div>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/settings">
                  <DropdownMenuItem className="cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()}>Log In</Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
