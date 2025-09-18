import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Typography, Spin } from "antd";
import UserCard from "./components/UserCard";

const { Title } = Typography;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch users from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Show loader while fetching
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
        User Directory (Assignment 1)
      </Title>

      <Row gutter={[16, 16]}>
        {users.map((user) => (
          <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;
