import styles from '../styles/Home.module.css';
import Movie from './Movie';
import 'antd/dist/reset.css';
import { Button, Popover } from 'antd';

const logoLetterStyle = { 'width': '10rem' };
const buttonStyle = {
  'border-radius': '5px',
  'border-color': 'white',
  'background-color': '#021334',
  'margin': '1rem',
};
const content = (
  <div>
    <p>Movie 1</p>
    <p>Movie 2</p>
  </div>
);

function Home() {

  const movies = [];

  for (let i = 0; i < 10; i++) {
    movies.push(<Movie />);
  }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <img className={styles.images} src="/logo.png" alt="Logo" />
          <img style={logoLetterStyle} className={styles.images} src="/logoletter.png" alt="Letter logo" />
        </div>
        <div>
          <Popover content={content} title="Mes films ♥" trigger="click">
            <Button style={buttonStyle} type="primary">♥ 4 movie(s)</Button>
          </Popover>
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          Last releases
        </h1>
        <main className={styles.main}>
          {movies}
        </main>
      </div>


    </div>
  );
}

export default Home;
