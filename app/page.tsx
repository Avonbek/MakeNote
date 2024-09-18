import { useAuth } from "@clerk/nextjs";
import AINotesPage from "./ai-notes/page";

export default function Home() {
  // const { userId } = useAuth();

  // if (!userId) {
  //   return <div>Please sign in to access your notes.</div>;
  // }

  return <AINotesPage />;
}
