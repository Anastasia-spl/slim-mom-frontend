import style from './ItemSearchProducts.module.scss';

const ItemSearchProducts = ({ isProduct, handleSelectItem }) => {
  return (
    <li
      className={style.itemSearchProducts}
      onClick={() => handleSelectItem(isProduct)}
    >
      {isProduct.title.ru}
    </li>
  );
};

export default ItemSearchProducts;
