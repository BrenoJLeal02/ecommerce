import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { forgot } from "../../service/Auth";


export function ForgotPage() {
  const [email, setEmail] = useState<string>("");
  const toast = useToast();

  const handleRecoverPassword = async () => {
    if (!email) {
      toast({
        title: "Por favor, insira um email válido.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await forgot({ email });

      toast({
        title: "Recuperação de senha iniciada!",
        description: "Verifique seu email para instruções.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro ao recuperar a senha.",
        description: "Tente novamente mais tarde.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="100vh" align="center" justify="center" bg="gray.50">
      <Box width="md" bg="white" p="8" boxShadow="md" borderRadius="md">
        <Flex flexDirection="column" gap="4">
          <Box>
            <Text mb="2">Email</Text>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderColor="gray.100"
              placeholder="Digite seu email..."
              type="email"
            />
          </Box>
        </Flex>
        <Button
          onClick={handleRecoverPassword}
          mt="4"
          w="full"
          colorScheme="blue"
          type="button"
        >
          Recuperar senha
        </Button>
      </Box>
    </Flex>
  );
}