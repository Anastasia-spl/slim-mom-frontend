import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { authOperations } from '../../redux/auth';
import styles from './LoginForm.module.scss';
import eye from '../../assets/pictures/eye.svg';
import eyeCrossed from '../../assets/pictures/eye-crossed.svg';
import * as yup from 'yup';
import routes from '../../routes';

import GoogleAuthBtn from '../GoogleAuth';

const LoginForm = () => {
  const dispatch = useDispatch();

  const onLogin = credentials => dispatch(authOperations.logIn(credentials));

  const [cross, setCross] = useState(true);

  const handleClick = () => {
    setCross(!cross);
  };

  const validationSchema = yup.object().shape({
    login: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
    password: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
  });

  const signup = routes.find(route => route.label === 'Регистрация');

  return (
    <div className={styles.loginisation}>
      <Formik
        initialValues={{ login: '', password: '' }}
        validateOnBlur
        onSubmit={(values, { resetForm }) => {
          onLogin(values);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Вход</h2>
            <div className={styles.input__form}>
              <label className={styles.label}>
                Логин*
                <input
                  className={
                    errors.login && touched.login
                      ? styles.input__error
                      : styles.input
                  }
                  type="text"
                  name="login"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                />
              </label>
              {errors.login && touched.login && (
                <p className={styles.notification}>{errors.login}</p>
              )}
            </div>
            <div className={styles.input__form}>
              <label className={styles.label}>
                Пароль*
                <input
                  className={
                    errors.password && touched.password
                      ? styles.input__error
                      : styles.input
                  }
                  type={cross ? 'password' : 'text'}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <button
                  type="button"
                  className={styles.btn__eye}
                  onClick={handleClick}
                >
                  {cross ? (
                    <img className={styles.img} src={eyeCrossed} alt="Eye" />
                  ) : (
                    <img className={styles.img} src={eye} alt="Eye" />
                  )}
                </button>
              </label>
              {errors.password && touched.password && (
                <p className={styles.notification}>{errors.password}</p>
              )}
            </div>
            <div className={styles.buttons}>
              <button
                className={styles.btn__login}
                type="submit"
                disabled={!isValid || !dirty}
                onClick={handleSubmit}
              >
                Вход
              </button>
              <NavLink className={styles.btn__register} to={`${signup.path}`}>
                {signup.label}
              </NavLink>
            </div>

            <GoogleAuthBtn />
          </form>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;
