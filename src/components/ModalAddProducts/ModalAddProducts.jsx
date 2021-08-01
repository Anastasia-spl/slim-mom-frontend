import FormProduct from '../FormProduct';
import style from './ModalAddProducts.module.scss';

const ModalAddProducts = ({ className, onHandleToggleModal, onDateString }) => {
  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      onHandleToggleModal();
    }
  };
  return (
    <div className={style.overlay} onClick={handleBackdrop}>
      <div className={style.modal}>
        <FormProduct
          className={className}
          handleToggleModal={onHandleToggleModal}
          onDateString={onDateString}
        />
      </div>
    </div>
  );
};

export default ModalAddProducts;
