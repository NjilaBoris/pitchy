import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import PitchForm from "@/components/forms/PitchForm";

const AskAQuestion = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return redirect("/sign-in");

  return (
    <>
      <section
        className="w-full bg-primary  pattern flex justify-center
       items-center flex-col py-10 px-6 !min-h-[230px]"
      >
        <h1
          className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white 
        sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center mt-20"
        >
          Submit Your Startup
        </h1>
      </section>

      <PitchForm />
    </>
  );
};

export default AskAQuestion;
