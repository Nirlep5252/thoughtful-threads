import prisma from "@/lib/db";
import { Preview } from "./preview";

export default async function ViewBlog({ params }: { params: { id: string } }) {
  const blog = await prisma.blog.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen p-8">
      <div className="w-11/12 flex flex-col gap-4">
        <div className="flex items-center justify-between px-6">
          <div className="title text-5xl font-bold">{blog.title}</div>
          <div>{blog.createdAt.toLocaleString()}</div>
        </div>
        <Preview blog={blog} />
      </div>
    </div>
  );
}
