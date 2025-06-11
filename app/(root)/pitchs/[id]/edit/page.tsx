import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";

import ROUTES from "@/constants/routes";
import { getPitch } from "@/lib/actions/pitch.action";
import PitchForm from "@/components/forms/PitchForm";

const EditQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session) return redirect("/sign-in");

  const { data: pitch, success } = await getPitch({ pitchId: id });
  if (!success) return notFound();

  if (pitch?.author._id.toString() !== session?.user?.id)
    redirect(ROUTES.PITCH(id));

  return (
    <main>
      <PitchForm pitch={pitch} isEdit />
    </main>
  );
};

export default EditQuestion;
