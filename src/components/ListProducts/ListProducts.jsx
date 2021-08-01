import ItemProduct from '../ItemProduct';
import { getStateProducts } from '../../redux/products';
import style from './ListProduct.module.scss';
import { useSelector } from 'react-redux';

const ListProducts = () => {
  const listProducts = useSelector(getStateProducts);
  return (
    <ul className={style.diary__listProducts}>
      {listProducts.map(product => (
        <ItemProduct key={product._id} isProduct={product} />
      ))}
    </ul>
  );
};

export default ListProducts;
