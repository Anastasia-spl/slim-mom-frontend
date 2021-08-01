import style from './ItemSearchProducts.module.scss';

const ItemSearchProducts = ({ isProduct, handleSelectItem }) => {
  return (
    <li
      className={style.itemSearchProducts}
      onClick={() => handleSelectItem(isProduct)}
    >
      <p className={style.valueSearch}>{isProduct.title.ru}</p>
      <p className={style.valueSearch}>{isProduct.calories} ккал</p>
    </li>
  );
};

export default ItemSearchProducts;
