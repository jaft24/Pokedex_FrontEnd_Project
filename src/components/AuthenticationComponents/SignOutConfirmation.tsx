import { RefObject } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
} from "@chakra-ui/react";
import { useAuth } from "@/hooks/AuthContext";
import React from "react";

const SignOutConfirmation = ({
  isOpen,
  onClose,
  cancelRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<HTMLDivElement>;
}) => {
  const { logout } = useAuth();

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Sign Out?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to sign out of your Pokedex?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button as="div" ref={cancelRef} onClick={onClose}>
            NO
          </Button>
          <Button onClick={() => logout()} colorScheme="red" ml={3}>
            SIGN OUT
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOutConfirmation;
