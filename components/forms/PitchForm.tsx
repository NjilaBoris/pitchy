"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ROUTES from "@/constants/routes";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PitchSchema } from "@/lib/validation";
import { createPitch } from "@/lib/actions/pitch.action";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Params {
  pitch?: Pitch;
  isEdit?: boolean;
}

const PitchForm = ({ pitch, isEdit = false }: Params) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PitchSchema>>({
    resolver: zodResolver(PitchSchema),
    defaultValues: {
      title: pitch?.title || "",
      category: pitch?.category || "",
      content: pitch?.pitchDetails || "",
      imageUrl: pitch?.imageUrl || "",
      pitchDetails: pitch?.description || "",
    },
  });

  const handleCreatePitch = async (data: z.infer<typeof PitchSchema>) => {
    startTransition(async () => {
      if (isEdit && pitch) {
        const result = await editQuestion({
          questionId: pitch?._id,
          ...data,
        });

        if (result.success) {
          toast.success("Success", {
            description: "Question updated Successfully",
            style: {
              backgroundColor: "#24a148",
              color: "#fff",
              border: "1px solid #24a148",
            },
          });

          if (result.data) router.push(ROUTES.PITCH(result.data._id));
        } else {
          toast.error(`Error ${result?.status}`, {
            description: result?.error?.message || "Something Went Wrong",
            style: {
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
            },
          });
        }

        return;
      }

      const result = await createPitch(data);

      if (result.success) {
        toast.success("Success", {
          description: "Question created Successfully",
          style: {
            backgroundColor: "#24a148",
            color: "#fff",
            border: "1px solid #24a148",
          },
        });

        if (result.data) router.push(ROUTES.QUESTION(result.data._id));
      } else {
        toast.error(`Error ${result?.status}`, {
          description: result?.error?.message || "Something Went Wrong",
          style: {
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
          },
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreatePitch)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you&apos;ve put in the
                title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="primary-gradient w-fit !text-light-900 cursor-pointer"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <>{isEdit ? "Edit" : "Ask a Question"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PitchForm;
