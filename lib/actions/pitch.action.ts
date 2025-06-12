import { Startup } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  EditPitchSchema,
  GetPitchSchema,
  PaginatedSearchParamsSchema,
  PitchSchema,
} from "../validation";
import mongoose, { FilterQuery } from "mongoose";
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
export async function editPitch(
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
export const getPitch = cache(async function getQuestion(
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

export async function getPitchs(params: PaginatedSearchParams): Promise<
  ActionResponse<{
    pitch: Pitch;
    isNext: boolean;
  }>
> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  const filterQuery: FilterQuery<typeof Startup> = {};
  let sortCriteria = {};

  try {
    // Search
    if (query) {
      filterQuery.$or = [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ];
    }

    // Filters
    switch (filter) {
      case "newest":
        sortCriteria = { createdAt: -1 };
        break;
      case "oldest":
        sortCriteria = { createdAt: 1 };
        break;

      default:
        sortCriteria = { createdAt: -1 };
        break;
    }

    const totalQuestions = await Startup.countDocuments(filterQuery);

    const pitchs = await Startup.find(filterQuery)
      .populate("author", "name image")
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + pitchs.length;

    return {
      success: true,
      data: {
        pitch: JSON.parse(JSON.stringify(pitchs)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
