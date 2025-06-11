interface SignInWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    name: string;
    username: string;
    email: string;
    image: string;
  };
}
interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}
interface CreatePitchParams {
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  pitchDetails: string;
}
