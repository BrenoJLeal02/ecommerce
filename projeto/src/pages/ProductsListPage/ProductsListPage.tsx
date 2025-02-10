import { useEffect, useState } from "react";
import { 
  Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Spinner, Text, 
  VStack, HStack, Image, Button, Select 
} from "@chakra-ui/react";
import { getProducts } from "../../service/Products"; 
import { Link } from "react-router-dom";
import { Product } from "../../interface/ProductsInterface";

export function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    
    if (category === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category_name === category);
      setFilteredProducts(filtered);
    }
    setCurrentPage(1); // Volta para a primeira página após o filtro
  };

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      {/* Filtro de categorias */}
      <Select placeholder="Todos" onChange={handleFilterChange} value={selectedCategory} mb={4}>
        {[...new Set(products.map(product => product.category_name))].map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Select>

      <Box overflowX="auto">
        {/* Exibir a tabela em telas médias e maiores */}
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
            {paginatedProducts.map((product) => (
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

        {/* Exibir a versão responsiva em telas pequenas */}
        <VStack display={{ base: "flex", md: "none" }} spacing={4} align="start">
          {paginatedProducts.map((product) => (
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
      </Box>

      {/* Paginação */}
      {totalPages > 1 && (
        <HStack justify="center" mt={4}>
          <Button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            isDisabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Text>Página {currentPage} de {totalPages}</Text>
          <Button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            isDisabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </HStack>
      )}

      <Button as={Link} to={"/"} mt={4}>Voltar</Button>
    </Box>
  );
};
