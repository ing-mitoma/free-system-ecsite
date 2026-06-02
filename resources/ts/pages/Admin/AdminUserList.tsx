import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Badge,
  Button,
  Input,
  Field,
  Dialog,
  Stack,
  HStack,
  IconButton,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import AdminOtherLayout from "../../layouts/AdminOtherLayout";

// 管理者データの型定義
interface Admin {
  id: number;
  name: string;
  email: string;
  role: "管理者" | "一般スタッフ";
}

export default function AdminUserList() {
  const [users, setUsers] = useState<Admin[]>([]);
  useEffect(() => {
    fetch("/api/admins")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log("データの取得失敗", error));
  }, []);
  console.log(users);

  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Admin | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "一般スタッフ" as "管理者" | "一般スタッフ",
  });

  const handleCreateOpen = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "一般スタッフ" });
    setIsOpen(true);
  };

  const handleEditOpen = (user: Admin) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      // 🔄 編集（更新）のロジック
      setUsers(
        users.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
      );
    } else {
      // ✨ 新規追加のロジック
      const newId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers([...users, { id: newId, ...formData }]);
    }
    setIsOpen(false);
  };

  // 「削除」ボタンを押したとき
  const handleDelete = (id: number) => {
    if (window.confirm("本当にこの商品を削除しますか？")) {
      fetch(`/api/admins/${id}`, {
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
        <Dialog.Root
          size="lg"
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <Dialog.Trigger asChild>
            <Button colorPalette="black" size="sm" fontWeight={"bold"}>
              + 新規作成
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title fontWeight="black" fontSize="xl">
                    {editingUser ? "管理者情報の編集" : "新しい管理者の追加"}
                  </Dialog.Title>
                  <Dialog.CloseTrigger>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Header>
                <Dialog.Body>
                  <Stack gap={4} my={4}>
                    <Field.Root>
                      <Input
                        placeholder="例：山田 太郎"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </Field.Root>
                    <Field.Root>
                      <Input
                        type="email"
                        placeholder="example@in-g.jp"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </Field.Root>
                    <Field.Root>
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            role: e.target.value as any,
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        <option value="一般スタッフ">一般スタッフ</option>
                        <option value="管理者">管理者</option>
                      </select>
                    </Field.Root>
                  </Stack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button type="submit" colorPalette="black" fontWeight="bold">
                    保存する
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
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
              <Table.ColumnHeader>役職</Table.ColumnHeader>
              <Table.ColumnHeader>操作</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell textAlign="end">
                  <HStack>
                    <Button variant="outline">編集</Button>
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
