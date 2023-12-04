import { useState, useEffect } from 'react';

const useServerGoods = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products?page=${page}&pageSize=5`)
      const data = await response.json();

      if (data && Array.isArray(data.products)) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage(page + 1);
      } else if (Array.isArray(data)) {
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setPage(page + 1);
      } else {
        setError(new Error('Неверный формат данных с сервера'));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const loadMore = () => {
    setLoading(true);
    fetchProducts();
  };

  return { loading, error, products, loadMore };
};

export default useServerGoods;