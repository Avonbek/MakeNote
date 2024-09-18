import { useState } from "react";
import { supabase } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  topic: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("Note")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (err) {
      setError("Failed to fetch notes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (
    note: Omit<Note, "id" | "created_at" | "updated_at" | "user_id">
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("Note")
        .insert([note])
        .select();

      if (error) throw error;
      setNotes((prevNotes) => [...(data || []), ...prevNotes]);
    } catch (err) {
      setError("Failed to create note");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (
    id: string,
    updates: Partial<Omit<Note, "id" | "created_at" | "updated_at" | "user_id">>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("Note")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, ...data?.[0] } : note
        )
      );
    } catch (err) {
      setError("Failed to update note");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from("Note").delete().eq("id", id);

      if (error) throw error;
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      setError("Failed to delete note");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  };
}
