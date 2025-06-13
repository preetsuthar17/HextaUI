"use client";

import * as React from "react";
import {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarSub,
  MenuBarSubTrigger,
  MenuBarSubContent,
} from "../menubar";
import {
  File,
  Edit,
  Settings,
  Plus,
  Folder,
  Save,
  Download,
  Upload,
  Copy,
  Scissors,
  ClipboardPaste,
  Undo,
  Redo,
  Search,
  User,
  Bell,
} from "lucide-react";

export function BasicMenuBarExample() {
  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger icon={File}>File</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem icon={Plus} shortcut="⌘N">
            New File
          </MenuBarItem>
          <MenuBarItem icon={Folder} shortcut="⌘⇧N">
            New Folder
          </MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem icon={Upload}>Open File</MenuBarItem>
          <MenuBarItem icon={Save} shortcut="⌘S">
            Save
          </MenuBarItem>
          <MenuBarItem icon={Download} shortcut="⌘⇧S">
            Save As...
          </MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>

      <MenuBarMenu>
        <MenuBarTrigger icon={Edit}>Edit</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem icon={Undo} shortcut="⌘Z">
            Undo
          </MenuBarItem>
          <MenuBarItem icon={Redo} shortcut="⌘⇧Z">
            Redo
          </MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem icon={Scissors} shortcut="⌘X">
            Cut
          </MenuBarItem>
          <MenuBarItem icon={Copy} shortcut="⌘C">
            Copy
          </MenuBarItem>
          <MenuBarItem icon={ClipboardPaste} shortcut="⌘V">
            Paste
          </MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem icon={Search} shortcut="⌘F">
            Find
          </MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>

      <MenuBarMenu>
        <MenuBarTrigger icon={Settings}>Settings</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem icon={User}>Profile</MenuBarItem>
          <MenuBarItem icon={Bell}>Notifications</MenuBarItem>
          <MenuBarSeparator />
          <MenuBarSub>
            <MenuBarSubTrigger>Preferences</MenuBarSubTrigger>
            <MenuBarSubContent>
              <MenuBarItem>Theme</MenuBarItem>
              <MenuBarItem>Language</MenuBarItem>
              <MenuBarItem>Privacy</MenuBarItem>
            </MenuBarSubContent>
          </MenuBarSub>
        </MenuBarContent>
      </MenuBarMenu>
    </MenuBar>
  );
}

export function SimpleMenuBarExample() {
  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>File</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>New</MenuBarItem>
          <MenuBarItem>Open</MenuBarItem>
          <MenuBarItem>Save</MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem>Exit</MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>

      <MenuBarMenu>
        <MenuBarTrigger>Edit</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>Undo</MenuBarItem>
          <MenuBarItem>Redo</MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem>Cut</MenuBarItem>
          <MenuBarItem>Copy</MenuBarItem>
          <MenuBarItem>Paste</MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>

      <MenuBarMenu>
        <MenuBarTrigger>Help</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>Documentation</MenuBarItem>
          <MenuBarItem>Support</MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem>About</MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>
    </MenuBar>
  );
}
