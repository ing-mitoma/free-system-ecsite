import React, { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Table,
    Badge,
    HStack,
    Stack,
    Input,
    Textarea,
    Dialog,
    Field,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/SIdebar";

// 💡 商品の型定義
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // 🔄 1. 商品一覧をAPIから取得
    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    // ➕ 新規追加ボタンが押された時
    const handleAdd = () => {
        setEditingProduct({
            id: 0,
            name: "",
            price: 0,
            category: "",
            emoji: "📦",
            description: "",
        });
        setIsDialogOpen(true);
    };

    // ✏️ 編集ボタンが押された時
    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsDialogOpen(true);
    };

    // 🗑️ 削除ボタン（モック）
    const handleDelete = (id: number) => {
        if (confirm("本当にこの商品を削除しますか？")) {
            setProducts(products.filter((p) => p.id !== id));
        }
    };
    const navigate = useNavigate();

    return (
        <Flex h="100vh" bg="gray.50" overflow="hidden">
            {/* サイドバー（Dashboard.tsxと同じものを推奨ですが、簡易版を置きます） */}

            <Sidebar onLogout={() => navigate("/admin/login")} />
            {/* メインエリア */}
            <Box flex="1" p={10} overflowY="auto">
                <Flex justify="space-between" align="center" mb={8}>
                    <Box>
                        <Heading size="xl" fontWeight="black">
                            商品管理
                        </Heading>
                        <Text color="gray.500" fontSize="sm">
                            商品の追加・編集・在庫の確認ができます。
                        </Text>
                    </Box>
                    <Button colorPalette="black" onClick={handleAdd}>
                        + 新規商品を追加
                    </Button>
                </Flex>

                {/* 📦 商品テーブル */}
                <Box
                    bg="white"
                    p={6}
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="gray.100"
                    shadow="sm"
                >
                    <Table.Root size="sm" variant="line">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>商品</Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    カテゴリ
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>価格</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="right">
                                    操作
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {products.map((product) => (
                                <Table.Row key={product.id}>
                                    <Table.Cell>
                                        <HStack gap={3}>
                                            <Box
                                                fontSize="2xl"
                                                bg="gray.50"
                                                p={2}
                                                borderRadius="lg"
                                            >
                                                {product.emoji}
                                            </Box>
                                            <Text fontWeight="bold">
                                                {product.name}
                                            </Text>
                                        </HStack>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge variant="outline">
                                            {product.category}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        ¥{product.price.toLocaleString()}
                                    </Table.Cell>
                                    <Table.Cell textAlign="right">
                                        <HStack gap={2} justify="flex-end">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleEdit(product)
                                                }
                                            >
                                                編集
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                colorPalette="red"
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
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
            </Box>
            {/* 🛠️ 商品追加・編集用のダイアログ（ポップアップ） */}
            {/* Chakra UI v3 の Dialog/Modal システム */}
            {isDialogOpen && editingProduct && (
                <Box
                    position="fixed"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    bg="blackAlpha.600"
                    zIndex="1000"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        bg="white"
                        p={8}
                        borderRadius="3xl"
                        w="lg"
                        shadow="2xl"
                    >
                        <Heading size="md" mb={6}>
                            {editingProduct.id === 0
                                ? "新規商品の登録"
                                : "商品情報の編集"}
                        </Heading>
                        <Stack gap={4}>
                            <Field.Root>
                                <Field.Label fontSize="xs" fontWeight="bold">
                                    商品名
                                </Field.Label>
                                <Input
                                    defaultValue={editingProduct.name}
                                    borderRadius="xl"
                                    bg="gray.50"
                                    variant="subtle"
                                />
                            </Field.Root>
                            <Flex gap={4}>
                                <Field.Root flex="1">
                                    <Field.Label
                                        fontSize="xs"
                                        fontWeight="bold"
                                    >
                                        価格
                                    </Field.Label>
                                    <Input
                                        type="number"
                                        defaultValue={editingProduct.price}
                                        borderRadius="xl"
                                        bg="gray.50"
                                        variant="subtle"
                                    />
                                </Field.Root>
                                <Field.Root flex="1">
                                    <Field.Label
                                        fontSize="xs"
                                        fontWeight="bold"
                                    >
                                        カテゴリ
                                    </Field.Label>
                                    <Input
                                        defaultValue={editingProduct.category}
                                        borderRadius="xl"
                                        bg="gray.50"
                                        variant="subtle"
                                    />
                                </Field.Root>
                            </Flex>
                            <Field.Root>
                                <Field.Label fontSize="xs" fontWeight="bold">
                                    商品説明
                                </Field.Label>
                                <Textarea
                                    defaultValue={editingProduct.description}
                                    borderRadius="xl"
                                    bg="gray.50"
                                    variant="subtle"
                                    rows={3}
                                />
                            </Field.Root>
                            <Flex gap={3} pt={4}>
                                <Button
                                    flex="1"
                                    colorPalette="purple"
                                    borderRadius="xl"
                                    onClick={() => {
                                        alert("保存しました（テスト）");
                                        setIsDialogOpen(false);
                                    }}
                                >
                                    保存する
                                </Button>
                                <Button
                                    variant="ghost"
                                    borderRadius="xl"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    キャンセル
                                </Button>
                            </Flex>
                        </Stack>
                    </Box>
                </Box>
            )}
        </Flex>
    );
}
