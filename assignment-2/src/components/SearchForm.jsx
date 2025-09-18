import { Input } from "antd";

function SearchForm({ onSearch }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <Input.Search
        placeholder="Search by name or email"
        enterButton="Search"
        size="large"
        style={{ maxWidth: 400 }}
        onSearch={onSearch}
      />
    </div>
  );
}

export default SearchForm;
