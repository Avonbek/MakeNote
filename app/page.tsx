import { auth } from "@clerk/nextjs/server";
import AINotesPage from "./ai-notes/page";

export default function Home() {
  // const { userId } = auth();

  // if (!userId) {
  //   return <div>Please sign in to access your notes.</div>;
  // }

  return <AINotesPage />;
}
