import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { Category } from "../../interface/CategoriesInterface";
import { createCategory } from "../../service/Categories";

const CreateCategoryPage: React.FC = () => {
  const [formData, setFormData] = useState<Category>({
    id: 0, 
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Remove erros ao digitar
  };

  const validateForm = () => {
    const validationErrors: { name?: string } = {};
    if (!formData.name.trim()) {
      validationErrors.name = "O nome é obrigatório.";
    }
    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await createCategory(formData);

      alert("Categoria criada com sucesso!");
      setFormData({ id: 0, name: "", description: "" });
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      alert("Erro ao criar categoria. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Criar Categoria
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nome da Categoria</FormLabel>
            <Input
              id="name"
              placeholder="Digite o nome da categoria"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="description">Descrição (Opcional)</FormLabel>
            <Input
              id="description"
              placeholder="Digite uma descrição para a categoria"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </FormControl>

          <Button 
          type="submit" 
          colorScheme="blue"      
          isLoading={isSubmitting}>
            Criar Categoria
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateCategoryPage;
