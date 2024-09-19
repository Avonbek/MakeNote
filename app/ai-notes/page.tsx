"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/ai-notes/Header";
import NotesList from "@/components/ai-notes/NotesList";
import NewDocumentForm from "@/components/ai-notes/NewDocumentForm";
import Footer from "@/components/ai-notes/Footer";
import { useNotes } from "@/hooks/useNotes";
import { useMobileDetection } from "@/hooks/useMobileDetection";

export default function AINotesPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { notes, loading, error, fetchNotes, createNote, deleteNote } =
    useNotes();
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isNewDocument, setIsNewDocument] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMobile = useMobileDetection();
  const refreshStartY = useRef(0);
  const mainRef = useRef<HTMLElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // callbacks

  const handleCheckboxChange = useCallback((docId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  }, []);

  const handleAddToTopic = useCallback(() => {
    console.log("Add to topic:", selectedDocuments);
  }, [selectedDocuments]);

  const handleStartChat = useCallback(() => {
    console.log("Start chat with:", selectedDocuments);
  }, [selectedDocuments]);

  const clearSelection = useCallback(() => {
    setSelectedDocuments([]);
  }, []);

  const handleNewDocument = useCallback(() => {
    setIsNewDocument(true);
  }, []);

  const handleSaveDocument = useCallback(
    async (title: string, content: string) => {
      await createNote({ title, content, topic: "General" });
      setIsNewDocument(false);
    },
    [createNote]
  );

  const deleteNotes = useCallback(
    async (ids: string[]) => {
      for (const id of ids) {
        await deleteNote(id);
      }
      setSelectedDocuments([]);
    },
    [deleteNote]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (isMobile) {
        longPressTimer.current = setTimeout(() => {
          const docId = e.currentTarget.dataset.docId;
          if (docId) handleCheckboxChange(docId);
        }, 500);
      }
      refreshStartY.current = e.touches[0].clientY;
    },
    [isMobile, handleCheckboxChange]
  );

  const handleScroll = useCallback(() => {
    if (mainRef.current) {
      const { scrollTop } = mainRef.current;
      if (scrollTop === 0) {
        mainRef.current.style.overflowY = "hidden";
      } else {
        mainRef.current.style.overflowY = "auto";
      }
    }
  }, []);

  // effects

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  // handlers

  const handleTouchMove = (e: React.TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    const touchY = e.touches[0].clientY;
    const diff = touchY - refreshStartY.current;
    if (diff > 50 && mainRef.current && mainRef.current.scrollTop === 0) {
      setIsRefreshing(true);
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    if (isRefreshing) {
      setTimeout(() => {
        setIsRefreshing(false);
        fetchNotes();
      }, 1000);
    }
  };

  // render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isNewDocument={isNewDocument}
        setIsNewDocument={setIsNewDocument}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedDocuments={selectedDocuments}
        handleStartChat={handleStartChat}
        handleAddToTopic={handleAddToTopic}
        handleDeleteSelected={() => deleteNotes(selectedDocuments)}
        clearSelection={clearSelection}
      />

      <main
        ref={mainRef}
        className="p-4 space-y-3 overflow-y-auto"
        style={{ height: "calc(100vh - 120px)" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isRefreshing && (
          <div className="flex justify-center items-center h-12 text-muted-foreground">
            Refreshing...
          </div>
        )}
        <AnimatePresence>
          {isNewDocument ? (
            <NewDocumentForm onSave={handleSaveDocument} />
          ) : (
            <NotesList
              documents={notes}
              selectedDocuments={selectedDocuments}
              handleCheckboxChange={handleCheckboxChange}
              handleAddToTopic={handleAddToTopic}
              handleDeleteSelected={() => deleteNotes(selectedDocuments)}
              isMobile={isMobile}
              handleTouchStart={handleTouchStart}
              handleTouchEnd={handleTouchEnd}
              handleTouchMove={handleTouchMove}
              handleNewDocument={handleNewDocument}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer
        isNewDocument={isNewDocument}
        handleNewDocument={handleNewDocument}
        handleSaveDocument={handleSaveDocument}
      />
    </div>
  );
}
