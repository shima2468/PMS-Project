import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import PopOverIcon from "../../../../assets/icons/popover.svg";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

type Props = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onBlock?: () => void;
  blockLabel?: string;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showBlock?: boolean;
};

const ActionsPopover = ({
  onView,
  onEdit,
  onDelete,
  onBlock,
  blockLabel = "Block",
  showView = true,
  showEdit = true,
  showDelete = true,
  showBlock = true,
}: Props) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const handleAndClose = (callback?: () => void) => {
    if (callback) callback();
    setTimeout(() => {
      document.body.click();
    }, 0);
  };
  const popover = (
    <Popover>
      <Popover.Body className="popover-container p-0">
        <div className="popover-actions p-2 shadow-sm rounded">
          {showView && (
            <div
              className="d-flex align-items-center gap-2 p-2 hover-bg"
              role="button"
              onClick={() => handleAndClose(onView)}
            >
              <i className="fas fa-eye text-success"></i>
              <span>View</span>
            </div>
          )}

          {showEdit && (
            <div
              className="d-flex align-items-center gap-2 p-2 hover-bg"
              role="button"
              onClick={() => handleAndClose(onEdit)}
            >
              <i className="fas fa-pen text-success"></i>
              <span>Edit</span>
            </div>
          )}

          {showDelete && (
            <div
              className="d-flex align-items-center gap-2 p-2 hover-bg"
              role="button"
              onClick={() => handleAndClose(onDelete)}
            >
              <i className="fas fa-trash text-danger"></i>
              <span>Delete</span>
            </div>
          )}

          {showBlock && (
            <div
              className="d-flex align-items-center gap-2 p-2 hover-bg"
              role="button"
              onClick={onBlock}
            >
              <i
                className={`fas ${
                  blockLabel === "Deactivate"
                    ? "fa-ban text-danger"
                    : "fa-check text-success"
                }`}
              ></i>
              <span>{blockLabel}</span>
            </div>
          )}
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popover}
      rootClose
    >
      <Button className="btn-overlay" variant="none" size="sm" ref={triggerRef}>
        <img src={PopOverIcon} alt="popover icon" width={16} height={16} />
      </Button>
    </OverlayTrigger>
  );
};

export default ActionsPopover;
