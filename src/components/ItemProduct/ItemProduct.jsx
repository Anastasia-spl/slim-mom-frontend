import { useDispatch } from 'react-redux';
import { deleteProducts } from '../../redux/products/products-operations';
import { ReactComponent as DeleteProduct } from '../../pictures/close.svg';
import style from './ItemProduct.module.scss';

const ItemProduct = ({ isProduct: { _id, title, weight, calories } }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProducts(_id));
  };

  return (
    <li className={style.diary__item}>
      <p className={style.diary__itemNameProduct}>{title}</p>
      <p className={style.diary__itemVolumProduct}>{`${weight} г`}</p>
      <p className={style.diary__itemCcalProduct}>{`${calories} ккал`}</p>
      <button
        className={style.diary__btnDelProduct}
        type="button"
        onClick={handleDelete}
      >
        <DeleteProduct className={style.iconDelProduct} />
      </button>
    </li>
  );
};

export default ItemProduct;
