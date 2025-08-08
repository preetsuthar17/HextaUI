"use client";

import { useState } from "react";
import {
  TeamInvite,
  type TeamMember,
  type PermissionLevel,
} from "./team-invite";

const generateDiceBearAvatar = (seed: string) => {
  return `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(
    seed,
  )}`;
};

const initialMembers: TeamMember[] = [
  {
    id: "1",
    name: "Captain Pancakes",
    email: "syrup.lover@breakfast.club",
    avatar: generateDiceBearAvatar("pancakes"),
    role: "admin",
    isOwner: true,
  },
  {
    id: "2",
    name: "Disco Llama",
    email: "groovy.alpaca@dance.floor",
    avatar: generateDiceBearAvatar("llama"),
    role: "can-edit",
  },
  {
    id: "3",
    name: "Professor Pickles",
    email: "sour.cucumber@university.edu",
    avatar: generateDiceBearAvatar("pickles"),
    role: "can-view",
  },
  {
    id: "4",
    name: "Ninja Noodles",
    email: "stealth.pasta@dojo.com",
    avatar: generateDiceBearAvatar("ninja"),
    role: "can-view",
  },
  {
    id: "5",
    name: "Wizard Waffle",
    email: "magical.breakfast@hogwarts.com",
    avatar: generateDiceBearAvatar("wizard"),
    role: "can-view",
  },
];

export function TeamInviteBlock() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  const handleInvite = async (email: string, permission: PermissionLevel) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: email.split("@")[0],
      email,
      avatar: generateDiceBearAvatar(email),
      role: permission,
    };

    setMembers((prev) => [...prev, newMember]);
  };
  const handleUpdateMemberPermission = (
    memberId: string,
    permission: PermissionLevel,
  ) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, role: permission } : member,
      ),
    );
  };

  const handleCancel = () => {
    console.log("Cancelled team invite");
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-xl w-full">
      <TeamInvite
        teamName="HextaUI"
        teamLogo="https://5xfmztgsig.ufs.sh/f/ZzCwT4wrsqrVtobqq9xNxCS7Zb4WiHRBPtFmL5aoKp6vgMA2"
        totalMembers={members.length}
        members={members}
        onInvite={handleInvite}
        onUpdateMemberPermission={handleUpdateMemberPermission}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default TeamInviteBlock;
