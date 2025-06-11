import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import PitchForm from "@/components/forms/PitchForm";

const CreatePitch = async () => {
  const session = await auth();

  if (!session) return redirect("/sign-in");

  return (
    <>
      <section
        className="w-full bg-primary  pattern flex justify-center
       items-center flex-col py-10 px-6 !min-h-[300px]"
      >
        <h1
          className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white 
        sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center mt-20"
        >
          Submit Your Startup
        </h1>
      </section>
      <section className="w-[80%] m-auto mt-[2.5rem]">
        <PitchForm />
      </section>
    </>
  );
};

export default CreatePitch;
