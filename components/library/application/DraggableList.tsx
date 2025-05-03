"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const cn = (...args: any[]) => twMerge(clsx(args));

export interface DraggableItemProps {
  id: string;
  content: React.JSX.Element;
}

export interface DraggableListProps {
  items: DraggableItemProps[];
  onChange?: (items: DraggableItemProps[]) => void;
  className?: string;
}

export const DraggableList: React.FC<DraggableListProps> = ({
  items: initialItems,
  onChange,
  className,
}) => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState<DraggableItemProps | null>(
    null
  );
  const [dragOverItemId, setDragOverItemId] = useState<string | number | null>(
    null
  );

  const handleDragStart = (item: DraggableItemProps) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent, itemId: string | number) => {
    e.preventDefault();
    setDragOverItemId(itemId);
  };

  const handleDragEnd = () => {
    if (!draggedItem || dragOverItemId == null) {
      setDraggedItem(null);
      setDragOverItemId(null);
      return;
    }

    const newItems = [...items];
    const fromIndex = items.findIndex((i) => i.id === draggedItem.id);
    const toIndex = items.findIndex((i) => i.id === dragOverItemId);

    newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, draggedItem);

    setItems(newItems);
    onChange?.(newItems);
    setDraggedItem(null);
    setDragOverItemId(null);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            draggable
            onDragStart={() => handleDragStart(item)}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDragEnd={handleDragEnd}
            className={cn(
              "cursor-grab rounded-lg border bg-secondary/50 border-primary/10 p-4 shadow-xs transition-colors",
              dragOverItemId === item.id &&
                "border-2 border-orange bg-secondary/40",
              draggedItem?.id === item.id &&
                "border-2 border-gray-400 opacity-50"
            )}
          >
            {item.content}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const DraggableItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <div className="text-gray-400">≡</div>
    {children}
  </div>
);

export const DraggableListExample: React.FC = () => {
  const [items, setItems] = useState<DraggableItemProps[]>([
    { id: "1", content: <DraggableItem>First Item</DraggableItem> },
    { id: "2", content: <DraggableItem>Second Item</DraggableItem> },
    { id: "3", content: <DraggableItem>Third Item</DraggableItem> },
  ]);

  const handleReorder = (newItems: DraggableItemProps[]) => {
    setItems(newItems);
    // handle updated order...
  };

  return (
    <div className="flex flex-col gap-2">
      <DraggableList
        items={items}
        onChange={handleReorder}
        className="max-w-md flex"
      />
    </div>
  );
};
