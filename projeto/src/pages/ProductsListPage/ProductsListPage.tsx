import { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Spinner, Text, VStack, HStack, Image, Button } from "@chakra-ui/react";
import { getProducts } from "../../service/Products"; 
import { Link } from "react-router-dom";
import { Product } from "../../interface/ProductsInterface";



export function ProductsListPage () {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.products); 
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box maxW="1200px" mx="auto" p={4}>
 
      <Box overflowX="auto">
        <Table variant="simple" display={{ base: "none", md: "table" }}>
          <TableCaption>Lista de Produtos</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Categoria</Th> 
              <Th>Preço</Th>
              <Th>Descrição</Th>
              <Th>Estoque</Th>
              <Th>Imagem</Th> 
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.name}</Td>
                <Td>{product.category_name}</Td>
                <Td>{product.price}</Td>
                <Td>{product.description}</Td>
                <Td>{product.stock}</Td>
                <Td>

                  {product.image_path && (
                    <Image
                      src={`http://localhost:5000/uploads/${product.image_path}`}
                      alt={product.name}
                      boxSize="50px"
                      objectFit="cover"
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <VStack display={{ base: "block", md: "none" }} spacing={4} align="start">
          {products.map((product) => (
            <Box key={product.id} borderWidth={1} borderRadius="md" p={4} width="100%" boxShadow="sm">
              <HStack justify="space-between">
                <Text fontWeight="bold">ID:</Text>
                <Text>{product.id}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Nome:</Text>
                <Text>{product.name}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Categoria:</Text>
                <Text>{product.category_name}</Text> 
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Preço:</Text>
                <Text>{product.price}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Descrição:</Text>
                <Text>{product.description}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Estoque:</Text>
                <Text>{product.stock}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Imagem:</Text>
                {product.image_path && (
                  <Image
                    src={`http://localhost:5000/uploads/${product.image_path}`} 
                    alt={product.name}
                    boxSize="50px"
                    objectFit="cover"
                  />
                )}
              </HStack>
            </Box>
          ))}
        </VStack>
        <Button as={Link} to={"/"}>Voltar</Button>
      </Box>
    </Box>
  );
};

