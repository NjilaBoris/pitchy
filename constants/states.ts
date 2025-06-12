import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
  title: "No Data Found",
  message:
    "Looks like the database is taking a nap. Wake it up with some new entries.",
  button: {
    text: "Add Data",
    href: ROUTES.HOME,
  },
};

export const DEFAULT_ERROR = {
  title: "Something Went Wrong",
  message: "Even our code can have a bad day. Give it another shot.",
  button: {
    text: "Retry Request",
    href: ROUTES.HOME,
  },
};

export const EMPTY_QUESTION = {
  title: "Ahh, No Startup Yet!",
  message:
    "The startup board is empty. Maybe it’s waiting for your brilliant startups to get things rolling",
  button: {
    text: "Create a Pitch",
    href: ROUTES.CREATE_PITCH,
  },
};
