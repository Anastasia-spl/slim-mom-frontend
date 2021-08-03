import { useSelector } from 'react-redux';
import style from './ListSearchProducts.module.scss';
import { getSearchList, isTotalPages } from '../../redux/products';
import ItemSearchProducts from '../ItemSearchProducts/ItemSearchProducts';
import { v4 as uuidv4 } from 'uuid';

const ListSearchProducts = ({
  isPage,
  onHandleSelectItem,
  onHandleLoadMore,
}) => {
  const listSearchProducts = useSelector(getSearchList);
  const totalPages = useSelector(isTotalPages);

  return (
    <ul className={style.listSearchProducts}>
      {listSearchProducts.map(product => (
        <ItemSearchProducts
          key={uuidv4()}
          isProduct={product}
          handleSelectItem={onHandleSelectItem}
        />
      ))}
      {listSearchProducts.length > 0 && isPage < totalPages ? (
        <button
          className={style.btnLoadMore}
          key={'btn'}
          type="button"
          onClick={() => onHandleLoadMore()}
        >
          Показать больше ->
        </button>
      ) : null}
    </ul>
  );
};

export default ListSearchProducts;
