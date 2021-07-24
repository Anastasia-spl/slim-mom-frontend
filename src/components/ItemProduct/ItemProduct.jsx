import style from './Style.module.scss';

const ItemProduct = () => {
  return (
    <li className={style.diary__item}>
      <p className={style.diary__itemNameProduct}>Баклажан</p>
      <p className={style.diary__itemVolumProduct}>100 г</p>
      <p className={style.diary__itemCcalProduct}>300 ккал</p>
      <button className={style.diary__btnDelProduct} type="button">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8333 1.3415L10.6583 0.166504L5.99996 4.82484L1.34163 0.166504L0.166626 1.3415L4.82496 5.99984L0.166626 10.6582L1.34163 11.8332L5.99996 7.17484L10.6583 11.8332L11.8333 10.6582L7.17496 5.99984L11.8333 1.3415Z"
            fill="black"
          />
        </svg>
      </button>
    </li>
  );
};

export default ItemProduct;
