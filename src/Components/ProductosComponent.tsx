import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { urlProduct } from '../endpoints';  // Ajusta la ruta según donde tengas el archivo de endpoints

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  fullDescription: string;
  details: string;
  category: string; // Agregar esta línea para incluir la categoría
  quantity: number;
  images: { data: string }[]; // Asegúrate de que la propiedad 'images' esté definida
}


export const useProductos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const loadProducts = async (pageNumber: number) => {
    try {
      console.log(`Fetching products from: ${urlProduct}`);
      const response = await axios.get(urlProduct, {
        params: {
          pageNumber,
          pageSize: 5,
        },
      });
      const data = response.data;

      console.log('Fetched products:', data);

      if (Array.isArray(data)) {
        setProducts((prev) => [
          ...prev.filter((p) => !data.some((np: Product) => np.id === p.id)),
          ...data,
        ]);
        setHasMore(data.length === 5);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
    }
  };

  const handleShowMore = () => setPage((prev) => prev + 1);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleApplyFilters = async () => {
    try {
      const response = await axios.get(urlProduct, {
        params: {
          pageNumber: 1,
          pageSize: 5,
          categories: selectedCategories.join(','),
          prices: selectedPrices.join(','),
        },
      });
      const data = response.data;

      console.log('Filtered products:', data);

      if (Array.isArray(data)) {
        setProducts(data);
        setPage(1);
        setHasMore(data.length === 5);

        if (!data.length) {
          toast.info('No hay productos que coincidan con los filtros seleccionados.');
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      toast.error('Error al aplicar filtros');
    }
  };

  return {
    products,
    hasMore,
    selectedCategories,
    setSelectedCategories,
    selectedPrices,
    setSelectedPrices,
    handleChange,
    handleShowMore,
    handleApplyFilters,
  };
};
