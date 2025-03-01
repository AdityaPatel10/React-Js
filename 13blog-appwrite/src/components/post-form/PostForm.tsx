import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../../appwrite/config";
import { Post, PostFormData, RootState } from "../../types/PostFormTypes";
import { useCallback, useEffect } from "react";
import { Button, Input, Select, RTE } from "../index";

interface PostFormProps {
  post?: Post;
}

function PostForm({ post }: PostFormProps) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<PostFormData>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const submit = async (data: PostFormData) => {
    let file = null;
    if (data.image?.[0]) {
      file = await service.uploadFile(data.image[0]);
    }

    if (post) {
      if (file && post.featuredImg) {
        await service.deleteFile(post.featuredImg);
      }

      const dbPost = await service.updatePost(post.$id!, {
        ...data,
        featuredImg: file ? file.$id : post.featuredImg || "",
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const dbPost = await service.createPost({
        ...data,
        userId: userData.$id,
        featuredImg: file ? file.$id : "",
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    }
  };

  const slugTransform = useCallback((value: string) => {
    return value
      ? value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]/g, "-")
          .replace(/\s+/g, "-")
      : "";
  }, []);

  useEffect(() => {
    const subscription = watch((value: Partial<PostFormData>, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title || ""), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4"
          accept="image/*"
          {...register("image")}
        />
        {post?.featuredImg && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImg)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
