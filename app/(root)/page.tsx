import SearchForm from "@/components/search/SearchForm";
import ROUTES from "@/constants/routes";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
export default async function Home({ searchParams }: SearchParams) {
  const { query } = searchParams;

  return (
    <>
      <section className="w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
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
    </>
  );
}
