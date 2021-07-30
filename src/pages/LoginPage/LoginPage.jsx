// import style from './LoginPage.module.scss';
import LoginForm from '../../components/LoginForm';
import AuthBackground from '../../components/AuthBackground';

const LoginPage = () => {
  return (
    <AuthBackground>
      <LoginForm />
    </AuthBackground>
  );
};

export default LoginPage;
