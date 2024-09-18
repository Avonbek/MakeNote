import React, { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface NewDocumentFormProps {
  onSave: (title: string, content: string) => Promise<void>;
}

const NewDocumentForm: React.FC<NewDocumentFormProps> = ({ onSave }) => {
  const [content, setContent] = useState("");

  const handleSave = () => {
    onSave("Untitled Document", content);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col h-full"
    >
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note here..."
        className="flex-grow resize-none"
      />
      <Button onClick={handleSave} className="mt-4">
        Save
      </Button>
    </motion.div>
  );
};

export default NewDocumentForm;
