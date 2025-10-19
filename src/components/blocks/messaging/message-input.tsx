"use client";

import { Image as ImageIcon, Paperclip, Send, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

function EmojiPickerPopover({ onSelect }: { onSelect: (emoji: any) => void }) {
  const [mod, setMod] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    import("frimousse").then((m) => {
      if (mounted) setMod(m);
    });
    return () => {
      mounted = false;
    };
  }, []);
  if (!mod)
    return (
      <div className="p-4">
        <Spinner />
      </div>
    );
  const EmojiPicker = mod.EmojiPicker;
  return (
    <div className="w-80 max-w-[95vw] rounded-ele border bg-background p-3 shadow-lg">
      <EmojiPicker.Root onEmojiSelect={onSelect}>
        <EmojiPicker.Search className="mb-2 w-full rounded-ele border bg-accent px-2 py-1 text-sm" />
        <EmojiPicker.Viewport className="h-64 w-full overflow-y-auto rounded-md border bg-card">
          <EmojiPicker.Loading>
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
              <Spinner />
            </div>
          </EmojiPicker.Loading>
          <EmojiPicker.Empty>
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
              No emoji found.
            </div>
          </EmojiPicker.Empty>
          <EmojiPicker.List
            className="select-none pb-1.5"
            components={{
              CategoryHeader: ({ category, ...props }: any) => (
                <div
                  className="sticky top-0 z-10 bg-background px-3 pt-3 pb-1.5 font-medium text-muted-foreground text-xs"
                  {...props}
                >
                  {category.label}
                </div>
              ),
              Row: ({ children, ...props }: any) => (
                <div className="flex scroll-my-1.5 gap-1 px-1.5" {...props}>
                  {children}
                </div>
              ),
              Emoji: ({ emoji, ...props }: any) => (
                <button
                  className="flex size-8 items-center justify-center rounded-md text-lg transition-colors hover:bg-accent focus:bg-accent"
                  {...props}
                >
                  {emoji.emoji}
                </button>
              ),
            }}
          />
        </EmojiPicker.Viewport>
      </EmojiPicker.Root>
    </div>
  );
}

function GifPickerPopover({ onSelect }: { onSelect: (url: string) => void }) {
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

  useEffect(() => {
    if (!API_KEY) return; // Guard: require key
    setLoading(true);
    const endpoint = search
      ? `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(search)}&limit=16&rating=pg`
      : `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=16&rating=pg`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setGifs(data.data || []))
      .finally(() => setLoading(false));
  }, [search, API_KEY]);

  return (
    <div className="w-72 max-w-[95vw] p-2">
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search GIFs..."
        type="text"
        value={search}
      />
      <div className="grid grid-cols-4 gap-2 pt-2">
        {API_KEY ? (
          loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton className="h-20 w-full" key={i} />
            ))
          ) : gifs.length === 0 ? (
            <div className="col-span-4 text-center text-muted-foreground text-sm">
              No GIFs found.
            </div>
          ) : (
            gifs.map((gif) => (
              <button
                className="overflow-hidden rounded-ele focus:outline-none focus:ring-2 focus:ring-primary"
                key={gif.id}
                onClick={() => onSelect(gif.images.fixed_height.url)}
                type="button"
              >
                <img
                  alt={gif.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={gif.images.fixed_height_small.url}
                />
              </button>
            ))
          )
        ) : (
          <div className="col-span-4 text-center text-muted-foreground text-sm">
            Configure NEXT_PUBLIC_GIPHY_API_KEY to enable GIFs.
          </div>
        )}
      </div>
    </div>
  );
}

