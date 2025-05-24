"use client";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

export default function UploadProfilePictureModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setErrorMessage("Image must be smaller than 1MB.");
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const res = await fetch("http://localhost:3001/user/6831769f6a564084f3764e5c/upload", {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      const result = await res.json();
      alert(`Success: ${result.message}`);
      window.location.reload();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const onClose = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setErrorMessage("");
    onOpenChange();
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">Upload Profile Picture</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          <>
            <ModalHeader className="text-lg font-semibold">Upload Profile Picture</ModalHeader>
            <ModalBody className="flex flex-col gap-4 items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="w-40 h-40 object-cover rounded-md border border-default-200"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                  No image selected
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profileInput"
                onChange={handleFileChange}
              />
              <label htmlFor="profileInput">
                <Button as="span" color="primary">Choose Image</Button>
              </label>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
              <Button color="primary" onPress={handleUpload}>Save</Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
