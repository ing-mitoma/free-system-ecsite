import { Card, Button, Box, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { Link } from "react-router";

interface CardHomeProps {
    title: string;
    description: string;
    page: string;
}
export default function CardHome({ title, description, page }: CardHomeProps) {
    return (
        <LinkBox asChild>
            <Card.Root>
                <Card.Body>
                    <Card.Title mb="2">{title}</Card.Title>
                    <Card.Description>{description}</Card.Description>
                </Card.Body>
                <Card.Footer>
                    <Button
                        variant="solid"
                        colorPalette="black"
                        fontWeight="bold"
                        asChild
                    >
                        <LinkOverlay asChild>
                            <Link to={`/admin/${page}`}>ページを開く</Link>
                        </LinkOverlay>
                    </Button>
                </Card.Footer>
            </Card.Root>
        </LinkBox>
    );
}
