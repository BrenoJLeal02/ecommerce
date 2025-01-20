// src/pages/CreateProductPage.tsx
import { useState } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createProducts } from '../../service/Products';
import { CategoriesList } from '../../components/CategoriesList';
import { CreateProducts } from '../../interface/ProductsInterface';

export function CreateProductPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateProducts>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: null, // Iniciar com null
    establishment_id: 1,
    created_at: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    }));
  };

  const handleCategoryChange = (categoryId: number) => {
    setFormData((prevData) => ({
      ...prevData,
      category_id: categoryId,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createProducts(formData);
      if (response.status === 201) {
        navigate('/products');
      } else {
        alert('Erro ao criar o produto.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao criar o produto.');
    }
  };

  return (
    <Flex height="100vh" align="center" justify="center" bg="gray.50">
      <Box width="md" bg="white" p="8" boxShadow="md" borderRadius="md">
        <Flex flexDirection="column" gap="4" mb={2}>
          <Box>
            <Text mb="2">Nome do produto</Text>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              borderColor="gray.100"
              placeholder="Digite o nome do produto"
              type="text"
            />
          </Box>
          <Box>
            <Text mb="2">Descrição</Text>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              borderColor="gray.100"
              placeholder="Digite a descrição do produto"
              type="text"
            />
          </Box>
          <Box>
            <Text mb="2">Preço</Text>
            R$
            <Input
              name="price"
              value={formData.price}
              onChange={handleChange}
              borderColor="gray.100"
              placeholder="Digite o preço"
              type="number"
              step="0.01"
            />
          </Box>
          <Box>
            <Text mb="2">Estoque</Text>
            <Input
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              borderColor="gray.100"
              placeholder="Digite a quantidade em estoque"
              type="number"
            />
          </Box>

          {/* Usando o componente CategoriesList */}
          <CategoriesList
            selectedCategory={formData.category_id}
            onCategoryChange={handleCategoryChange}
          />
        </Flex>
        <Button mt="4" w="full" colorScheme="blue" onClick={handleSubmit}>
          Criar Produto
        </Button>
      </Box>
    </Flex>
  );
}
