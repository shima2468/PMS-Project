import { Link } from "react-router-dom";

interface HeaderProps {
  showBackButton?: boolean;
  showAddButton?: boolean;
  title: string;
  items?: string;
  item?:string;
  path?: string;
}

export default function Header({ showBackButton = false, showAddButton = false , title, items, item, path}: HeaderProps) {
  return (
    <div className="ps-5 p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="d-flex align-items-center">
            {showBackButton && (
              <>
                <i className="fa-solid fa-angle-left"></i>
                <button className="btn navigate-btn">View All {items}</button>
              </>
            )}
          </div>
          <h1 className="header-title">{title}</h1>
        </div>
        {showAddButton && path && (
          <Link to={path} className="main-btn">
            <i className="fa-solid fa-plus me-2"></i>
            <span>Add New {item}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
