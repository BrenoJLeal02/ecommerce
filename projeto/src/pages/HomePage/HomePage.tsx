import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { Carousel } from "../../components/Carousel";
import { Header } from "../../components/Header";

export function HomePage() {
  return (
    <Box bg="gray.50" minHeight="100vh" padding="20px">
      {/* Barra de navegação */}
        <Header/>

     {/* Banner promocional */}
        <Carousel/>

      {/* Seção de produtos */}
      <Heading size="lg" marginBottom="20px">
        Produtos em Destaque
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="20px">
        {Array.from({ length: 6 }).map((_, index) => (
          <GridItem
            key={index}
            bg="white"
            borderRadius="md"
            overflow="hidden"
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{ boxShadow: "lg" }}
          >
            <Image
              src={`https://via.placeholder.com/250x150?text=Produto+${index + 1}`}
              alt={`Produto ${index + 1}`}
              objectFit="cover"
              width="100%"
              height="150px"
            />
            <Box padding="10px">
              <Text fontWeight="bold" fontSize="lg" marginBottom="5px">
                Produto {index + 1}
              </Text>
              <Text color="gray.600" fontSize="sm" marginBottom="10px">
                Descrição breve do produto {index + 1}.
              </Text>
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold" color="green.500">
                  R$ {(Math.random() * 500 + 50).toFixed(2)}
                </Text>
                <Button size="sm" colorScheme="blue">
                  Comprar
                </Button>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
