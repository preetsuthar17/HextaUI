"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../resizable";

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50} border="right">
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function ResizableVertical() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={25} border="bottom">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function ResizableWithoutHandle() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={25} border="right">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle={false} />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function ResizableThreePanel() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-lg rounded-lg border"
    >
      <ResizablePanel defaultSize={25} minSize={15} border="right">
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-semibold text-sm">Left</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={30} border="top">
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-semibold text-sm">Center</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-semibold text-sm">Right</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function ResizableNested() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[300px] max-w-lg rounded-lg border"
    >
      <ResizablePanel defaultSize={25} minSize={20} border="right">
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-semibold text-sm">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75} border="top">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60} minSize={40} border="bottom">
            <div className="flex h-full items-center justify-center p-4">
              <span className="font-semibold text-sm">Main Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40} minSize={20}>
            <div className="flex h-full items-center justify-center p-4">
              <span className="font-semibold text-sm">Footer</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function ResizableCollapsible() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={30} minSize={0} collapsible border="right">
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-semibold text-sm">Collapsible</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} minSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-semibold text-sm">Main</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
