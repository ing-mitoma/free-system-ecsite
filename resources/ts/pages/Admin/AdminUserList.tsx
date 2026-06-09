import { useState } from "react";
import {
  Box,
  Flex,
  Table,
  Button,
  HStack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import AdminOtherLayout from "../../layouts/AdminOtherLayout";
import UserAddDialog from "../../components/admin/UserAddDialog";
import UserEditDialog from "../../components/admin/UserEditDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const deleteUser = async (id: number) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("エラーが起きました");
  }
};

export default function AdminUserList() {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`/api/users`);
      if (!response.ok) throw new Error("商品一覧の取得に失敗しました");
      return response.json() as Promise<User[]>;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("本当にこの商品を削除しますか？")) {
      return;
    }
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <Center minH="100vh" flexDirection="column" gap={4}>
        <Spinner color="black" size="xl" width="40px" height="40px" />
        商品を読み込み中...
      </Center>
    );
  }
  if (isError) {
    return (
      <div className="p-8">
        <p className="text-red-500">エラー: {error.message}</p>
      </div>
    );
  }

  return (
    <AdminOtherLayout
      title="管理者一覧"
      description="システムにアクセス可能な管理者アカウントの一覧・編集が行えます。"
    >
      <Flex justify="flex-end" w="100%">
        <UserAddDialog
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
        />
        <UserEditDialog
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          editingUser={editingUser}
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
              <Table.ColumnHeader>氏名</Table.ColumnHeader>
              <Table.ColumnHeader>メールアドレス</Table.ColumnHeader>
              <Table.ColumnHeader>操作</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((user) => (
              <Table.Row key={user.id}>
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
