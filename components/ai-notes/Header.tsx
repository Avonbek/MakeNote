import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  Menu,
  MoreVertical,
  Mic,
  ArrowLeft,
  MessageSquare,
  Tag,
  Trash,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  isNewDocument: boolean;
  setIsNewDocument: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  selectedDocuments: string[];
  handleStartChat: () => void;
  handleAddToTopic: () => void;
  handleDeleteSelected: () => void;
  clearSelection: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isNewDocument,
  setIsNewDocument,
  searchQuery,
  setSearchQuery,
  sidebarOpen,
  setSidebarOpen,
  selectedDocuments,
  handleStartChat,
  handleAddToTopic,
  handleDeleteSelected,
  clearSelection,
}) => {
  return (
    <header className="sticky top-0 bg-background border-b p-2 z-10">
      <div className="flex items-center justify-between gap-2 relative">
        {isNewDocument ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNewDocument(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Input
              value="Untitled Document"
              onChange={() => {}}
              className="flex-grow text-lg font-semibold"
            />
          </>
        ) : (
          <>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <a href="#" className="text-sm">
                    Home
                  </a>
                  <a href="#" className="text-sm">
                    All Documents
                  </a>
                  <a href="#" className="text-sm">
                    Topics
                  </a>
                  <a href="#" className="text-sm">
                    Calendar
                  </a>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex-grow relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-8 h-9 text-sm w-full"
              />
              <Mic className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
            </div>

            <Button variant="ghost" size="icon" className="shrink-0">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">User settings</span>
            </Button>
          </>
        )}

        <AnimatePresence>
          {selectedDocuments.length > 0 && !isNewDocument && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background flex items-center justify-between px-2"
              style={{ zIndex: 20 }}
            >
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handleStartChat}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                <Button size="sm" onClick={handleAddToTopic}>
                  <Tag className="h-4 w-4 mr-2" />
                  Topic
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleDeleteSelected}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
              <Button size="sm" variant="ghost" onClick={clearSelection}>
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
