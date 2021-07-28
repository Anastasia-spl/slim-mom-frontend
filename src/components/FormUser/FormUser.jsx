import React, { useState, useEffect } from 'react';
import styles from './FormUser.module.scss';
<<<<<<< Updated upstream
import { Formik, Field, Form } from 'formik';
import Modal from '../Modal/Modal';
import products from '../../JsonData/products.json';

export default function FormUser() {
  const [modalActive, setModalActive] = useState(false);
  const toggleModal = () => setModalActive(prevModalActive => !prevModalActive);
=======
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '../../components/Modal/Modal';

const SignupSchema = Yup.object().shape({
  height: Yup.number()
    .min(145, 'Слишком мало...')
    .typeError('Рост должен быть числом')
    .positive()
    .integer('Введите число')
    .max(224, 'Слишком много...')
    .required('Заполните все поля'),
  age: Yup.number()
    .positive()
    .typeError('Возраст должен быть числом')
    .integer()
    .min(6, 'Слишком мало...')
    .max(110, 'Слишком много...')
    .required('Заполните все поля'),
  weight: Yup.number()
    .typeError('Вес должен быть числом')
    .positive()
    .integer()
    .min(35, 'Слишком мало...')
    .max(350, 'Слишком много...')
    .required('Заполните все поля'),
  desiredWeight: Yup.number()
    .typeError('Желаемый вес должен быть числом')
    .positive()
    .integer()
    .min(35, 'Слишком мало...')
    .max(300, 'Слишком много...')
    .required('Заполните все поля'),
});

export default function FormUser() {
  const [modalActive, setModalActive] = useState(false);
>>>>>>> Stashed changes

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      setModalActive(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.header}>
        Просчитай свою суточную норму калорий прямо сейчас
      </h1>
      <Formik
        initialValues={{
          height: '',
          age: '',
          weight: '',
          desiredWeight: '',
        }}
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <label htmlFor="height">
              <Field
                id="height"
                name="height"
                placeholder="Рост *"
                type="text"
                className={styles.input}
              />
            </label>
            <label>
              <Field
                id="age"
                name="age"
                className={styles.input}
                placeholder="Возраст *"
              />
            </label>
            <label>
              <Field
                id="weight"
                name="weight"
                className={styles.input}
                placeholder="Текущий вес *"
              />
            </label>
            <label>
              <Field
                id="desiredWeight"
                name="desiredWeight"
                type="text"
                className={styles.input}
                placeholder="Желаемый вес *"
              />
            </label>
            <label>
              Группа крови *
<<<<<<< Updated upstream
              <Field id="" type="radio" value="1" />
              <Field id="" type="radio" value="2" />
              <Field id="" type="radio" value="3" />
              <Field id="" type="radio" value="4" />
            </label>
            <button type="submit" onClick={toggleModal}>
=======
              <div
                role="group"
                aria-labelledby="bloodGroup"
                className={styles.radiogroup}
              >
                <label className={styles.label}>
                  <Field
                    onChange={handleChange}
                    className={styles.radio}
                    type="radio"
                    name="bloodGroup"
                    value="1"
                    checked={true}
                  />
                  1
                </label>
                <label className={styles.label}>
                  <Field
                    className={styles.radio}
                    type="radio"
                    name="bloodGroup"
                    value="2"
                  />
                  2
                </label>
                <label className={styles.label}>
                  <Field
                    className={styles.radio}
                    type="radio"
                    name="bloodGroup"
                    value="3"
                  />
                  3
                </label>
                <label className={styles.label}>
                  <Field
                    className={styles.radio}
                    type="radio"
                    name="bloodGroup"
                    value="4"
                  />
                  4
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={!isValid || !dirty}
              className={styles.btnSubmit}
              onClick={() => setModalActive(true)}
            >
>>>>>>> Stashed changes
              Похудеть
            </button>
          </Form>
        )}
      </Formik>
      {modalActive && <Modal active={modalActive} setActive={setModalActive} />}
      <form className={styles.formUser}></form>
      {modalActive && (
        <Modal
          products={products}
          active={modalActive}
          setActive={setModalActive}
        />
      )}
    </div>
  );
}
