import Calendar from '../Calendar';
import style from './DatePicker.module.scss';
import { ReactComponent as IconCalendar } from '../../pictures/calendar.svg';

const DatePicker = ({ onDate }) => {
  return (
    <div className={style.diary__date}>
      <label className={style.diary__lableDate}>
        <Calendar getDate={onDate} />
        <div className={style.boxIcon}>
          <IconCalendar className={style.diary__iconDate} />
        </div>
      </label>
    </div>
  );
};

export default DatePicker;
