import { useSelector } from 'react-redux';
import style from './ListSearchProducts.module.scss';
import { getSearchList } from '../../redux/products';
import ItemSearchProducts from '../ItemSearchProducts/ItemSearchProducts';

const ListSearchProducts = ({ onHandleSelectItem }) => {
  const listSearchProducts = useSelector(getSearchList);
  return (
    <ul className={style.listSearchProducts}>
      {listSearchProducts.map(product => (
        <ItemSearchProducts
          key={product._id}
          isProduct={product}
          handleSelectItem={onHandleSelectItem}
        />
      ))}
    </ul>
  );
};

export default ListSearchProducts;