export default function MessageInput({ className }: { className?: string }) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + (emoji.emoji || ""));
    textareaRef.current?.focus();
  };

  const handleFileUpload = (files: FileList | null) => {
    setShowFile(false);
    if (!files) return;
    const imageUrls = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => URL.createObjectURL(f));
    setSelectedImages((prev) => [...prev, ...imageUrls]);
  };

  const handleRemoveImage = (url: string) => {
    setSelectedImages((prev) => prev.filter((img) => img !== url));
  };

  const handleGifSelect = (url: string) => {
    setSelectedGif(url);
    setShowGif(false);
    textareaRef.current?.focus();
  };

  const handleSend = () => {
    if (!(message.trim() || selectedGif) && selectedImages.length === 0) return;
    setMessage("");
    setSelectedGif(null);
    setSelectedImages([]);
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col items-center gap-2 sm:px-0",
        className
      )}
    >
      <Card className="w-full bg-background p-0 shadow-none">
        <CardContent className="p-2 sm:p-3">
          {(selectedGif || selectedImages.length > 0) && (
            <div aria-live="polite" className="mb-2 w-full max-w-full">
              <ScrollArea className="w-full max-w-full whitespace-nowrap">
                <div className="flex min-h-[40px] items-center gap-2 px-1 py-1">
                  {selectedImages.map((img) => (
                    <div className="relative inline-block" key={img}>
                      <div className="max-h-32 overflow-hidden rounded-card border bg-muted">
                        <Skeleton className="absolute inset-0 h-full w-full" />
                        <img
                          alt="Selected"
                          className="relative z-10 max-h-32"
                          src={img}
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                      <Button
                        aria-label="Remove image"
                        className="absolute top-1 right-1 z-20"
                        onClick={() => handleRemoveImage(img)}
                        size="icon-sm"
                        type="button"
                        variant={"outline"}
                      >
                        <X
                          aria-hidden="true"
                          className="size-4"
                          focusable="false"
                        />
                      </Button>
                    </div>
                  ))}
                  {selectedGif && (
                    <div className="relative inline-block">
                      <div className="max-h-32 overflow-hidden rounded-ele border bg-muted">
                        <Skeleton className="absolute inset-0 h-full w-full" />
                        <img
                          alt="Selected GIF"
                          className="relative z-10 max-h-32"
                          src={selectedGif}
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                      <Button
                        aria-label="Remove GIF"
                        className="absolute top-1 right-1 z-20"
                        onClick={() => setSelectedGif(null)}
                        size="icon-sm"
                        type="button"
                        variant={"outline"}
                      >
                        <X
                          aria-hidden="true"
                          className="size-4"
                          focusable="false"
                        />
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}
          <form
            className="flex w-full flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <Textarea
              aria-label="Message"
              className="min-h-[37px] w-full resize-none border-none px-2 text-base shadow-none outline-none ring-0 hover:border-none hover:shadow-none hover:outline-none hover:ring-0 focus:border-none focus:shadow-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-sm"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                // Enter inserts newline; Cmd/Ctrl+Enter submits
                const isMac = navigator.platform.toUpperCase().includes("MAC");
                const submitCombo = isMac ? e.metaKey : e.ctrlKey;
                if (e.key === "Enter" && submitCombo) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              ref={textareaRef}
              rows={1}
              value={message}
            />
            <div className="flex flex-row items-center justify-between gap-2 sm:justify-end">
              <div className="flex items-center gap-1">
                <DropdownMenu onOpenChange={setShowEmoji} open={showEmoji}>
                  <DropdownMenuTrigger asChild>
                    <Toggle
                      aria-label="Add emoji"
                      size="sm"
                      type="button"
                      variant="default"
                    >
                      <Smile
                        aria-hidden="true"
                        className="size-4"
                        focusable="false"
                      />
                    </Toggle>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit min-w-[180px] max-w-[95vw] rounded-card p-0">
                    <EmojiPickerPopover onSelect={handleEmojiSelect} />
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu onOpenChange={setShowFile} open={showFile}>
                  <DropdownMenuTrigger asChild>
                    <Toggle
                      aria-label="Attach file"
                      size="sm"
                      type="button"
                      variant="default"
                    >
                      <Paperclip
                        aria-hidden="true"
                        className="size-4"
                        focusable="false"
                      />
                    </Toggle>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60 p-2 sm:w-72">
                    <Input
                      accept="image/*,application/pdf,video/*,audio/*,text/*,application/zip"
                      aria-label="Upload files"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      type="file"
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu onOpenChange={setShowGif} open={showGif}>
                  <DropdownMenuTrigger asChild>
                    <Toggle
                      aria-label="Attach GIF"
                      size="sm"
                      type="button"
                      variant="default"
                    >
                      <ImageIcon
                        aria-hidden="true"
                        className="size-4"
                        focusable="false"
                      />
                    </Toggle>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit min-w-[180px] max-w-[95vw] rounded-card p-0">
                    <GifPickerPopover onSelect={handleGifSelect} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button
                aria-label="Send message"
                className="shrink-0"
                disabled={
                  !(message.trim() || selectedGif) &&
                  selectedImages.length === 0
                }
                onClick={handleSend}
                size="icon"
                type="submit"
              >
                <Send aria-hidden="true" className="size-4" focusable="false" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
