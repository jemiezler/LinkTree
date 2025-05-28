import { Alert, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react"

interface ResponseModalProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
}

export default function ResponseModal({ isOpen, onClose, text }: ResponseModalProps) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <Alert color={'default'} title={text} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Continue
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}