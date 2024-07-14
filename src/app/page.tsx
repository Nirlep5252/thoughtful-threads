import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const latestBlogs = await prisma.blog.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="flex flex-col items-center h-screen p-8">
      <div className="w-11/12 flex flex-col gap-4">
        <div className="text-4xl font-bold">Latest Blogs</div>
        <div className="flex flex-wrap gap-4">
          {latestBlogs.map((blog) => (
            <Link
              href={{
                pathname: `/blog/${blog.id}`,
                query: { title: blog.title },
              }}
              key={blog.id}
              className="w-[calc(33%-1rem)]"
            >
              <Card className="hover:bg-border transition-all duration-100">
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {blog.content.slice(0, 100)}...
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-gray-500">
                      {blog.createdAt.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
                      <Image
                        src={blog.author.image || ""}
                        alt={blog.author.name || ""}
                        width={24}
                        height={24}
                        className="rounded-full"
                        unoptimized
                      />
                      {blog.author.name}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
