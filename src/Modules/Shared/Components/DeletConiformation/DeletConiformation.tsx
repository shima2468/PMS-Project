import { Modal, Button } from "react-bootstrap";

interface DeleteConfirmationProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmation = ({
  show,
  onHide,
  onConfirm,
  itemName,
}: DeleteConfirmationProps) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="border-0 rounded-3 shadow-sm"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5">
          <i className="bi bi-exclamation-triangle-fill me-2 main-color"></i>
          Delete Confirmation
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-3">
        <p className="mb-1 text-muted">
          Are you sure you want to delete{" "}
          <strong className="text-black">{itemName}</strong>?
        </p>
        <p className="text-muted small mb-0">This action cannot be undone.</p>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
        <Button
          variant="light"
          className="px-4 rounded-pill border bg-white color-muted"
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          className="px-4 rounded-pill border-0 text-white bg-main-color"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
