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
} from "@heroui/react";
import { useState } from "react";

export default function Addnewlink() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [linkname, setLinkname] = useState("");
  const [linkUrl, setLinkUrl] = useState("");


  const handleAdd = async () => {

    const newLink = {
      name : linkname,
      link : linkUrl,
    }
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">+ Add new link</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add new link</ModalHeader>
              <ModalBody>                
                 <Input label="Link Name" placeholder="Enter your link name" type="text" />
                 <Input label="Link" placeholder="Enter your url" type="text" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
