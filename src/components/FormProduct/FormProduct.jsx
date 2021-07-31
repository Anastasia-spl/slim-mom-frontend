import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsReducer, productsSelectors } from '../../redux/products';
import {
  addProducts,
  searchProducts,
} from '../../redux/products/products-operations';
import style from './FormProduct.module.scss';
import ListSearchProducts from '../ListSearchProducts';
import { useEffect } from 'react';

const FormProduct = ({ className, onHandleToggleModal, onDateString }) => {
  const [titleProduct, setTitleProduct] = useState('');
  const [weightProduct, setWeightProduct] = useState('');
  const [caloriesProduct, setCaloriesProduct] = useState(Number());
  const currentDate = useSelector(productsSelectors.getCurrentDate);
  const dispatch = useDispatch();

  const isModal = onHandleToggleModal ? true : false;
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [isDisableInput, setDisableInput] = useState(false);

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

    if (isModal) {
      onHandleToggleModal();
    }
  };

  const handleChangeNameProduct = event => {
    event.preventDefault();
    let value = event.target.value;
    if (value !== '') {
      dispatch(searchProducts(value));
    }
    if (value === '') {
      dispatch(productsReducer.actions.searchProductsSuccess([]));
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
    dispatch(productsReducer.actions.searchProductsSuccess([]));
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
        {document.documentElement.clientWidth < 768 ? 'Добавить' : '+'}
      </button>
      <ListSearchProducts onHandleSelectItem={handelSelectItem} />
    </form>
  );
};

export default FormProduct;
