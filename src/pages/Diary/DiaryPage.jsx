import { useState, useEffect } from 'react';
import Container from '../../components/Container';
import style from './Diary.module.scss';
import Date from '../../components/Date';
import FormProduct from '../../components/FormProduct';
import ListProducts from '../../components/ListProducts';
import ModalAddProducts from '../../components/ModalAddProducts';
import ButtonAdd from '../../components/ButtonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { dowloadProducts } from '../../redux/products/products-operations';
import { productsSelectors, productsReducer } from '../../redux/products';
import Loader from '../../components/Loader';
import Header from '../../components/Header';

const Diary = () => {
  const [isModal, setIsModal] = useState(false);
  const classNameModal = style.diary__formModal;
  const classNameMobile = style.diary__formMobile;
  const isListProducts = useSelector(productsSelectors.getStateProducts);
  const isLoader = useSelector(productsSelectors.getLoader);
  const isCurrentDate = useSelector(productsSelectors.getCurrentDate);
  const dispatch = useDispatch();

  const getDateString = date => {
    const month = date.getMonth() + 1;
    const value = pad(month);
    const datestring = date.getDate() + '.' + value + '.' + date.getFullYear();
    return datestring;
  };

  const pad = value => {
    return String(value).padStart(2, '0');
  };

  useEffect(() => {
    const isDate = getDateString(isCurrentDate);
    dispatch(productsReducer.actions.currentDateSuccess(isDate));
  }, []);

  useEffect(() => {
    dispatch(dowloadProducts(isCurrentDate));
  }, [isCurrentDate]);

  const handleToggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <Container>
      <Header />
      <div className={style.diary}>
        <Date onDate={getDateString} />
        <FormProduct className={classNameMobile} />
        {isLoader ? (
          <Loader />
        ) : isListProducts.length > 0 ? (
          <ListProducts />
        ) : null}

        <ButtonAdd onHandleToggleModal={handleToggleModal} />
        {isModal ? (
          <ModalAddProducts
            className={classNameModal}
            onHandleToggleModal={handleToggleModal}
          />
        ) : null}
      </div>
    </Container>
  );
};

export default Diary;
