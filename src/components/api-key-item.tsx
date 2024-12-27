"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Copy, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
}

export interface ApiKeyItemProps {
  apiKey: ApiKey;
  onDelete: () => void;
}

export function ApiKeyItem({ apiKey, onDelete }: ApiKeyItemProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const toggleReveal = () => setIsRevealed(!isRevealed);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey.key);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
      <div className="flex-grow">
        <h3 className="font-semibold">{apiKey.name}</h3>
        <p className="text-muted-foreground text-sm font-mono">
          {isRevealed ? apiKey.key : "••••••••••••••••"}
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Created on {new Date(apiKey.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleReveal}
          className="hover:bg-accent"
        >
          {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="hover:bg-accent"
        >
          <Copy size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDeleteDialogOpen(true)}
          className="hover:bg-accent"
        >
          <Trash2 size={16} />
        </Button>
      </div>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this API key?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the API
              key.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
