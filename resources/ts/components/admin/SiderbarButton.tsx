import { Button } from "@chakra-ui/react";
import { Link, NavLink } from "react-router";
interface SidebarProps {
    title: string;
    page: string;
}
export default function SidebarButton({ title, page }: SidebarProps) {
    const targetPath = `/admin/${page}`;
    return (
        <NavLink to={targetPath}>
            {({ isActive }) => (
                <Button
                    w="100%"
                    fontWeight={"bold"}
                    variant={isActive ? "solid" : "ghost"}
                    color={isActive ? "white" : "grey"}
                >
                    {title}
                </Button>
            )}
        </NavLink>
    );
}
