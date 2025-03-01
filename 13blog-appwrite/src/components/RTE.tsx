import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import RTETypes from "../types/RTETypes";

export default function RTE({
  name,
  control,
  label,
  defaultValue = "",
}: RTETypes) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
          apiKey="2vl5gx2o1naliyerkf39jacla2gyp9ursug94vcx6b5q6fjn"
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              tinycomments_mode: "embedded",
              tinycomments_author: "Aditya Patel",
              // readonly: false, // ✅ Explicitly setting read-only to false
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
