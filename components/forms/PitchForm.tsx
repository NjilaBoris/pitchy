"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
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
import { createPitch, editPitch } from "@/lib/actions/pitch.action";
import { PitchSchema } from "@/lib/validation";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

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
      description: pitch?.description || "",
      imageUrl: pitch?.imageUrl || "",
      pitchDetails: pitch?.pitchDetails || "",
    },
  });

  const handleCreatePitch = async (data: z.infer<typeof PitchSchema>) => {
    startTransition(async () => {
      if (isEdit && pitch) {
        const result = await editPitch({
          pitchId: pitch?._id,
          ...data,
        });

        if (result.success) {
          toast.success("Success", {
            description: "Question created Successfully",
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
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex sm:w-[70%] flex-col gap-10 m-auto "
        onSubmit={form.handleSubmit(handleCreatePitch)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 sm:!text-[1rem]">
                Pitch Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and brief with your pitch title.
              </FormDescription>
              <FormMessage className="text-[#721c24]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 sm:!text-[1rem]">
                Description <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                A brief description of your Startup
              </FormDescription>
              <FormMessage className="text-[#721c24]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 sm:!text-[1rem]">
                Startup Category <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Startup Category (Tech, Health, Education...).
              </FormDescription>
              <FormMessage className="text-[#721c24]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 sm:!text-[1rem]">
                Startup Image Url<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Startup Image URL
              </FormDescription>
              <FormMessage className="text-[#721c24]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 sm:text-[1rem]">
                Detailed explanation of your Startup{" "}
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
                Tell us everything about your startup. It could include your
                mission, problem statement, solution, business model, target
                audience, and any other relevant details.
              </FormDescription>
              <FormMessage className="text-[#721c24]" />
            </FormItem>
          )}
        />

        <div className="mt-3 flex justify-end ">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-primary w-full !p-7 !text-light-900 mb-3"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <>{isEdit ? "Edit" : "Submit Startup"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PitchForm;
