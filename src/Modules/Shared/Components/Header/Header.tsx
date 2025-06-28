import { Link } from "react-router-dom";

interface HeaderProps {
  showBackButton?: boolean;
  showAddButton?: boolean;
  title: string;
  items?: string;
  item?: string;
  path?: string;
  backPath?: string;
}

export default function Header({
  showBackButton = false,
  showAddButton = false,
  title,
  items,
  item,
  path,
  backPath,
}: HeaderProps) {
  // const { loginData } = useContext(AuthContext)!;
  return (
    <div className="card-container ps-5 p-4 my-2">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="d-flex align-items-center">
            {showBackButton && (
              <>
                <i className="fa-solid fa-angle-left"></i>
                <Link to={backPath ?? "#"} className="btn navigate-btn">
                  View All {items}
                </Link>
              </>
            )}
          </div>
          <h1 className="header-title">{title}</h1>
        </div>
        {showAddButton && (
          <Link to={path ?? "#"} className="main-btn">
            <i className="fa-solid fa-plus me-2"></i>
            <span>Add New {item}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
