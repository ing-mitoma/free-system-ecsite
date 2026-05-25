import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    Button,
    HStack,
    Badge,
    Icon,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();

    // 🚪 ログアウト処理
    const handleLogout = () => {
        localStorage.removeItem("admin_logged_in"); // スタンプを消す
        navigate("/admin/login"); // ログイン画面へ戻す
    };

    return (
        /* 📱 画面全体：Flexで横並び、高さ100vh固定 */
        <Flex h="100vh" bg="gray.50" overflow="hidden">
            {/* 📁 サイドバー：固定幅260px、ダークデザイン */}
            <Box
                w="260px"
                bg="gray.900"
                color="white"
                p={6}
                display={{ base: "none", md: "flex" }}
                flexDirection="column"
            >
                <Box flex="1">
                    <Heading
                        size="md"
                        mb={8}
                        fontWeight="black"
                        letterSpacing="wider"
                        color="purple.400"
                    >
                        MINIMAL ADMIN
                    </Heading>

                    <Stack gap={2}>
                        <Box
                            p={3}
                            bg="gray.800"
                            borderRadius="xl"
                            fontWeight="bold"
                        >
                            <Link to="/admin">📊 ダッシュボード</Link>
                        </Box>
                        <Box
                            p={3}
                            borderRadius="xl"
                            _hover={{ bg: "gray.800" }}
                            color="gray.400"
                            transition="0.2s"
                        >
                            <Link to="/admin/products">📦 商品管理</Link>
                        </Box>
                        <Box
                            p={3}
                            borderRadius="xl"
                            _hover={{ bg: "gray.800" }}
                            color="gray.400"
                            transition="0.2s"
                        >
                            <Link to="/admin/orders">🧾 注文管理</Link>
                        </Box>
                        <hr
                            style={{ borderColor: "#2D3748", margin: "16px 0" }}
                        />
                        <Box
                            p={3}
                            borderRadius="xl"
                            _hover={{ bg: "gray.800" }}
                            color="gray.400"
                            transition="0.2s"
                        >
                            <Link to="/">🏠 ショップを見る</Link>
                        </Box>
                    </Stack>
                </Box>

                {/* ログアウトボタン（サイドバー下部） */}
                <Button
                    variant="ghost"
                    color="gray.400"
                    justifyContent="flex-start"
                    p={3}
                    _hover={{ bg: "red.900", color: "red.200" }}
                    onClick={handleLogout}
                >
                    🚪 ログアウト
                </Button>
            </Box>

            {/* 📝 メインエリア：残りの幅をすべて使い、スクロール可能に */}
            <Box flex="1" p={{ base: 6, md: 10 }} overflowY="auto">
                {/* ページヘッダー */}
                <Flex justify="space-between" align="center" mb={10}>
                    <Box>
                        <Heading as="h1" size="xl" fontWeight="black" mb={1}>
                            ダッシュボード
                        </Heading>
                        <Text color="gray.500" fontSize="sm">
                            こんにちは、管理者さん。今日の状況です。
                        </Text>
                    </Box>
                    <HStack gap={4}>
                        <Button
                            colorPalette="purple"
                            variant="outline"
                            borderRadius="xl"
                            size="sm"
                        >
                            レポート出力
                        </Button>
                    </HStack>
                </Flex>

                {/* 📊 ステータスカード（売上、注文、在庫） */}
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6} mb={10}>
                    <StatCard
                        label="本日の売上"
                        value="¥48,200"
                        helpText="昨日比 +12%"
                        color="purple.600"
                    />
                    <StatCard
                        label="新規注文数"
                        value="4 件"
                        helpText="未対応: 2件"
                        color="blue.600"
                    />
                    <StatCard
                        label="在庫アラート"
                        value="1 品"
                        helpText="在庫切れ間近"
                        color="red.500"
                    />
                </SimpleGrid>

                {/* 🧾 最新の注文履歴テーブル */}
                <Box
                    bg="white"
                    p={6}
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="gray.100"
                    shadow="sm"
                >
                    <Heading as="h2" size="md" mb={6} fontWeight="bold">
                        最近の注文履歴
                    </Heading>

                    <Box overflowX="auto">
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                            }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        borderBottom: "1px solid #F3F4F6",
                                        textAlign: "left",
                                    }}
                                >
                                    <th
                                        style={{
                                            padding: "12px",
                                            color: "#6B7280",
                                            fontSize: "12px",
                                        }}
                                    >
                                        注文ID
                                    </th>
                                    <th
                                        style={{
                                            padding: "12px",
                                            color: "#6B7280",
                                            fontSize: "12px",
                                        }}
                                    >
                                        お客様名
                                    </th>
                                    <th
                                        style={{
                                            padding: "12px",
                                            color: "#6B7280",
                                            fontSize: "12px",
                                        }}
                                    >
                                        金額
                                    </th>
                                    <th
                                        style={{
                                            padding: "12px",
                                            color: "#6B7280",
                                            fontSize: "12px",
                                        }}
                                    >
                                        ステータス
                                    </th>
                                    <th
                                        style={{
                                            padding: "12px",
                                            color: "#6B7280",
                                            fontSize: "12px",
                                        }}
                                    >
                                        日付
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <OrderRow
                                    id="#1004"
                                    name="山田 太郎"
                                    price="¥12,800"
                                    status="発送済み"
                                    date="2024/03/20"
                                    statusColor="green"
                                />
                                <OrderRow
                                    id="#1003"
                                    name="佐藤 花子"
                                    price="¥8,500"
                                    status="未発送"
                                    date="2024/03/19"
                                    statusColor="orange"
                                />
                                <OrderRow
                                    id="#1002"
                                    name="鈴木 一郎"
                                    price="¥22,400"
                                    status="発送済み"
                                    date="2024/03/19"
                                    statusColor="green"
                                />
                                <OrderRow
                                    id="#1001"
                                    name="高橋 亮"
                                    price="¥14,200"
                                    status="キャンセル"
                                    date="2024/03/18"
                                    statusColor="red"
                                />
                            </tbody>
                        </table>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}

