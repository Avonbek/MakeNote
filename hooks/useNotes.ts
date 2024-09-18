import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase-client";
import { Note } from "@/app/ai-notes/types";

export function useNotes(user: any) {
  const [documents, setDocuments] = useState<Note[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notes:", error);
    } else {
      setDocuments(data || []);
    }
  };

  const addNote = async (title: string, content: string, topic: string) => {
    if (!user) return;
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      topic,
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("notes")
      .insert([newNote])
      .select();

    if (error) {
      console.error("Error adding note:", error);
    } else if (data) {
      setDocuments((prev) => [data[0], ...prev]);
    }
  };

  const deleteNotes = async (ids: string[]) => {
    if (!user) return;
    const { error } = await supabase
      .from("notes")
      .delete()
      .in("id", ids)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting notes:", error);
    } else {
      setDocuments((prev) => prev.filter((doc) => !ids.includes(doc.id)));
    }
  };

  return { documents, fetchNotes, addNote, deleteNotes };
}
