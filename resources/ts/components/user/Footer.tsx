import { Box, Container, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bg="gray.900" color="gray.400" py={12} mt="auto">
      <Container maxW="6xl">
        <Text fontSize="lg" fontWeight="bold" color="white">
          FREE SYSTEM
        </Text>
        <Box
          borderTop="1px solid"
          borderColor="gray.800"
          mt={8}
          pt={6}
          textAlign="center"
        >
          <Text fontSize="xs">&copy; free system rights.</Text>
        </Box>
      </Container>
    </Box>
  );
}
