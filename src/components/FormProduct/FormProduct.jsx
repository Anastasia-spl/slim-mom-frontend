import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getCurrentDate, modalAddProduct } from '../../redux/products';
import {
  addProducts,
  searchProducts,
} from '../../redux/products/products-operations';
import style from './FormProduct.module.scss';
import ListSearchProducts from '../ListSearchProducts';
import { useEffect } from 'react';

const FormProduct = ({ className, handleToggleModal, onDateString }) => {
  const [titleProduct, setTitleProduct] = useState('');
  const [weightProduct, setWeightProduct] = useState('');
  const [caloriesProduct, setCaloriesProduct] = useState(Number());
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [isDisableInput, setDisableInput] = useState(false);
  const [clientWidth, setclientWidth] = useState(
    document.documentElement.clientWidth,
  );
  const currentDate = useSelector(getCurrentDate);
  const isModalAddProduct = useSelector(modalAddProduct);
  const dispatch = useDispatch();

  const handleResize = () => {
    const width = document.documentElement.clientWidth;
    setclientWidth(width);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDate = onDateString(new Date());

  useEffect(() => {
    currentDate !== isDate ? setDisableInput(true) : setDisableInput(false);
  }, [currentDate]);

  const handleAddProduct = event => {
    event.preventDefault();
    const newProduct = {
      title: titleProduct,
      weight: weightProduct,
      calories: (caloriesProduct * weightProduct) / 100,
      date: currentDate,
    };
    dispatch(addProducts(newProduct));
    setTitleProduct('');
    setWeightProduct('');
    setIsDisabledBtn(true);

    if (isModalAddProduct) {
      handleToggleModal();
    }
  };

  const handleChangeNameProduct = event => {
    event.preventDefault();
    let value = event.target.value;
    if (value.length > 3) {
      dispatch(searchProducts(value));
    }
    if (value === '') {
      dispatch(actions.searchProductsSuccess([]));
    }

    setTitleProduct(event.target.value);
  };

  const handleChangeVolumProduct = event => {
    event.preventDefault();
    setWeightProduct(event.target.value);
  };

  const handelSelectItem = isProduct => {
    setTitleProduct(isProduct.title.ru);
    setIsDisabledBtn(false);
    setCaloriesProduct(isProduct.calories);
    dispatch(actions.searchProductsSuccess([]));
  };

  return (
    <form className={className} onSubmit={handleAddProduct}>
      <input
        className={style.diary__nameProduct}
        name={titleProduct}
        value={titleProduct}
        label="Name"
        autoFocus
        required
        placeholder={
          isDisableInput
            ? `Выберете дату ${isDate}`
            : 'Введите название продукта'
        }
        onChange={handleChangeNameProduct}
        disabled={isDisableInput}
      />
      <input
        className={style.diary__volumProduct}
        name={weightProduct}
        value={weightProduct}
        placeholder="Граммы"
        required
        onChange={handleChangeVolumProduct}
        disabled={isDisableInput}
      />
      <button
        className={style.diary__btnAddProduct}
        type="submit"
        disabled={isDisabledBtn}
      >
        {clientWidth < 768 ? 'Добавить' : '+'}
      </button>
      <ListSearchProducts onHandleSelectItem={handelSelectItem} />
    </form>
  );
};

export default FormProduct;
