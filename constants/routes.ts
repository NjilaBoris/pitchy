const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  CREATE_PITCH: "/create-pitch",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/pitchs/${id}`,
  SIGN_IN_WITH_OAUTH: `signin-with-oauth`,
};

export default ROUTES;
