import { Startup } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { EditPitchSchema, GetPitchSchema, PitchSchema } from "../validation";
import mongoose from "mongoose";
import { IStartup } from "@/database/pitch.model";
import { cache } from "react";

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
export async function editQuestion(
  params: EditPitchParams
): Promise<ActionResponse<IStartup>> {
  const validationResult = await action({
    params,
    schema: EditPitchSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, content, category, imageUrl, pitchDetails, pitchId } =
    validationResult.params!;
  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const pitch = await Startup.findById(pitchId);
    if (!pitch) throw new Error("Pitch not found");

    if (pitch.author.toString() !== userId) {
      throw new Error("You are not authorized to edit this question");
    }

    if (
      pitch.title !== title ||
      pitch.content !== content ||
      pitch.category !== category ||
      pitch.imageUrl !== imageUrl ||
      pitch.pitchDetails !== pitchDetails
    ) {
      pitch.title = title;
      pitch.content = content;
      pitch.category = category;
      pitch.imageUrl = imageUrl;
      pitch.pitchDetails = pitchDetails;
      await pitch.save({ session });
    }

    // Save the updated question
    await pitch.save({ session });
    await session.commitTransaction();

    return { success: true, data: JSON.parse(JSON.stringify(pitch)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
export const getPitchn = cache(async function getQuestion(
  params: GetPitchParams
): Promise<ActionResponse<Pitch>> {
  const validationResult = await action({
    params,
    schema: GetPitchSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { pitchId } = validationResult.params!;

  try {
    const pitch = await Startup.findById(pitchId).populate(
      "author",
      "_id name image"
    );
    if (!pitch) throw new Error("Pitch not found");

    return { success: true, data: JSON.parse(JSON.stringify(pitch)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
});
