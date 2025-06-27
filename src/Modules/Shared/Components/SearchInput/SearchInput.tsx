import React from "react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
}

const SearchInput = ({
  placeholder = "Search...",
  value,
  handleSearch,
  icon = "fas fa-search",
}: SearchInputProps) => {
  return (
    <div className="search-input-container position-relative m-3 w-25">
      <input
        type="text"
        value={value}
        className="form-control ps-5"
        onChange={handleSearch}
        placeholder={placeholder}
      />
      <button
        type="button"
        className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted bg-transparent border-0"
        aria-label="Search"
        disabled
        tabIndex={-1}
      >
        <i className={icon}></i>
      </button>
    </div>
  );
};

export default SearchInput;
