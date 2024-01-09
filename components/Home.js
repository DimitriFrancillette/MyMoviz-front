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
  const moviesData = [
    { title: 'Forrest Gump', poster: 'forrestgump.jpg', voteAverage: 9.2, voteCount: 22_705, overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case.', key:1 },
    { title: 'The Dark Knight', poster: 'thedarkknight.jpg', voteAverage: 8.5, voteCount: 27_547, overview: 'Batman raises the stakes in his war on crime and sets out to dismantle the remaining criminal organizations that plague the streets.', key:2 },
    { title: 'Your name', poster: 'yourname.jpg', voteAverage: 8.5, voteCount: 8_691, overview: 'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places.', key:3 },
    { title: 'Iron Man', poster: 'ironman.jpg', voteAverage: 7.6, voteCount: 22_7726, overview: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.', key:4 },
    { title: 'Inception', poster: 'inception.jpg', voteAverage: 8.4, voteCount: 31_546, overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.', key:5 },
  ];

  const movies = moviesData.map(data => {
    return <Movie key={data.key} poster={data.poster} title={data.title} overview={data.overview} voteAverage={data.voteAverage} voteCount={data.voteCount} />;
  });

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
