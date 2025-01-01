// import { Header } from '../components/shared/Header/Header';
import { Insta } from '../components/shared/Insta/Insta';
import { Footer } from '../components/shared/Footer/Footer';
import Header from '../components/shared/Header/Header';

export const Layout = ({ children }) => {
  return (
    <>
      <header className='header'>
        <Header/>
      </header>
      <main className='content'>
        {children}
        <Insta />
      </main>
      <footer className='footer'>
        <Footer />
      </footer>
    </>
  );
};
