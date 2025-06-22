import { Table } from "react-bootstrap";
import TablePagination from "../TablePagination/TablePagination";
import { useState } from "react";
import SearchInput from "../SearchInput/SearchInput";

interface Column {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (row: any) => React.ReactNode;
}

interface UsedTableProps {
  columns: Column[];

  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    pageNumber: number;
    pageSize: number;
  };
  searchPlaceholder?: string;
  pageSizeOptions?: number[];
  onSearch?: (value: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

const UsedTable = ({
  columns,
  data,

  onSearch,
  onPageChange,
  onPageSizeChange,
}: UsedTableProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <div className="mx-4 my-3 bg-white table-container">
      <SearchInput
        placeholder="Search by title"
        value={searchValue}
        handleSearch={handleSearch}
      />
      <div className="table-responsive">
        <Table className="table-custom" striped>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render(row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <TablePagination
          page={data.pageNumber}
          totalPages={data.totalNumberOfPages}
          pageSize={data.pageSize}
          totalItems={data.totalNumberOfRecords}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
};

export default UsedTable;
