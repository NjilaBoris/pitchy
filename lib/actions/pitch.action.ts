import { Startup } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { PitchSchema } from "../validation";
import mongoose from "mongoose";

export async function createPitch(
  params: CreatePitchParams
): Promise<ActionResponse<Pitch>> {
  const validationResult = await action({
    params,
    schema: PitchSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, content, category, imageUrl, pitchDetails } =
    validationResult.params!;
  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [startup] = await Startup.create(
      [{ title, content, author: userId, category, imageUrl, pitchDetails }],
      { session }
    );

    if (!startup) throw new Error("Failed to create the startup");

    await session.commitTransaction();

    return { success: true, data: JSON.parse(JSON.stringify(startup)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
