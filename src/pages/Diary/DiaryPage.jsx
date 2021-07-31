import { useState, useEffect } from 'react';
import style from './Diary.module.scss';
import DatePicker from '../../components/DatePicker';
import FormProduct from '../../components/FormProduct';
import ListProducts from '../../components/ListProducts';
import ModalAddProducts from '../../components/ModalAddProducts';
import ButtonAdd from '../../components/ButtonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { dowloadProducts } from '../../redux/products/products-operations';
import { productsSelectors, productsReducer } from '../../redux/products';
import Loader from '../../components/Loader';
import DiaryContainer from '../../components/DiaryContainer';
import RightInfoPanel from '../../components/RightInfoPanel';

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
    const isDate = getDateString(new Date());
    isCurrentDate === ''
      ? dispatch(productsReducer.actions.currentDateSuccess(isDate))
      : dispatch(dowloadProducts(isCurrentDate));
  }, [isCurrentDate]);

  const handleToggleModal = () => {
    setIsModal(!isModal);
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  };

  return (
    <DiaryContainer style={{ padding: 0 }}>
      <div className={style.flexContainer}>
        <div className={style.diary}>
          <DatePicker onDate={getDateString} />
          <FormProduct
            className={classNameMobile}
            onDateString={getDateString}
          />
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
              onDateString={getDateString}
            />
          ) : null}
        </div>
        <RightInfoPanel />
      </div>
    </DiaryContainer>
  );
};

export default Diary;
