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
  Alert,
  Form,
} from "@heroui/react";
import { set } from "lodash";
import { useState } from "react";
import ResponseModal from "./responseModal";

export default function Addnewlink() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [linkname, setLinkname] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [userId, setUserId] = useState("68302720fb7bed40c0d57cbe");
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = async () => {

    const newLink = {
      name: linkname,
      link: linkUrl,
      user: userId,
    }

    try {
      const res = await fetch("http://localhost:3001/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink),
      });
      setErrorMessage("New link added successfully");
      setIsResponseOpen(true);
      if (!res.ok) throw new Error("Failed to submit");
      const result = await res.json();
    } catch (error: any) {
      setErrorMessage("Failed to add new link");
      setIsResponseOpen(true);
    }

    onClose();
    // window.location.reload();
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">+ Add new link</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <Form
            className="w-full justify-center items-center space-y-4"
            onSubmit={handleAdd}
          >
            <ModalHeader className="flex flex-col gap-1">Add new link</ModalHeader>
            <ModalBody>

              <Input isRequired value={linkname} onChange={(e) => setLinkname(e.target.value)} label="Link Name" placeholder="Enter your link name" type="text" />
              <Input isRequired value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} label="Link" placeholder="Enter your url" type="text" />

            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Add
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>

      <ResponseModal isOpen={isResponseOpen} onClose={() => setIsResponseOpen(false)} text={errorMessage} />
    </>
  );
};