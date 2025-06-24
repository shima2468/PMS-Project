import { Table } from "react-bootstrap";
import TablePagination from "../TablePagination/TablePagination";
import { useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import Loder from "../Loder/Loder";
import NoData from "../NoData/NoData";

interface FilterOption {
  value: string;
  label: string;
}

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
  isLoading?: boolean;
  searchPlaceholder?: string;
  pageSizeOptions?: number[];
  onSearch?: (value: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showFilterSelect?: boolean;
  filterLabel?: string;
  filterValue?: string;
  filterOptions?: FilterOption[];
  onFilterChange?: (value: string) => void;
}

const UsedTable = ({
  columns,
  data,
  isLoading = false,
  onSearch,
  onPageChange,
  onPageSizeChange,
  showFilterSelect = false,
  filterLabel = "Filter",
  filterValue = "",
  filterOptions = [],
  onFilterChange,
}: UsedTableProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <div className="mx-4 my-3 bg-white table-container">
      <div className="d-flex justify-content-start align-items-center">
        <SearchInput
          placeholder="Search by title"
          value={searchValue}
          handleSearch={handleSearch}
        />
        {showFilterSelect && filterOptions.length > 0 && onFilterChange && (
          <select
            className="form-select w-25 rounded-4 ms-3"
            value={filterValue}
            onChange={e => onFilterChange(e.target.value)}
          >
            <option value="">{filterLabel}</option>
            {filterOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <Table className="table-custom text-center" striped>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-2">
                <Loder />
              </td>
            </tr>
          ) : data?.data?.length > 0 ? (
            data?.data?.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render(row)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <NoData />
              </td>
            </tr>
          )}
        </tbody>
      </Table>

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