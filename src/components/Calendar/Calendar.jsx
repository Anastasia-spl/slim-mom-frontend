import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './Calendar.module.scss';
import { productsReducer } from '../../redux/products';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Calendar = ({ onDate }) => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleChangeDate = date => {
    setStartDate(date);
    const dateString = onDate(startDate);
    dispatch(productsReducer.actions.currentDateSuccess(dateString));
  };

  return (
    <DatePicker
      className={style.calendar}
      selected={startDate}
      dateFormat="dd.MM.yyyy"
      onChange={date => handleChangeDate(date)}
      // minDate={new Date()}
    ></DatePicker>
  );
};

export default Calendar;
