import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Typography, Spin, Input } from "antd";
import UserCard from "./components/UserCard";

const { Title } = Typography;
const { Search } = Input;

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch users from API
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Handle search by name/email
  const handleSearch = (value) => {
    const searchText = value.toLowerCase();
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText)
    );
    setFilteredUsers(results);
  };

  // 🔹 Delete user
  const handleDelete = (id) => {
    const updated = users.filter((user) => user.id !== id);
    setUsers(updated);
    setFilteredUsers(updated);
  };

  // 🔹 Update user
  const handleUpdate = (id, updatedData) => {
    const updated = users.map((user) =>
      user.id === id ? { ...user, ...updatedData } : user
    );
    setUsers(updated);
    setFilteredUsers(updated);
  };

  // 🔹 Show loader
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        User Directory (Assignment 2)
      </Title>

      {/* 🔹 Search bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Search
          placeholder="Search by name or email"
          allowClear
          enterButton="Search"
          size="large"
          style={{ maxWidth: 400 }}
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* 🔹 User cards */}
      <Row gutter={[16, 16]}>
        {filteredUsers.map((user) => (
          <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
            <UserCard
              user={user}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;
