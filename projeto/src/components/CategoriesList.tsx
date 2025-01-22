import { useState, useEffect } from 'react';
import { getCategories } from '../service/Categories';
import { Box, Text, Select } from '@chakra-ui/react';
import { CategoriesListProps, Category } from '../interface/CategoriesInterface';

export const CategoriesList: React.FC<CategoriesListProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Text>Carregando categorias...</Text>;
  }

  return (
    <Box>
      <Text mb="2">Categoria</Text>
      <Select
        name="category_id"
        value={selectedCategory || ''}
        onChange={(e) => onCategoryChange(parseInt(e.target.value))}
        placeholder="Selecione uma categoria"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};
