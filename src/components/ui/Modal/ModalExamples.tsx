"use client";

import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from "../modal";
import { Label } from "../label";
import { Input } from "../input";

export function ModalExamples() {
  return (
    <div className="space-y-6 flex items-center justify-center flex-col">
      {/* Basic Modal */}
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold mb-3">Basic Modal</h3>
        <Modal>
          <ModalTrigger asChild>
            <Button>Open Modal</Button>
          </ModalTrigger>{" "}
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit Profile</ModalTitle>
              <ModalDescription>
                Make changes to your profile here. Click save when you're done.
              </ModalDescription>
            </ModalHeader>
            <div className="mt-6 mb-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <Input className="w-full mt-1 px-3 py-2 " />
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <Input className="w-full mt-1 px-3 py-2" />
                </div>
              </div>
            </div>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button>Save changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      {/* Confirmation Modal */}
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold mb-3">Confirmation Modal</h3>
        <Modal>
          <ModalTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </ModalTrigger>
          <ModalContent>
            {" "}
            <ModalHeader>
              <ModalTitle>Are you absolutely sure?</ModalTitle>
              <ModalDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter className="mt-6">
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button variant="destructive">Delete Account</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
