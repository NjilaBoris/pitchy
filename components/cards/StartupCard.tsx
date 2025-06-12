import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";

import EditDeleteAction from "../user/EditDeletionAction";

import { EyeIcon } from "lucide-react";

import Image from "next/image";
import { Button } from "../ui/button";

interface Props {
  pitch: Pitch;
  showActionBtns?: boolean;
}

const StartupCard = ({
  pitch: {
    _id,
    title,
    author,
    createdAt,
    views,
    category,
    pitchDetails,
    imageUrl,
    description,
  },
  showActionBtns = false,
}: Props) => {
  return (
    <li
      className=" bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-primary transition-all
     duration-500 hover:shadow-300 hover:bg-primary-100 group"
    >
      <div className="flex-between">
        <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full group-hover:bg-white-100">
          {getTimeStamp(createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="font-medium text-[16px] text-black">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={ROUTES.PROFILE(author?._id)}>
            <p className="font-medium text-[16px] text-black line-clamp-1">
              {author?.name}
            </p>
          </Link>
          <Link href={``}>
            <h3 className="font-semibold text-[26px] text-black line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>
        <Link href={ROUTES.PROFILE(author?._id)}>
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all">
          {description}
        </p>

        <Image src={imageUrl} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <p className="font-medium text-[16px] text-black">{category}</p>

        <Button
          className="rounded-full bg-black-200 font-medium text-[16px] text-white px-5 py-3"
          asChild
        >
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
