export interface Category {
    id: number;
    name: string;
    description?: string;
  }

  export interface CategoriesListProps {
    selectedCategory: number | null;
    onCategoryChange: (categoryId: number) => void;
  }