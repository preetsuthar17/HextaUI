import * as React from "react";

import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Separator } from "@/registry/new-york/ui/separator";

const users = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Williams",
  "Dana Lee",
  "Eddie Chen",
  "Fatima Patel",
  "Grace Kim",
  "Henry Li",
  "Ivy Nguyen",
  "Jack Brown",
  "Karen Davis",
  "Leo Taylor",
  "Mia Wilson",
  "Noah Martinez",
  "Olivia Clark",
  "Paul Walker",
];

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-64 rounded-md border bg-background">
      <div className="p-4">
        <h4 className="mb-4 font-medium text-sm leading-none">Active Users</h4>
        <ul>
          {users.map((user, i) => (
            <React.Fragment key={user}>
              <li className="text-sm">{user}</li>
              {i !== users.length - 1 && <Separator className="my-1.5" />}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
}
