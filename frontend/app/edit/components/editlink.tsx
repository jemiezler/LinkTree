"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Listbox,
  ListboxItem,
  Input,
  Form,
} from "@heroui/react";
import React, { useEffect, useState } from "react";

export default function Editlink() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);
  const [editName, setEditName] = useState('');
  const [editLink, setEditLink] = useState('');

  const [user, setUser] = useState<User>({
    name: "",
    role: "",
    image: "",
    link: [],
  });

  useEffect(() => {
    fetch("http://localhost:3001/user/6831769f6a564084f3764e5c/link")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const selectedValue = React.useMemo(() => {
    return Array.from(selectedKeys).join(", ");
  }, [selectedKeys]);

  const handleClose = () => {
    setSelectedKeys(new Set());
    onOpenChange();
  };

  const handleEdit = () => {
    if (selectedKeys.size === 0) return;
    setEditModalOpen(true);
  };

  const handleEditModalClose = async () => {

    const data = {
      name: editName,
      link: editLink,
    }

    try {
      const res = await fetch(`http://localhost:3001/link/${selectedValue}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const result = await res.json();
      alert(`Success: ${result.message}`);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }

    setEditModalOpen(false);
    setSelectedKeys(new Set());
    window.location.reload();
  };


  return (
    <>
      <Button onPress={onOpen} color="primary">
        Edit
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="max-w-md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Select to edit</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4 px-4">
                  <Listbox
                    disallowEmptySelection={false}
                    aria-label="Single selection example"
                    selectedKeys={selectedKeys}
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={(keys) =>
                      setSelectedKeys(new Set(Array.from(keys as Set<React.Key>).map(String)))
                    }
                  >
                    {
                      user.link.map((link, index) => (
                        <ListboxItem key={user.link[index]._id}>{user.link[index].name}</ListboxItem>
                      )
                      )
                    }
                  </Listbox>
                  <p className="text-small text-default-500">Selected value: {selectedValue}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleEdit}>
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditModalOpen} onOpenChange={setEditModalOpen} className="max-w-md">
        <ModalContent>
          <Form
            className="w-full justify-center items-center space-y-4"
            onSubmit={handleEditModalClose}
          >
            <ModalHeader>Edit "{selectedValue}"</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 px-4">
                <Input isRequired value={editName} onChange={(e) => setEditName(e.target.value)} label="Link Name" placeholder="Enter new link name" />
                <Input isRequired value={editLink} onChange={(e) => setEditLink(e.target.value)} label="Link URL" placeholder="Enter new link url" />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Save
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