/* 🎨 補助パーツ：統計カード */
function StatCard({
    label,
    value,
    helpText,
    color,
}: {
    label: string;
    value: string;
    helpText: string;
    color: string;
}) {
    return (
        <Box
            bg="white"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.100"
            shadow="sm"
        >
            <Text fontSize="xs" color="gray.500" fontWeight="bold" mb={1}>
                {label}
            </Text>
            <Heading size="2xl" fontWeight="black" color={color}>
                {value}
            </Heading>
            <Text fontSize="xs" color="gray.400" mt={2}>
                {helpText}
            </Text>
        </Box>
    );
}

/* 🎨 補助パーツ：テーブルの1行 */
function OrderRow({ id, name, price, status, date, statusColor }: any) {
    return (
        <tr style={{ borderBottom: "1px solid #F9FAFB" }}>
            <td
                style={{
                    padding: "16px 12px",
                    fontSize: "14px",
                    fontWeight: "bold",
                }}
            >
                {id}
            </td>
            <td style={{ padding: "16px 12px", fontSize: "14px" }}>{name}</td>
            <td
                style={{
                    padding: "16px 12px",
                    fontSize: "14px",
                    fontWeight: "bold",
                }}
            >
                {price}
            </td>
            <td style={{ padding: "16px 12px" }}>
                <Badge
                    colorPalette={statusColor}
                    variant="subtle"
                    borderRadius="md"
                    px={2}
                >
                    {status}
                </Badge>
            </td>
            <td
                style={{
                    padding: "16px 12px",
                    fontSize: "14px",
                    color: "#9CA3AF",
                }}
            >
                {date}
            </td>
        </tr>
    );
}
