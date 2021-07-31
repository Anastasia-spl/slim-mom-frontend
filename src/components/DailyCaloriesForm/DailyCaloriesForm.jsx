import styles from './DailyCaloriesForm.module.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import * as Yup from 'yup';
import products from '../../JsonData/products.json';

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

export default function DailyCaloriesForm() {
  const [active, setActive] = useState(1);

  const [modalActive, setModalActive] = useState(false);
  const toggleModal = () => setModalActive(prevModalActive => !prevModalActive);

  function handlRadioChange(event) {
    setActive(event.target.value);
  }

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        setModalActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.header}>
        Просчитай свою суточную норму калорий прямо сейчас
      </h1>
      <Formik
        validationSchema={SignupSchema}
        className={styles.formWrapper}
        initialValues={{
          height: '',
          age: '',
          weight: '',
          desiredWeight: '',
          bloodGroup: '',
        }}
        onSubmit={async values => {
          await localStorage.setItem('user', JSON.stringify(values));
        }}
      >
        {({ values, handleSubmit, isValid, dirty, handleChange }) => (
          <Form className={styles.form} onSubmit={handleSubmit}>
            <label>
              <Field
                value={values.height}
                onChange={handleChange}
                id="height"
                name="height"
                placeholder="Рост *"
                type="text"
                className={styles.input}
              />
              <ErrorMessage name="height">
                {msg => <p className={styles.notification}>{msg}</p>}
              </ErrorMessage>
            </label>

            <label className={styles.age}>
              <Field
                value={values.age}
                onChange={handleChange}
                id="age"
                name="age"
                className={styles.input}
                placeholder="Возраст *"
              />
              <ErrorMessage name="age">
                {msg => <p className={styles.notification}>{msg}</p>}
              </ErrorMessage>
            </label>

            <label className={styles.weight}>
              <Field
                value={values.weight}
                onChange={handleChange}
                id="weight"
                name="weight"
                className={styles.input}
                placeholder="Текущий вес *"
              />
              <ErrorMessage name="weight">
                {msg => <p className={styles.notification}>{msg}</p>}
              </ErrorMessage>
            </label>

            <label>
              <Field
                value={values.desiredWeight}
                onChange={handleChange}
                id="desiredWeight"
                name="desiredWeight"
                type="text"
                className={styles.input}
                placeholder="Желаемый вес *"
              />
              <ErrorMessage name="desiredWeight">
                {msg => <p className={styles.notification}>{msg}</p>}
              </ErrorMessage>
            </label>

            <div
              id="bloodGroup"
              className={styles.label}
              onChange={event => handlRadioChange(event)}
            >
              Группа крови *
              <div
                role="group"
                aria-labelledby="bloodGroup"
                className={styles.radiogroup}
              >
                <label className={styles.label}>
                  <Field
                    className={styles.radio}
                    type="radio"
                    name="bloodGroup"
                    value="1"
                    checked={active == 1}
                  />
                  1
                </label>
                <label className={styles.label}>
                  <Field
                    className={styles.radio}
                    type="radio"
                    name="bloodGroup"
                    value="2"
                    checked={active == 2}
                  />
                  2
                </label>
                <label className={styles.label}>
                  <Field
                    className={styles.radio}
                    type="radio"
                    name="bloodGroup"
                    value="3"
                    checked={active == 3}
                  />
                  3
                </label>
                <label className={styles.label}>
                  <Field
                    className={styles.radio}
                    type="radio"
                    name="bloodGroup"
                    value="4"
                    checked={active == 4}
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
              Похудеть
            </button>
          </Form>
        )}
      </Formik>
      {modalActive && <Modal active={modalActive} setActive={setModalActive} />}
      <form className={styles.formUser}></form>
    </div>
  );
}
