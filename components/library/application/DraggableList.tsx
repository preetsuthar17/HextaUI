"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};

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
    null,
  );
  const [dragOverItemId, setDragOverItemId] = useState<string | number | null>(
    null,
  );

  const handleDragStart = (item: DraggableItemProps) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent, itemId: string | number) => {
    e.preventDefault();
    setDragOverItemId(itemId);
  };

  const handleDragEnd = () => {
    if (!draggedItem || !dragOverItemId) {
      setDraggedItem(null);
      setDragOverItemId(null);
      return;
    }

    const newItems = [...items];
    const draggedIndex = items.findIndex((item) => item.id === draggedItem.id);
    const dropIndex = items.findIndex((item) => item.id === dragOverItemId);

    newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    setItems(newItems);
    onChange?.(newItems);
    setDraggedItem(null);
    setDragOverItemId(null);
  };

  return (
    <div className={cn("space-y-2", className)}>
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
              "cursor-grab rounded-lg border bg-secondary/50 border-primary/10 p-4 shadow-sm transition-colors",
              dragOverItemId === item.id &&
                "border-2 border-orange bg-secondary/40",
              draggedItem?.id === item.id &&
                "border-2 border-gray-400 opacity-50",
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
}> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="text-gray-400">≡</div>
      {children}
    </div>
  );
};

/**COMPONENT USAGE EXAMPLE */

export const DraggableListExample = () => {
  const [items, setItems] = useState([
    { id: "1", content: <DraggableItem>First Item</DraggableItem> },
    { id: "2", content: <DraggableItem>Second Item</DraggableItem> },
    { id: "3", content: <DraggableItem>Third Item</DraggableItem> },
  ]);

  const handleReorder = (newItems: DraggableItemProps[]) => {
    setItems(newItems);
    // Do something with the new order
  };

  return (
    <DraggableList
      items={items}
      onChange={handleReorder}
      className="max-w-md"
    />
  );
};
