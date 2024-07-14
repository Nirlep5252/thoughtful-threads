"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function createBlog(title: string, content: string) {
  "use server";

  const session = await auth();
  if (!session?.user) return new Error("User not authenticated.");

  if (!title || !content) {
    return new Error("Title or Content not provided.");
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      author: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return blog.id;
}
