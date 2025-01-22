import { useState, useEffect } from 'react';
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
    category_id: null,
    establishment_id: 1,
    created_at: new Date().toISOString(),
  });

  const [image, setImage] = useState<File | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); 

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      alert('Você precisa estar logado para acessar esta página.');
      navigate('/');  
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));

      if (decodedToken?.role !== 'Admin') {
        alert('Você precisa ser um Admin para criar produtos.');
        navigate('/');
      } else {
        setIsAdmin(true); 
      }
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      alert('Erro ao verificar as permissões do usuário.');
      navigate('/');
    }
  }, [navigate]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('stock', formData.stock.toString());
    formDataToSend.append('establishment_id', formData.establishment_id.toString());
    formDataToSend.append('category_id', formData.category_id?.toString() || '');
    if (image) formDataToSend.append('image', image);

    try {
      const response = await createProducts(formDataToSend);
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

  if (!isAdmin) return null;

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

          <CategoriesList
            selectedCategory={formData.category_id}
            onCategoryChange={handleCategoryChange}
          />

          <Box mt="4">
            <Text mb="2">Imagem do Produto</Text>
            <Input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
            />
          </Box>
        </Flex>
        <Button mt="4" w="full" colorScheme="blue" onClick={handleSubmit}>
          Criar Produto
        </Button>
      </Box>
    </Flex>
  );
}
