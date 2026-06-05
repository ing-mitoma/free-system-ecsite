import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/AdminSidebar";
import { Children } from "react";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AdminOtherLayout({
  children,
  title,
  description,
}: LayoutProps) {
  const navigate = useNavigate();
  return (
    <Flex h="100vh" bg="gray.50" overflow="hidden">
      <Sidebar onLogout={() => navigate("/admin/login")} />
      <Box flex="1" p={10} overflowY="auto">
        <Flex justify="space-between" align="flex-end" mb={8}>
          <Box>
            <Heading size="xl" fontWeight="black" mb={1}>
              {title}
            </Heading>
            <Text color="gray.500" fontSize="sm">
              {description}
            </Text>
          </Box>
        </Flex>
        {children}
      </Box>
    </Flex>
  );
}
