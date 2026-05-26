import { createBrowserRouter } from "react-router";
import { Button } from "@chakra-ui/react";
import Home from "./pages/Shop/Home";
import ShopLayout from "./layouts/ShopLayout";
import Cart from "./pages/Shop/Cart";
import Product from "./pages/Shop/Product";
import Checkout from "./pages/Shop/Checkout";
import AdminLogin from "./pages/Admin/login";
import AdminAuthGuard from "./components/admin/AdminAuthGuard";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProductList from "./pages/Admin/AdminProductList";
import AdminUserList from "./pages/Admin/UserList";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Button colorPalette="teal">Hello React Router</Button>,
    },
    {
        path: "/home",
        element: (
            <ShopLayout>
                <Home />
            </ShopLayout>
        ),
    },
    {
        path: "/cart",
        element: (
            <ShopLayout>
                <Cart />
            </ShopLayout>
        ),
    },
    {
        path: "/product/:id",
        element: (
            <ShopLayout>
                <Product />
            </ShopLayout>
        ),
    },
    {
        path: "/checkout", // 💡 追加：購入画面のURLを設定
        element: (
            <ShopLayout>
                <Checkout />
            </ShopLayout>
        ),
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
        path: "/admin",
        element: (
            <AdminAuthGuard>
                <AdminDashboard />
            </AdminAuthGuard>
        ),
    },
    {
        path: "/admin/products",
        element: (
            <AdminAuthGuard>
                <AdminProductList />
            </AdminAuthGuard>
        ),
    },
    {
        path: "/admin/users", // 💡 追加
        element: (
            <AdminAuthGuard>
                <AdminUserList />
            </AdminAuthGuard>
        ),
    },
]);
