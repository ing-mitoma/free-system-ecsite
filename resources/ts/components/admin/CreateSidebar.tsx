import { Box, Heading, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SidebarButton from "./SiderbarButton";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    onLogout();
  };
  return (
    <Box
      w="260px"
      bg="black"
      color="white"
      h="100hv"
      p={6}
      display={{ base: "none", md: "flex" }}
      flexDirection="column"
    >
      <Heading
        size="md"
        mb={8}
        fontWeight="black"
        color="white"
        textAlign="center"
        asChild
      >
        <Link to="/admin/home">FREE SYSTEM</Link>
      </Heading>
      <Box flex="1">
        <VStack gap={2} align="stretch">
          <SidebarButton title={"ホーム"} page={"home"} />
          <SidebarButton title={"商品一覧"} page={"products"} />
          <SidebarButton title={"管理者一覧"} page={"users"} />
        </VStack>
      </Box>
      <Button
        fontWeight={"bold"}
        variant="ghost"
        color="red"
        onClick={handleLogout}
      >
        ログアウト
      </Button>
    </Box>
  );
}
