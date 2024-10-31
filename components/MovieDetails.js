import { useRouter } from 'next/router';
import styles from '../styles/MovieDetails.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import People from './People';
import 'antd/dist/reset.css';
import Header from './Header';

function MovieDetails() {
  const router = useRouter();
  let movieId = router.query.movieId;
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    if (movieId === undefined) {
      movieId = 49046;
    }
    fetch(`https://dim-movies-back.vercel.app/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      })
      .catch((err) => console.error('error:' + err));
  }, []);

  let director;
  if (movieDetails.length !== 0) {
    director = movieDetails.crew.map((data) => {
      return (
        <People
          key={data.id}
          id={data.id}
          name={data.name}
          job={data.job}
          profile={data.profile_path}
        />
      );
    });
  }

  let cast;
  if (movieDetails.length !== 0) {
    cast = movieDetails.cast.map((data) => {
      return (
        <People
          key={data.id}
          id={data.id}
          name={data.name}
          character={data.character}
          profile={data.profile_path}
        />
      );
    });
  }

  const avgStars = [];
  for (let i = 0; i < 10; i++) {
    if (i < Math.floor(movieDetails.vote_average)) {
      avgStars.push(
        <FontAwesomeIcon key={i} icon={faStar} style={{ color: '#f1c40f' }} />
      );
    } else {
      avgStars.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }
  }

  let moviePoster;
  if (movieDetails.poster) {
    moviePoster = `https://image.tmdb.org/t/p/w500/${movieDetails.poster}`;
  }

  return (
    <>
      <Header />
      <div className={styles.detailsDiv}>
        <section className={styles.topSection}>
          <Link className={styles.backlink} href={`/`}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ color: '#FFAD3C', height: '38px', width: '38px' }}
            />
          </Link>
          <div className={styles.imgDiv}>
            <img
              className={styles.img}
              src={moviePoster}
              alt={movieDetails.title}
            />
          </div>
        </section>
        <section>
          <div>
            <h2 className={styles.title}>{movieDetails.title}</h2>
            <p>Date de sortie : {movieDetails.release}</p>
            <p>Durée : {movieDetails.runtime} minutes</p>
          </div>
          <div>
            <p className={styles.description}>{movieDetails.overview}</p>
          </div>
          <div className={styles.ratingDiv}>
            <div className={styles.rating}>{avgStars}</div>
            <div className={styles.votes}>
              <p>({movieDetails.vote_count})</p>
            </div>
          </div>
        </section>
        <section>
          <h3>Réalisateur</h3>
          <div className={styles.peopleDiv}>{director}</div>
          <h3>Casting</h3>
          <div className={styles.peopleDiv}>{cast}</div>
        </section>
      </div>
    </>
  );
}

export default MovieDetails;
