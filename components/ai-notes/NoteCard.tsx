import React from "react";
import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { Note } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NoteCardProps {
  doc: Note;
  isSelected: boolean;
  onCheckboxChange: (docId: string) => void;
  onAddToTopic: () => void;
  onDelete: () => void;
  isMobile: boolean;
  onTouchStart: (e: React.TouchEvent<HTMLElement>) => void;
  onTouchEnd: () => void;
  onTouchMove: (e: React.TouchEvent) => void;
}

export default function NoteCard({
  doc,
  isSelected,
  onCheckboxChange,
  onAddToTopic,
  onDelete,
  isMobile,
  onTouchStart,
  onTouchEnd,
  onTouchMove,
}: NoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2"
    >
      {!isMobile && (
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onCheckboxChange(doc.id)}
          className="shrink-0"
        />
      )}
      <Card
        className={`flex-grow ${isSelected ? "border-primary" : ""}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-1">
          <CardTitle className="text-lg">{doc.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={onAddToTopic}>
                Add to Topic
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={onDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-sm text-muted-foreground">{doc.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-1">
          <Badge variant="secondary" className="bg-secondary/80">
            {doc.topic}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Last edited: {new Date(doc.updated_at).toLocaleString()}
          </span>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
