import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Table, HStack } from "@chakra-ui/react";
import AdminOtherLayout from "../../layouts/AdminOtherLayout";
import ProductAddDialog from "../../components/admin/ProductAddDialog";
import ProductEditDialog from "../../components/admin/ProductEditDialog";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
  description: string;
}

export default function AdminProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log("データの取得失敗", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("本当にこの商品を削除しますか？")) {
      fetch(`/api/products/${id}`, {
        method: "DELETE",
      }).then(() => {
        setProducts(products.filter((product) => product.id !== id));
      });
    }
  };

  return (
    <AdminOtherLayout
      title="商品管理"
      description="商品の追加・編集・在庫の確認ができます。"
    >
      <Flex justify="flex-end" w="100%">
        <ProductAddDialog
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          fetchProducts={fetchProducts}
        />
        <ProductEditDialog
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          editingProduct={editingProduct}
          fetchProducts={fetchProducts}
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
            {products.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell>{product.id}</Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
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
