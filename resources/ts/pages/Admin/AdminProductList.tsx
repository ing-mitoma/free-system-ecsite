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
    Portal,
    CloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AdminOtherLayout from "../../layouts/AdminOtherLayout.tsx";

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
        <AdminOtherLayout
            title="商品管理"
            description="商品の追加・編集・在庫の確認ができます。"
        >
            <Flex justify="flex-end" w="100%">
                <Dialog.Root
                    size="lg"
                    placement="center"
                    motionPreset="slide-in-bottom"
                >
                    <Dialog.Trigger asChild>
                        <Button
                            colorPalette="black"
                            size="sm"
                            fontWeight={"bold"}
                        >
                            + 新規作成
                        </Button>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title
                                        fontWeight="black"
                                        fontSize="xl"
                                    >
                                        {editingProduct
                                            ? "新規商品の登録"
                                            : "商品情報の編集"}
                                    </Dialog.Title>
                                    <Dialog.CloseTrigger>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Stack gap={4} my={4}>
                                        <Field.Root>
                                            <Input
                                                placeholder="フレッドペリー"
                                                value={editingProduct.name}
                                                onChange={(e) =>
                                                    seteditingProduct({
                                                        ...editingProduct,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Field.Root>
                                        <Field.Root>
                                            <Input
                                                type="price"
                                                placeholder="1000"
                                                value={products.price}
                                                onChange={(e) =>
                                                    setProducts({
                                                        ...products,
                                                        price: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Field.Root>
                                        <Field.Root>
                                            <select
                                                value={products.category}
                                                onChange={(e) =>
                                                    setproducts({
                                                        ...products,
                                                        category: e.target
                                                            .value as any,
                                                    })
                                                }
                                                style={{
                                                    width: "100%",
                                                    padding: "8px",
                                                    border: "1px solid #E2E8F0",
                                                }}
                                            >
                                                <option value="財布・小物">
                                                    👛 財布・小物
                                                </option>
                                                <option value="バッグ">
                                                    👜 バッグ
                                                </option>
                                                <option value="シューズ">
                                                    👟 シューズ
                                                </option>
                                                <option value="アパレル">
                                                    🧥 アパレル
                                                </option>
                                                <option value="アクセサリー">
                                                    👓 アクセサリー
                                                </option>
                                                <option value="時計">
                                                    ⌚ 時計
                                                </option>
                                                <option value="ガジェット">
                                                    🎧 ガジェット
                                                </option>
                                                <option value="ステーショナリー">
                                                    ✏️ ステーショナリー
                                                </option>
                                                <option value="ライフスタイル">
                                                    🥛 ライフスタイル
                                                </option>
                                            </select>
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label>商品説明</Field.Label>
                                            <Textarea
                                                value={products.description}
                                                onChange={(e) =>
                                                    setProducts({
                                                        ...products,
                                                        price: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Field.Root>
                                    </Stack>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Button
                                        type="submit"
                                        colorPalette="black"
                                        fontWeight="bold"
                                    >
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
                            <Table.ColumnHeader>商品名</Table.ColumnHeader>
                            <Table.ColumnHeader>価格</Table.ColumnHeader>
                            <Table.ColumnHeader>カテゴリー</Table.ColumnHeader>
                            <Table.ColumnHeader>画像</Table.ColumnHeader>
                            <Table.ColumnHeader>操作</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {products.map((product) => (
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>{product.category}</Table.Cell>
                                <Table.Cell>{product.emoji}</Table.Cell>
                                <Table.Cell textAlign="end">
                                    <HStack>
                                        <Button variant="outline">編集</Button>
                                        <Button
                                            colorPalette="red"
                                            variant="outline"
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
