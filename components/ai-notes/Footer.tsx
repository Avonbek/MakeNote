import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { List, Calendar, Plus, Share2, Mic } from "lucide-react";

interface FooterProps {
  isNewDocument: boolean;
  handleNewDocument: () => void;
  handleSaveDocument: (title: string, content: string) => Promise<void>;
}

const Footer: React.FC<FooterProps> = ({
  isNewDocument,
  handleNewDocument,
  handleSaveDocument,
}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t p-2">
      {isNewDocument ? (
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <Input
            type="text"
            placeholder="Type your message..."
            className="flex-grow mx-2"
          />
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            variant="default"
            onClick={() => handleSaveDocument("Untitled", "")}
          >
            Save
          </Button>
        </div>
      ) : (
        <div className="flex justify-around">
          <Button variant="ghost" size="icon">
            <List className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="rounded-full"
            onClick={handleNewDocument}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
