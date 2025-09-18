import { Card, Typography } from "antd";

const { Text } = Typography;

function UserCard({ user }) {
  return (
    <Card
      bordered
      style={{ marginBottom: "20px" }}
      cover={
        <div
          style={{
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#d9d9d9",
            }}
          />
        </div>
      }
    >
      <h2 style={{ marginBottom: "10px" }}>{user.name}</h2>
      <p>
        <Text strong>Email: </Text>
        {user.email}
      </p>
      <p>
        <Text strong>Phone: </Text>
        {user.phone}
      </p>
      <p>
        <Text strong>Company: </Text>
        {user.company.name}
      </p>
      <p>
        <Text strong>Website: </Text>
        {user.website}
      </p>
      <p>
        <Text strong>Address: </Text>
        {user.address.street}, {user.address.suite}, {user.address.city},{" "}
        {user.address.zipcode}
      </p>
    </Card>
  );
}

export default UserCard;
