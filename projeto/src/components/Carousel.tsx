import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface CarouselItem {
  id: number;
  image: string;
  text: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/1200x400?text=Promoção+1",
    text: "Oferta imperdível: Produtos com até 50% de desconto!",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/1200x400?text=Promoção+2",
    text: "Frete grátis em compras acima de R$ 150!",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/1200x400?text=Promoção+3",
    text: "Novidades exclusivas: Aproveite antes que acabe!",
  },
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avançar para o próximo slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Voltar para o slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  // Troca automática de slides a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <Box position="relative" width="100%" height="300px" overflow="hidden" borderRadius="md" boxShadow="lg">
      {/* Slides */}
      {carouselItems.map((item, index) => (
        <Box
          key={item.id}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgImage={`url(${item.image})`}
          bgSize="cover"
          bgPosition="center"
          transition="all 0.5s"
          opacity={index === currentIndex ? 1 : 0}
          zIndex={index === currentIndex ? 1 : 0}
        >
          <Flex
            align="center"
            justify="center"
            height="100%"
            bg="rgba(0, 0, 0, 0.4)"
            color="white"
            textAlign="center"
            padding="20px"
          >
            <Text fontSize="2xl" fontWeight="bold">
              {item.text}
            </Text>
          </Flex>
        </Box>
      ))}

      {/* Botões de Navegação */}
      <IconButton
        aria-label="Anterior"
        icon={<ChevronLeftIcon />}
        position="absolute"
        top="50%"
        left="10px"
        transform="translateY(-50%)"
        zIndex="2"
        onClick={prevSlide}
        colorScheme="whiteAlpha"
        borderRadius="full"
        size="sm"
      />
      <IconButton
        aria-label="Próximo"
        icon={<ChevronRightIcon />}
        position="absolute"
        top="50%"
        right="10px"
        transform="translateY(-50%)"
        zIndex="2"
        onClick={nextSlide}
        colorScheme="whiteAlpha"
        borderRadius="full"
        size="sm"
      />
    </Box>
  );
}
