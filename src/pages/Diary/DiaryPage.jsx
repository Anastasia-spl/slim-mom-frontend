import { useEffect } from 'react';
import style from './Diary.module.scss';
import DatePicker from '../../components/DatePicker';
import FormProduct from '../../components/FormProduct';
import ListProducts from '../../components/ListProducts';
import ModalAddProducts from '../../components/ModalAddProducts';
import ButtonAdd from '../../components/ButtonAdd';
import { useDispatch, useSelector } from 'react-redux';
import {
  actions,
  dowloadProducts,
  getStateProducts,
  getLoader,
  getCurrentDate,
  modalAddProduct,
} from '../../redux/products';
import Loader from '../../components/Loader';
import DiaryContainer from '../../components/DiaryContainer';
import RightInfoPanel from '../../components/RightInfoPanel';

const Diary = () => {
  const classNameModal = style.diary__formModal;
  const classNameMobile = style.diary__formMobile;
  const isListProducts = useSelector(getStateProducts);
  const isLoader = useSelector(getLoader);
  const isCurrentDate = useSelector(getCurrentDate);
  const isModalAddProduct = useSelector(modalAddProduct);
  const dispatch = useDispatch();
  const isDate = getDateString(new Date());

  function getDateString(date) {
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const datestring = day + '.' + month + '.' + date.getFullYear();
    return datestring;
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  useEffect(() => {
    isCurrentDate === ''
      ? dispatch(actions.currentDateSuccess(isDate))
      : dispatch(dowloadProducts(isCurrentDate));
  }, [isCurrentDate]);

  const handleToggleModal = () => {
    dispatch(actions.modalAddProductSuccess());
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
          {isCurrentDate === isDate ? (
            <FormProduct
              className={classNameMobile}
              onDateString={getDateString}
            />
          ) : null}
          {isLoader ? (
            <Loader />
          ) : isListProducts.length > 0 ? (
            <ListProducts />
          ) : null}
          <ButtonAdd onHandleToggleModal={handleToggleModal} />
          {isModalAddProduct ? (
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
