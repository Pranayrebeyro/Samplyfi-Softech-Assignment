import { Card, Typography, Modal, Form, Input } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Text } = Typography;

function UserCard({ user, onDelete, onUpdate }) {
  const [liked, setLiked] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 🔹 Open edit modal with user data
  const handleEdit = () => {
    form.setFieldsValue(user);
    setIsEditModalOpen(true);
  };

  // 🔹 Save updated user data
  const handleSave = () => {
    form.validateFields().then((values) => {
      onUpdate(user.id, values);
      setIsEditModalOpen(false);
    });
  };

  return (
    <>
      <Card
        title={user.name}
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
        actions={[
          liked ? (
            <HeartFilled
              key="like"
              style={{ color: "red" }}
              onClick={() => setLiked(false)}
            />
          ) : (
            <HeartOutlined key="like" onClick={() => setLiked(true)} />
          ),
          <EditOutlined key="edit" onClick={handleEdit} />,
          <DeleteOutlined key="delete" onClick={() => onDelete(user.id)} />,
        ]}
      >
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

      {/* 🔹 Edit Modal */}
      <Modal
        title="Edit User"
        open={isEditModalOpen}
        onOk={handleSave}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UserCard;
