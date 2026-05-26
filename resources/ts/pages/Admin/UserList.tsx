import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/SIdebar";

// 管理者データの型定義
interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: "最高管理者" | "一般スタッフ";
}

export default function AdminUserList() {
    const navigate = useNavigate();

    // 💡 管理者一覧のデータ状態（初期のダミーデータ）
    const [users, setUsers] = useState<AdminUser[]>([
        { id: 1, name: "田中花子", email: "test@gmail.jp", role: "最高管理者" },
        {
            id: 2,
            name: "山田 太郎",
            email: "yamada@gmail.jp",
            role: "一般スタッフ",
        },
    ]);

    // 💡 モーダルの開閉と、フォームの入力状態
    const [isOpen, setIsOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null); // nullなら「新規追加」、データがあれば「編集」
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "一般スタッフ" as "最高管理者" | "一般スタッフ",
    });

    // 「新規追加」ボタンを押したとき
    const handleCreateOpen = () => {
        setEditingUser(null);
        setFormData({ name: "", email: "", role: "一般スタッフ" });
        setIsOpen(true);
    };

    // 「編集」ボタンを押したとき
    const handleEditOpen = (user: AdminUser) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role });
        setIsOpen(true);
    };

    // フォームの保存（追加 or 更新）ボタンを押したとき
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingUser) {
            // 🔄 編集（更新）のロジック
            setUsers(
                users.map((u) =>
                    u.id === editingUser.id ? { ...u, ...formData } : u,
                ),
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
        if (confirm("本当にこの管理者を削除しますか？")) {
            setUsers(users.filter((u) => u.id !== id));
        }
    };

    return (
        <Flex h="100vh" bg="gray.50" overflow="hidden">
            <Sidebar onLogout={() => navigate("/admin/login")} />

            {/* メインエリア */}
            <Box flex="1" p={10} overflowY="auto">
                <Flex justify="space-between" align="flex-end" mb={8}>
                    <Box>
                        <Heading size="xl" fontWeight="black" mb={1}>
                            管理者一覧
                        </Heading>
                        <Text color="gray.500" fontSize="sm">
                            システムにアクセス可能な管理者アカウントの一覧・編集が行えます。
                        </Text>
                    </Box>
                    {/* 💡 新規追加ボタン */}
                    <Button
                        colorPalette="black"
                        fontWeight="bold"
                        onClick={handleCreateOpen}
                    >
                        + 管理者を追加
                    </Button>
                </Flex>

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
                                <Table.ColumnHeader>名前</Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    メールアドレス
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>権限</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="right">
                                    操作
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {users.map((user) => (
                                <Table.Row key={user.id}>
                                    <Table.Cell fontWeight="bold">
                                        {user.name}
                                    </Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            colorPalette={
                                                user.role === "最高管理者"
                                                    ? "purple"
                                                    : "gray"
                                            }
                                        >
                                            {user.role}
                                        </Badge>
                                    </Table.Cell>
                                    {/* 💡 編集・削除ボタンのエリア */}
                                    <Table.Cell textAlign="right">
                                        <HStack gap={2} justify="flex-end">
                                            <Button
                                                size="xs"
                                                variant="outline"
                                                onClick={() =>
                                                    handleEditOpen(user)
                                                }
                                            >
                                                編集
                                            </Button>
                                            <Button
                                                size="xs"
                                                variant="ghost"
                                                colorPalette="red"
                                                onClick={() =>
                                                    handleDelete(user.id)
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

            {/* 🎯 追加・編集用の共通ダイアログ（モーダル窓） */}
            <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
                <Dialog.Content borderRadius="2xl" p={6}>
                    <Dialog.Header>
                        <Dialog.Title fontWeight="black" fontSize="xl">
                            {editingUser
                                ? "管理者情報の編集"
                                : "新しい管理者の追加"}
                        </Dialog.Title>
                    </Dialog.Header>

                    <form onSubmit={handleSave}>
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
                                            borderRadius: "6px",
                                            border: "1px solid #E2E8F0",
                                        }}
                                    >
                                        <option value="一般スタッフ">
                                            一般スタッフ
                                        </option>
                                        <option value="最高管理者">
                                            最高管理者
                                        </option>
                                    </select>
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>

                        <Dialog.Footer gap={2}>
                            <Button
                                variant="ghost"
                                onClick={() => setIsOpen(false)}
                            >
                                キャンセル
                            </Button>
                            <Button
                                type="submit"
                                colorPalette="purple"
                                fontWeight="bold"
                            >
                                保存する
                            </Button>
                        </Dialog.Footer>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </Flex>
    );
}
