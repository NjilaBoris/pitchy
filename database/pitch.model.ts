import { model, models, Schema, Types, Document } from "mongoose";

export interface IStartup {
  title: string;
  description: string;
  views: number;
  category: string;
  imageUrl: string;
  pitch: string;
  author: Types.ObjectId;
}

export interface IQuestionDoc extends IStartup, Document {}
const StartupSchema = new Schema<IStartup>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    views: { type: Number, default: 0 },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    pitch: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Startup = models?.Startup || model<IStartup>("Startup", StartupSchema);

export default Startup;
