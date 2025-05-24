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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Deletelink() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());
  const [user, setUser] = useState<User>({
    name: "",
    role: "",
    image: "",
    link: [],
  });

  const selectedValue = React.useMemo(() => {
    return user.link
      .filter((link) => selectedKeys.has(link._id))
      .map((link) => link.name)
      .join(", ");
  }, [selectedKeys, user.link]);

  useEffect(() => {
    fetch("http://localhost:3001/user/68302720fb7bed40c0d57cbe/link")
      .then((res) => res.json())
      .then((data) => {setUser(data), console.log(data)})
      .catch((err) => console.error("Error fetching users:", err))
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/link", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          linkIds: Array.from(selectedKeys),
        }),
      });
      if (response.ok) {
        console.log("Links deleted successfully");
      } else {
        const errorText = await response.text();
        console.error("Failed to delete:", errorText);
      }
      router.refresh();
      router.push("/edit");
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Delete
      </Button>
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
                    {user.link.map((link) => (
                      <ListboxItem key={link._id}>{link.name}</ListboxItem>
                    ))}
                  </Listbox>

                  <p className="text-small text-default-500">
                    Selected value: {selectedValue}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                  console.log(Array.from(selectedKeys));
                  handleSubmit();
                  }}
                >
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
