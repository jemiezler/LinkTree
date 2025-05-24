"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  ListboxSection,
  ListboxItem,
  Listbox,
} from "@heroui/react";
import React from "react";

export default function Deletelink() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
  const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", "), [selectedKeys]);

  return (
    <>
      <Button onPress={onOpen} color="danger">Delete</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Listbox
                    aria-label="Multiple selection example"
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    variant="flat"
                    onSelectionChange={(keys) => {
                      if (keys instanceof Set) {
                        setSelectedKeys(keys as Set<string>);
                      } else {
                        setSelectedKeys(new Set([keys as string]));
                      }
                    }}
                  >
                    <ListboxItem key="item1">Item1</ListboxItem>
                    <ListboxItem key="item2">Item2</ListboxItem>
                    <ListboxItem key="item3">Item3</ListboxItem>
                    <ListboxItem key="item4">Item4</ListboxItem>
                  </Listbox>

                  <p className="text-small text-default-500">Selected value: {selectedValue}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
