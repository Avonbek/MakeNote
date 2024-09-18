import { motion } from "framer-motion";
import { Note } from "../types";
import NoteCard from "./NoteCard";
import EmptyState from "./EmptyState";

interface NotesListProps {
  documents: Note[];
  selectedDocuments: string[];
  handleCheckboxChange: (docId: string) => void;
  handleAddToTopic: () => void;
  handleDeleteSelected: () => void;
  isMobile: boolean;
  handleTouchStart: (e: React.TouchEvent<HTMLElement>) => void;
  handleTouchEnd: () => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleNewDocument: () => void;
}

export default function NotesList({
  documents,
  selectedDocuments,
  handleCheckboxChange,
  handleAddToTopic,
  handleDeleteSelected,
  isMobile,
  handleTouchStart,
  handleTouchEnd,
  handleTouchMove,
  handleNewDocument,
}: NotesListProps) {
  if (documents.length === 0) {
    return <EmptyState onNewDocument={handleNewDocument} />;
  }

  return (
    <>
      {documents.map((doc) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <NoteCard
            doc={doc}
            isSelected={selectedDocuments.includes(doc.id)}
            onCheckboxChange={handleCheckboxChange}
            onAddToTopic={handleAddToTopic}
            onDelete={handleDeleteSelected}
            isMobile={isMobile}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          />
        </motion.div>
      ))}
    </>
  );
}
