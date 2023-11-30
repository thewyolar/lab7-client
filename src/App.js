import React from 'react';
import useServerGoods from './useServerGoods';

const App = () => {
  const { loading, error, products, loadMore } = useServerGoods();

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка соединения</p>;

  const containerStyle = {
    textAlign: 'center',
    margin: 'auto',
    display: 'table',
  };

  return (
    <div>
      <h1>Интернет-магазин</h1>
      {products && products.length > 0 ? (
        <>
          <div style={containerStyle}>
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Дата выпуска</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={`${product.id}-${index}`}>
                    <td>{product.name}</td>
                    <td>{product.releaseDate}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={loadMore}>Загрузить больше</button>
          </div>
        </>
      ) : (
        <p>Данные отсутствуют</p>
      )}
    </div>
  );
};

export default App;
