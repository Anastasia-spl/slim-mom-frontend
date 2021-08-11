/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { createTheme, makeStyles } from '@material-ui/core/styles';
import style from './ModalNewProduct.module.scss';
import { addNewProduct, searchProducts } from '../../redux/products';
import { actions } from '../../redux/products';
import { ReactComponent as CloseModal } from '../../pictures/close.svg';
import { useEffect } from 'react';

const ModalNewProduct = ({ onHandleToggleModal, isNameNewProduct }) => {
  const [nameProduct, setNameProduct] = useState('');
  const [caloriesProduct, setCaloriesProduct] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setNameProduct(isNameNewProduct);
  }, []);

  const handleAddNewProduct = e => {
    e.preventDefault();
    const newProduc = {
      title: nameProduct,
      calories: caloriesProduct,
    };
    dispatch(addNewProduct(newProduc));
    setTimeout(() => dispatch(searchProducts(nameProduct, 1, 7)), 1000);

    dispatch(actions.modalAddNewProductSuccess());
  };

  const handleChangeNameProduct = e => {
    setNameProduct(e.target.value);
  };
  const handleChangeCaloriesProduct = e => {
    setCaloriesProduct(e.target.value);
  };

  const handleCloseModal = () => {
    dispatch(actions.modalAddNewProductSuccess());
  };

  return (
    <div className={style.overlay}>
      <div className={style.modalNewProduct}>
        <form onSubmit={handleAddNewProduct}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nameProduct"
            label="Наименование"
            name="nameProduct"
            value={nameProduct}
            autoComplete="off"
            onChange={handleChangeNameProduct}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="caloriesProduct"
            label="Калорийность продукта на 100гр"
            name="caloriesProduct"
            value={caloriesProduct}
            onChange={handleChangeCaloriesProduct}
            // pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          />
          <Button
            className={style.btnNewProduct}
            type="submit"
            fullWidth
            variant="contained"
          >
            Добавить продукт
          </Button>
        </form>
        <button
          className={style.closeModal}
          type="button"
          onClick={handleCloseModal}
        >
          <CloseModal className={style.iconCloseModal} />
        </button>
      </div>
    </div>
  );
};

export default ModalNewProduct;
