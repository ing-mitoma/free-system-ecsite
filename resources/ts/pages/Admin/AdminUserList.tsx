import React, { useEffect, useState } from "react";
import { Box, Flex, Table, Button, HStack } from "@chakra-ui/react";
import AdminOtherLayout from "../../layouts/AdminOtherLayout";
import UserAddDialog from "../../components/admin/UserAddDialog";
import UserEditDialog from "../../components/admin/UserEditDialog";

interface User {
  id: number;
  name: string;
  email: string;
  role: "管理者" | "一般スタッフ";
}

export default function AdminUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fetchUsers = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log("データの取得失敗", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("本当にこの商品を削除しますか？")) {
      fetch(`/api/users/${id}`, {
        method: "DELETE",
      }).then(() => {
        setUsers(users.filter((users) => users.id !== id));
      });
    }
  };

  return (
    <AdminOtherLayout
      title="管理者一覧"
      description="システムにアクセス可能な管理者アカウントの一覧・編集が行えます。"
    >
      <Flex justify="flex-end" w="100%">
        <UserAddDialog
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          fetchUsers={fetchUsers}
        />
        <UserEditDialog
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          editingUser={editingUser}
          fetchUsers={fetchUsers}
        />
      </Flex>
      <Box
        bg="white"
        p={6}
        border="1px solid"
        borderColor="gray.100"
        shadow="sm"
        mt={6}
      >
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>管理ID</Table.ColumnHeader>
              <Table.ColumnHeader>氏名</Table.ColumnHeader>
              <Table.ColumnHeader>メールアドレス</Table.ColumnHeader>
              <Table.ColumnHeader>操作</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell textAlign="end">
                  <HStack>
                    <Button
                      colorPalette="black"
                      variant="outline"
                      onClick={() => openEditDialog(user)}
                    >
                      編集
                    </Button>
                    <Button
                      colorPalette="red"
                      variant="outline"
                      onClick={() => handleDelete(user.id)}
                    >
                      削除
                    </Button>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </AdminOtherLayout>
  );
}
