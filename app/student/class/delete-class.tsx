"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteClass } from "@/app/actions/class-action";

interface Props {
  Id: number;
  onDelete?: () => void;
}

export default function Deleteclass({ Id, onDelete }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const conf = confirm("Are you sure to delete!");
      if (!conf) return;

      try {
        await deleteClass(Id);
        if (onDelete) onDelete(); 
      } catch (error: any) {
        alert(error.message || "Failed to delete class");
      }
    });
  };

  return (
    <Button
      className="ml-2 mb-1 px-5 "
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : " 🗑 Delete"}
    </Button>
  );
}