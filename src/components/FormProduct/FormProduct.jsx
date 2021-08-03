import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import style from './FormProduct.module.scss';
import ListSearchProducts from '../ListSearchProducts';
import { ReactComponent as IconClearInput } from '../../pictures/close.svg';
import {
  actions,
  getCurrentDate,
  modalAddProduct,
  addProducts,
  searchProducts,
} from '../../redux/products';

const FormProduct = ({ className, handleToggleModal, onDateString }) => {
  const [titleProduct, setTitleProduct] = useState('');
  const [weightProduct, setWeightProduct] = useState('');
  const [caloriesProduct, setCaloriesProduct] = useState(Number());
  const [page, setPage] = useState(1);
  const [limit] = useState(7);
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [isDisableInput, setDisableInput] = useState(false);
  const [clientWidth, setclientWidth] = useState(
    document.documentElement.clientWidth,
  );
  const currentDate = useSelector(getCurrentDate);
  const isDate = onDateString(new Date());
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

  function isFunctionDebonce(value, page, limit) {
    dispatch(searchProducts(value, page, limit));
  }

  const debounceLoadData = useCallback(debounce(isFunctionDebonce, 2000), []);

  const handleChangeNameProduct = event => {
    event.preventDefault();
    setTitleProduct(event.target.value);
    let query = event.target.value;

    if (query === '' && query.length < 1) {
      dispatch(actions.searchProductsSuccess([]));
    }

    if (query.length > 1) {
      debounceLoadData(query, page, limit);
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
    setPage(1);
    dispatch(actions.searchProductsSuccess([]));
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
    const isPage = page + 1;
    dispatch(actions.searchProductsSuccess([]));
    dispatch(searchProducts(titleProduct, isPage, limit));
  };

  const handleClearInput = () => {
    setTitleProduct('');
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
      <ListSearchProducts
        isPage={page}
        onHandleSelectItem={handelSelectItem}
        onHandleLoadMore={handleLoadMore}
      />
      {titleProduct.length >= 1 ? (
        <button className={style.btnClearInput} onClick={handleClearInput}>
          <IconClearInput className={style.iconClearInput} />
        </button>
      ) : null}
    </form>
  );
};

export default FormProduct;
