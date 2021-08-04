import { useDispatch } from 'react-redux';
import { actions } from '../../redux/products';
import style from './Notification.module.scss';

const Notification = ({ onHandleCloseBotification }) => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(actions.modalAddNewProductSuccess());
    dispatch(actions.notificationAddNewProductSuccess());
  };

  return (
    <div className={style.overlay}>
      <div className={style.notification}>
        <div>
          <p className={style.notification__text}>
            Продукт не найден. Добавим?
          </p>
        </div>
        <div className={style.notification__boxBtn}>
          <button
            className={style.notification__btn}
            type="button"
            onClick={handleOpenModal}
          >
            Да
          </button>
          <button
            className={style.notification__btn}
            type="button"
            onClick={onHandleCloseBotification}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
