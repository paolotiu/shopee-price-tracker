import React, { useContext, useState } from "react";
import { Modal } from "../components/General/Modal";
import useModal from "./useModal";

const Context = React.createContext<{
  modalContent: JSX.Element | null;
  setModalContent: React.Dispatch<React.SetStateAction<any>>;
  openModal: () => void;
  closeModal: () => void;
}>({
  modalContent: null,
  setModalContent: () => {},
  openModal: () => {},
  closeModal: () => {},
});

export const ModalContext: React.FC = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const { isModalOpen, closeModal, openModal } = useModal();
  console.log("heyy");
  return (
    <Context.Provider
      value={{ modalContent, setModalContent, openModal, closeModal }}
    >
      {children}
      <Modal isOpen={isModalOpen}>{modalContent}</Modal>
    </Context.Provider>
  );
};

export const useModalContext = () => useContext(Context);
