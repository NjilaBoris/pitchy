import StartupCard from "@/components/cards/StartupCard";
import DataRenderer from "@/components/DataRender";
import SearchForm from "@/components/search/SearchForm";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getPitchs } from "@/lib/actions/pitch.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YC Directory | Home",
  description: "Pitch, Vote and Grow",
};
export default async function Home({ searchParams }: RouteParams) {
  const { query, page, pageSize, filter } = await searchParams;
  const { success, error, data } = await getPitchs({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });
  const { pitch, isNext } = data || {};

  return (
    <>
      <section className="w-full pattern bg-primary min-h-[530px]  flex justify-center items-center flex-col py-10 px-6">
        <h1
          className="mt-15 uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white 
        sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5"
        >
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="font-medium text-[20px] text-white  text-center break-words !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in virtual
          Compentitions
        </p>
        <div className="mt-10 w-[80%] sm:w-[50%]">
          <SearchForm
            route={ROUTES.HOME}
            imgSrc="/icons/search.svg"
            placeholder="Search questions..."
            iconPosition="left"
            otherClasses="flex-1"
          />
        </div>
      </section>
      <section className=" px-6 py-10 max-w-7xl mx-auto">
        <p className="font-semibold text-[30px] text-black">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
      </section>
      <DataRenderer
        success={success}
        error={error}
        data={pitch}
        empty={EMPTY_QUESTION}
        render={(pitchs) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {pitch.map((pitch) => (
              <StartupCard key={pitch._id} pitch={pitch} />
            ))}
          </div>
        )}
      />
    </>
  );
}
