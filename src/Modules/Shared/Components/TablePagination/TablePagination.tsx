import { Row, Col, Form, Button } from "react-bootstrap";

const TablePagination = ({
  page = 1,
  totalPages = 10,
  pageSize = 10,
  totalItems = 102,
  onPageChange,
  onPageSizeChange,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  return (
    <Row className="justify-content-end m-3">
      <Col
        xs="auto"
        className="d-flex align-items-center flex-wrap gap-4 text-muted"
      >
        <div className="d-flex align-items-center gap-2">
          <span>Showing</span>
          <Form.Select
            size="sm"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            style={{
              width: "70px",
              borderRadius: "20px",
              fontSize: "0.875rem",
              padding: "2px 12px",
            }}
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Form.Select>
          <span>of {totalItems} Results</span>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span>
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline-light"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="btn-rounded-pagination rounded-circle border"
          >
            <i className="fa-solid fa-angle-left text-secondary"></i>
          </Button>

          <Button
            variant="outline-light"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="btn-rounded-pagination rounded-circle border"
          >
            <i className="fa-solid fa-angle-right text-secondary"></i>
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default TablePagination;
