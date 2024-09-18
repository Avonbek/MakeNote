import { useState, useEffect } from "react";
import axios from "axios";
import { Note } from "../types";

export function useNotes(user: any) {
  const [documents, setDocuments] = useState<Note[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/ai-notes");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (title: string, content: string, topic: string) => {
    try {
      const response = await axios.post("/api/ai-notes", {
        title,
        content,
        topic,
      });
      setDocuments((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const deleteNotes = async (ids: string[]) => {
    try {
      await Promise.all(
        ids.map((id) => axios.delete("/api/ai-notes", { data: { id } }))
      );
      setDocuments((prev) => prev.filter((doc) => !ids.includes(doc.id)));
    } catch (error) {
      console.error("Error deleting notes:", error);
    }
  };

  return { documents, fetchNotes, addNote, deleteNotes };
}
