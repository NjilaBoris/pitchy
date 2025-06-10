import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import PitchForm from "@/components/forms/PitchForm";
import { toast } from "sonner";

const AskAQuestion = async () => {
  const session = await auth();

  if (!session) return redirect("/sign-in");
  toast.warning("Warning", {
    description: "You can get access to this page only if you are logged in.",
    descriptionClassName: "text-[#FFC107]",
    style: {
      backgroundColor: "#ffc107c1",
      color: "#FFC107",
    },
  });

  return (
    <>
      <section
        className="w-full bg-primary  pattern flex justify-center
       items-center flex-col py-10 px-6 !min-h-[230px]"
      >
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      <PitchForm />
    </>
  );
};

export default AskAQuestion;
