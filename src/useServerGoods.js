import { useState, useEffect } from 'react';

const useServerGoods = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products?page=${page}&pageSize=10`, {
        method: 'GET',
        mode: 'cors', // This enables CORS handling
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000', // Specify the origin of your request
        },
      });      const data = await response.json();

      if (Array.isArray(data.products)) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
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
