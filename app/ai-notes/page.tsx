"use client";

import { useState, useCallback, useRef, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
import { useMockUser } from "@/hooks/useMockUser"; // Add this import
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/app/ai-notes/components/Header";
import NotesList from "@/app/ai-notes/components/NotesList";
import NewDocumentForm from "@/app/ai-notes/components/NewDocumentForm";
import Footer from "@/app/ai-notes/components/Footer";
import { useNotes } from "@/hooks/useNotes";
import { useMobileDetection } from "@/app/ai-notes/hooks/useMobileDetection";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AINotesPage() {
  // const { user } = useUser();
  const { user, isLoaded, isSignedIn } = useMockUser(); // Use the mock hook
  const { documents, fetchNotes, addNote, deleteNotes } = useNotes(user);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isNewDocument, setIsNewDocument] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMobile = useMobileDetection();
  const refreshStartY = useRef(0);
  const mainRef = useRef<HTMLElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user, fetchNotes]);

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
    [isMobile]
  );

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

  const handleCheckboxChange = (docId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  const handleAddToTopic = () => {
    console.log("Add to topic:", selectedDocuments);
  };

  const handleStartChat = () => {
    console.log("Start chat with:", selectedDocuments);
  };

  const clearSelection = () => {
    setSelectedDocuments([]);
  };

  const handleNewDocument = () => {
    setIsNewDocument(true);
  };

  const handleSaveDocument = async (title: string, content: string) => {
    await addNote(title, content, "General");
    setIsNewDocument(false);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to access your notes.</div>;
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
              documents={documents}
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
