import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import PopOverIcon from "../../../../assets/icons/popover.svg";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ActionsPopover = ({ onView, onEdit, onDelete }: any) => {
  const popover = (
    <Popover>
      <Popover.Body className="popover-container p-0">
        <div className="popover-actions p-2 shadow-sm rounded">
          <div
            className="d-flex align-items-center gap-2 p-2 hover-bg"
            role="button"
            onClick={onView}
          >
            <i className="fas fa-eye text-success"></i>
            <span>View</span>
          </div>
          <div
            className="d-flex align-items-center gap-2 p-2 hover-bg"
            role="button"
            onClick={onEdit}
          >
            <i className="fas fa-pen text-success"></i>
            <span>Edit</span>
          </div>
          <div
            className="d-flex align-items-center gap-2 p-2 hover-bg"
            role="button"
            onClick={onDelete}
          >
            <i className="fas fa-trash text-success"></i>
            <span>Delete</span>
          </div>
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
      <Button className="btn-overlay" variant="none" size="sm">
        <img src={PopOverIcon} alt="popover icon" width={16} height={16} />
      </Button>
    </OverlayTrigger>
  );
};

export default ActionsPopover;
