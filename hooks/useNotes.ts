import { useState, useEffect } from "react";
import { Note } from "@/lib/utils";

export function useNotes(user: any) {
  const [documents, setDocuments] = useState<Note[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = () => {
    if (!user) return;
    const storedNotes = localStorage.getItem(`notes_${user.id}`);
    if (storedNotes) {
      setDocuments(JSON.parse(storedNotes));
    }
  };

  const addNote = async (title: string, content: string, topic: string) => {
    if (!user) return;
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      topic,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedNotes = [newNote, ...documents];
    setDocuments(updatedNotes);
    localStorage.setItem(`notes_${user.id}`, JSON.stringify(updatedNotes));

    // Commented code for future database integration
    // try {
    //   const response = await axios.post("/api/ai-notes", {
    //     title,
    //     content,
    //     topic,
    //   });
    //   setDocuments((prev) => [response.data, ...prev]);
    // } catch (error) {
    //   console.error("Error saving note:", error);
    // }
  };

  const deleteNotes = async (ids: string[]) => {
    if (!user) return;
    const updatedNotes = documents.filter((doc) => !ids.includes(doc.id));
    setDocuments(updatedNotes);
    localStorage.setItem(`notes_${user.id}`, JSON.stringify(updatedNotes));

    // Commented code for future database integration
    // try {
    //   await Promise.all(
    //     ids.map((id) => axios.delete("/api/ai-notes", { data: { id } }))
    //   );
    //   setDocuments((prev) => prev.filter((doc) => !ids.includes(doc.id)));
    // } catch (error) {
    //   console.error("Error deleting notes:", error);
    // }
  };

  return { documents, fetchNotes, addNote, deleteNotes };
}
