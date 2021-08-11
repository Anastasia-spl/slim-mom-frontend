import style from './ItemSearchProducts.module.scss';

const ItemSearchProducts = ({ isProduct, handleSelectItem }) => {
  const nameProduct = isProduct.title.ru;
  return (
    <li
      className={style.itemSearchProducts}
      onClick={() => handleSelectItem(isProduct)}
    >
      <p className={style.valueSearch}>
        {nameProduct ? nameProduct : isProduct.title}
      </p>
      <p className={style.valueSearch}>{isProduct.calories} ккал</p>
    </li>
  );
};

export default ItemSearchProducts;
