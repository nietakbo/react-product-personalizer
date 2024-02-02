import styles from './Product.module.scss';
import ProductImage from './ProductImage/ProductImage';
import ProductForm from './ProductForm/ProductForm';
import { useMemo, useState } from 'react';
import propTypes from 'prop-types';

const Product = ({ colors, sizes, name, title, basePrice }) => {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0]);

  const getPrice = useMemo(() => {
    return (basePrice += currentSize.additionalPrice);
  }, [currentSize]);

  const addToCart = e => {
    e.preventDefault();
    console.log(`
    Summary
    =================
    Name: ${title}
    Price: ${getPrice}$
    Size: ${currentSize.name}
    Color: ${currentColor}
    `);
  };

  return (
    <article className={styles.product}>
        <ProductImage title={title} name={name} currentColor={currentColor} />
      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>Price: {getPrice}$</span>
        </header>
        <ProductForm
          addToCart={addToCart}
          sizes={sizes}
          currentSize={currentSize}
          colors={colors}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          setCurrentSize={setCurrentSize}
        />
      </div>
    </article>
  )
};

Product.propTypes = {
  sizes: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      additionalPrice: propTypes.number.isRequired,
    })
  ),
  colors: propTypes.arrayOf(propTypes.string).isRequired,
  name: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  basePrice: propTypes.number.isRequired,
};

export default Product;