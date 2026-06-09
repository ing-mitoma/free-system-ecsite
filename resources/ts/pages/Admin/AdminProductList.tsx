import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Table,
  HStack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import AdminOtherLayout from "../../layouts/AdminOtherLayout";
import ProductAddDialog from "../../components/admin/ProductAddDialog";
import ProductEditDialog from "../../components/admin/ProductEditDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
  description: string;
}

const deleteProduct = async (id: number) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("エラーが起きました");
  }
};

export default function AdminProductList() {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`/api/products`);
      if (!response.ok) throw new Error("商品一覧の取得に失敗しました");
      return response.json() as Promise<Product[]>;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
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
      title="商品管理"
      description="商品の追加・編集・在庫の確認ができます。"
    >
      <Flex justify="flex-end" w="100%">
        <ProductAddDialog
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
        />
        <ProductEditDialog
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          editingProduct={editingProduct}
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
              <Table.ColumnHeader>商品ID</Table.ColumnHeader>
              <Table.ColumnHeader>商品名</Table.ColumnHeader>
              <Table.ColumnHeader>価格（円）</Table.ColumnHeader>
              <Table.ColumnHeader>カテゴリー</Table.ColumnHeader>
              <Table.ColumnHeader>画像</Table.ColumnHeader>
              <Table.ColumnHeader>操作</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell>{product.id}</Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>¥{product.price.toLocaleString()}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.emoji}</Table.Cell>
                <Table.Cell textAlign="end">
                  <HStack>
                    <Button
                      colorPalette="black"
                      variant="outline"
                      onClick={() => openEditDialog(product)}
                    >
                      編集
                    </Button>
                    <Button
                      colorPalette="red"
                      variant="outline"
                      onClick={() => handleDelete(product.id)}
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
