import { useState } from "react";

const useModal = () => {
  const [open, onOpenModal] = useState(false);
  const [close, onCloseModal] = useState(false);

  const openModal = () => {
    onOpenModal(true);
  };

  const closeModal = () => {
    onCloseModal(true);
    onOpenModal(false);
  };

  return { open, close, openModal, closeModal };
};

export default useModal;
