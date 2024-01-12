import styles from '../styles/Home.module.css';
import Movie from './Movie';
import 'antd/dist/reset.css';
import { Button, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const logoLetterStyle = { 'width': '10rem' };
const buttonStyle = {
  'border-radius': '5px',
  'border-color': 'white',
  'background-color': '#021334',
  'margin': '1rem',
};

function Home() {
  const [apiMovies, setApiMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [movieSearch, setMovieSearch] = useState('');

  // const moviesData = [
  //   { title: 'Forrest Gump', poster: 'forrestgump.jpg', voteAverage: 9.2, voteCount: 22_705, overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case.', key: 1 },
  //   { title: 'The Dark Knight', poster: 'thedarkknight.jpg', voteAverage: 8.5, voteCount: 27_547, overview: 'Batman raises the stakes in his war on crime and sets out to dismantle the remaining criminal organizations that plague the streets.', key: 2 },
  //   { title: 'Your name', poster: 'yourname.jpg', voteAverage: 8.5, voteCount: 8_691, overview: 'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places.', key: 3 },
  //   { title: 'Iron Man', poster: 'ironman.jpg', voteAverage: 7.6, voteCount: 22_7726, overview: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.', key: 4 },
  //   { title: 'Inception', poster: 'inception.jpg', voteAverage: 8.4, voteCount: 31_546, overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.', key: 5 },
  // ];

  useEffect(() => {
    console.log('Let\'s SEE')
    fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(data => {
        setApiMovies(data.movies);
      })
    .catch(err => console.error('error:' + err));
  }, []);

  const updateLikedMovies = (movieTitle) => {
    const isIncluded = likedMovies.includes(movieTitle);
    if (!isIncluded) {
      setLikedMovies([...likedMovies, movieTitle])
    } else {
      setLikedMovies(likedMovies.filter(e => e !== movieTitle))
    }
  }

  const movies = apiMovies.map(data => {
    let shortOverview = data.overview;
    if (data.overview.length > 250) {
      shortOverview = data.overview.slice(0,250) + " ...";
    }
    return <Movie key={data.id} poster={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} title={data.title} overview={shortOverview} voteAverage={data.vote_average} voteCount={data.vote_count} updateLikedMovies={updateLikedMovies} />;
  });

  const content = likedMovies.map(title => {
    return <div className={styles.likedContainer}>
      <p>{title}</p>
      <FontAwesomeIcon onClick={() => updateLikedMovies(title)} icon={faCircleXmark} className={styles.circleX} />
    </div>
  });

  const likedNumber = likedMovies.length;


  const handleSearch = (param) => {
    console.log(param)
  }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <img className={styles.images} src="/logo.png" alt="Logo" />
          <img style={logoLetterStyle} className={styles.images} src="/logoletter.png" alt="Letter logo" />
        </div>
        <div className={styles.searchDiv}>
          <input className={styles.searchInput} type='text' placeholder='Vous cherchez un film?' id="movieSearch" onChange={(e) => setMovieSearch(e.target.value)} value={movieSearch}/>
          <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' style={{color: "#021334",}} onClick={() => handleSearch(movieSearch)}/>
        </div>
        <div>
          <Popover content={content} title="Mes films ♥" trigger="click">
            <Button style={buttonStyle} type="primary">♥ {likedNumber} movie(s)</Button>
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
