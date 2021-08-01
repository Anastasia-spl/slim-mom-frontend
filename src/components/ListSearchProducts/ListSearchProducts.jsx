import { useSelector } from 'react-redux';
import style from './ListSearchProducts.module.scss';
import { getSearchList } from '../../redux/products';
import ItemSearchProducts from '../ItemSearchProducts/ItemSearchProducts';
import { v4 as uuidv4 } from 'uuid';

const ListSearchProducts = ({ onHandleSelectItem, onHandleLoadMore }) => {
  const listSearchProducts = useSelector(getSearchList);

  return (
    <ul className={style.listSearchProducts}>
      {listSearchProducts.map(product => (
        <ItemSearchProducts
          key={uuidv4()}
          isProduct={product}
          handleSelectItem={onHandleSelectItem}
        />
      ))}
      {listSearchProducts.length > 0 ? (
        <button
          className={style.btnLoadMore}
          key={'btn'}
          type="button"
          onClick={() => onHandleLoadMore()}
        >
          Load More
        </button>
      ) : null}
    </ul>
  );
};

export default ListSearchProducts;
