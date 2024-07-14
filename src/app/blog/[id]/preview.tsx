"use client";

import MDEditor from "@uiw/react-md-editor";

export function Preview({
  blog,
}: {
  blog: { content: string; title: string };
}) {
  return (
    <MDEditor.Markdown
      source={blog.content}
      style={{
        padding: "20px",
        background: "inherit",
        backgroundColor: "inherit",
        color: "inherit",
      }}
    />
  );
}
