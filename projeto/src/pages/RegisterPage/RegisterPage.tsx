import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../../service/Auth";
import { UserSignUp } from "../../interface/UserInterface";



export function RegisterPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [user, setUser] = useState<UserSignUp>({
    email: "",
    name: "",
    password: "",
    username: "",
    confirm_password: "",
  });

  const handleRegister = async () => {
    const { email, name, password, username, confirm_password } = user;

    if (!email || !name || !username || !password || !confirm_password) {
      toast({
        title: "Preencha todos os campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirm_password) {
      toast({
        title: "As senhas não coincidem.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await signUp({
        email,
        name,
        password,
        confirm_password,
        username,
      });
      toast({
        title: "Registro realizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error: unknown) {
      console.error("Error: ", error);
      toast({
        title: "Erro ao realizar registro.",
        description: "Verifique os dados e tente novamente.",
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
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              borderColor="gray.100"
              placeholder="Digite seu email..."
              type="email"
            />
          </Box>
          <Box>
            <Text mb="2">Nome de Usuário</Text>
            <Input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              borderColor="gray.100"
              placeholder="Digite seu nome de usuário..."
              type="text"
            />
          </Box>
          <Box>
            <Text mb="2">Nome Completo</Text>
            <Input
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              borderColor="gray.100"
              placeholder="Digite seu nome completo..."
              type="text"
            />
          </Box>
          <Box>
            <Text mb="2">Senha</Text>
            <Input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              borderColor="gray.100"
              placeholder="Digite sua senha..."
              type="password"
            />
          </Box>
          <Box>
            <Text mb="2">Confirmar senha</Text>
            <Input
              value={user.confirm_password}
              onChange={(e) =>
                setUser({ ...user, confirm_password: e.target.value })
              }
              borderColor="gray.100"
              placeholder="Digite sua senha novamente..."
              type="password"
            />
          </Box>
        </Flex>
        <Button onClick={handleRegister}  mt="4" w="full" colorScheme="blue" type="button">
          Registrar-se
        </Button>
        <Text mt="4" textAlign="center">
          Já possui uma conta?{" "}
          <Text as={Link} to="/" color="blue.400">
            Faça login aqui!
          </Text>
        </Text>
      </Box>
    </Flex>
  );
}


