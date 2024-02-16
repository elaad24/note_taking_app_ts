import { useState } from "react";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";

type ModalComponentProps = {
  textHeader: string;
  textBody: string;
  isOpen: boolean;
  showBtns?: boolean;
  showInitBtn?: boolean;
  initBtnText?: string;
};

export default function ModaComponent({
  textHeader = "",
  textBody = "",
  isOpen = false,
  showBtns = true,
  showInitBtn = true,
  initBtnText = "",
}: ModalComponentProps) {
  const [show, setShow] = useState<boolean>(isOpen);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {showInitBtn ? (
        <Button variant="primary" onClick={handleShow}>
          {initBtnText}
        </Button>
      ) : (
        ""
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{textHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{textBody}</Modal.Body>
        {showBtns ? (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
}
