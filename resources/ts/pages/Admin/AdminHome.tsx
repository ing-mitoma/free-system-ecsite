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
    Card,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/CreateSidebar";
import CardHome from "../../components/admin/HomeCard";

export default function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <Flex h="100vh" bg="gray.50" overflow="hidden">
            <Sidebar onLogout={() => navigate("/admin/login")} />
            {/* 📝 右側：メインコンテンツ表示エリア */}
            <Box flex="1" p={{ base: 6, md: 10 }} overflowY="auto">
                {/* ヘッダー部分 */}
                <Flex justify="space-between" align="center" mb={10}>
                    <Box>
                        <Heading as="h1" size="xl" fontWeight="black" mb={1}>
                            管理者ホーム
                        </Heading>
                        <Text color="gray.500" fontSize="sm">
                            ショップ全体の運営状況の確認と、各管理メニューへのアクセスが可能です。
                        </Text>
                    </Box>
                </Flex>

                <Heading
                    as="h2"
                    size="sm"
                    color="gray.500"
                    fontWeight="bold"
                    mb={4}
                    textTransform="uppercase"
                    letterSpacing="wider"
                >
                    管理メニューへのアクセス
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6} mb={10}>
                    <CardHome
                        title="商品管理"
                        description="商品の新規登録、価格の変更、在庫の確認・編集、削除が行えます。"
                        page="products"
                    />
                    <CardHome
                        title="管理者一覧"
                        description="この管理システムにログインできるスタッフのアカウント管理、権限設定が行えます。"
                        page="users"
                    />
                </SimpleGrid>
            </Box>
        </Flex>
    );
}
