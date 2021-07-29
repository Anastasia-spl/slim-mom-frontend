import Container from '../components/Container';
import Nav from '../components/Nav';
import Header from '../components/Header';
import HomePageBackground from '../components/HomePageBackground';
import DailyCaloriesForm from '../components/DailyCaloriesForm';

export default function HomePage() {
  return (
    <HomePageBackground>
      <Header goBack={false} />
      <Container>
        <DailyCaloriesForm />
      </Container>
    </HomePageBackground>
  );
}
