"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 py-10">
      <div className="flex items-center gap-10">
        {/* Rounded */}
        <div className="flex flex-col items-center gap-1">
          <Avatar>
            <AvatarImage alt="shadcn" src="https://github.com/shadcn.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
        {/* Square */}
        <div className="flex flex-col items-center gap-1">
          <Avatar className="rounded-md">
            <AvatarImage
              alt="User"
              className="rounded-md"
              src="https://github.com/preetsuthar17.png"
            />
            <AvatarFallback className="rounded-md">PS</AvatarFallback>
          </Avatar>
        </div>
        {/* Group */}
        <div className="flex flex-col items-center gap-1">
          <div className="-space-x-3 flex">
            <Avatar className="border-2 border-background">
              <AvatarImage
                alt="Anna"
                src="https://randomuser.me/api/portraits/women/44.jpg"
              />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarImage
                alt="Ben"
                src="https://randomuser.me/api/portraits/men/45.jpg"
              />
              <AvatarFallback>BN</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarImage
                alt="Cara"
                src="https://randomuser.me/api/portraits/women/47.jpg"
              />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
