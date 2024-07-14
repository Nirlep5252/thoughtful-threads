"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MDXEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { createBlog } from "./action";
import { Button } from "@/components/ui/button";

export default function CreatePostPage() {
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]); // TODO: tags
  const [content, setContent] = useState<string | undefined>("");

  const createBlogAction = createBlog.bind(null, title, content || "");

  return (
    <form
      action={createBlogAction}
      className="flex flex-col items-center h-[80vh] p-8"
    >
      <div className="w-11/12 h-full">
        <Tabs defaultValue="edit" className="h-full">
          <div className="editor-pane flex items-center w-full h-9 relative">
            <TabsList className="absolute top-0 left-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <Button className="absolute top-0 right-2" type="submit">
              Create Post
            </Button>
          </div>
          <TabsContent value="edit" className="flex flex-col gap-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full text-3xl h-20"
            />
            <MDXEditor
              height="100%"
              value={content}
              onChange={setContent}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
              style={{
                background: "inherit",
                backgroundColor: "inherit",
                color: "inherit",
              }}
              preview="edit"
            />
          </TabsContent>
          <TabsContent value="preview">
            <MDXEditor.Markdown
              style={{
                padding: "20px",
                background: "inherit",
                backgroundColor: "inherit",
                color: "inherit",
              }}
              source={content}
            />
          </TabsContent>
        </Tabs>
      </div>
    </form>
  );
}
