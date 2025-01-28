import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../service/Auth";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();
  const { login } = useAuth();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!username || !password) {
      toast({
        title: "Preencha todos os campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await signIn({
        username,
        password,
      });

      if (response.token) {
        login(response.token);
        toast({
          title: "Login realizado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (error: unknown) {
      console.error("Error: ", error);
      toast({
        title: "Erro ao realizar login.",
        description: "Verifique suas credenciais e tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="100vh" align="center" justify="center" bg="gray.50">
      <Box width="md" bg="white" p="8" boxShadow="md" borderRadius="md">
        {/* Formulário */}
        <form onSubmit={handleLogin}>
          <Flex flexDirection="column" gap="4" mb={2}>
            <Box>
              <Text mb="2">Nome de usuário ou email</Text>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                borderColor="gray.100"
                placeholder="Digite seu nome de usuário ou email..."
                type="text"
              />
            </Box>
            <Box>
              <Text mb="2">Senha</Text>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderColor="gray.100"
                placeholder="Digite sua senha..."
                type="password"
              />
            </Box>
          </Flex>
          <Text as={Link} to="/forgot" color="blue.400">
            Esqueceu sua senha?
          </Text>
          <Button
            type="submit" 
            mt="4"
            w="full"
            colorScheme="blue"
          >
            Login
          </Button>
        </form>
        <Text mt="4" textAlign="center">
          Não possui uma conta?{" "}
          <Text as={Link} to="/register" color="blue.400">
            Cadastre-se aqui!
          </Text>
        </Text>
      </Box>
    </Flex>
  );
}
