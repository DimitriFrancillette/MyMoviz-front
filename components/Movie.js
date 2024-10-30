import styles from '../styles/Movie.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';

function Movie({
  movieId,
  poster,
  title,
  overview,
  voteAverage,
  voteCount,
  updateLikedMovies,
  likedMovies,
}) {
  const [personalNote, setPersonalNote] = useState(0);
  const [watchCount, setWatchCount] = useState(0);

  const avgStars = [];
  for (let i = 0; i < 10; i++) {
    if (i < Math.floor(voteAverage)) {
      avgStars.push(
        <FontAwesomeIcon key={i} icon={faStar} style={{ color: '#f1c40f' }} />
      );
    } else {
      avgStars.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }
  }

  const myStars = [];

  const handleClickStar = (key) => {
    setPersonalNote(key + 1);
  };

  for (let i = 0; i < 10; i++) {
    if (i < personalNote) {
      myStars.push(
        <FontAwesomeIcon
          onClick={() => handleClickStar(i)}
          key={i}
          icon={faStar}
          style={{ color: '#2196f3' }}
        />
      );
    } else {
      myStars.push(
        <FontAwesomeIcon
          onClick={() => handleClickStar(i)}
          key={i}
          icon={faStar}
          style={{ color: '#000000' }}
        />
      );
    }
  }

  const handleClickWatched = () => {
    setWatchCount(watchCount + 1);
  };

  return (
    <div className={styles.globalDiv}>
      <div className={styles.imgDiv}>
        <Link href={`/details/${movieId}`}>
          <img className={styles.img} src={poster} alt={title} />
        </Link>
      </div>
      <div>
        <Link href={`/details/${movieId}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
      </div>
      <div>
        <p className={styles.description}>{overview}</p>
      </div>
      <div className={styles.ratingDiv}>
        <div className={styles.rating}>{avgStars}</div>
        <div className={styles.votes}>
          <p>({voteCount})</p>
        </div>
      </div>
      <div className={styles.ratingDiv}>
        <div className={styles.rating}>{myStars}</div>
        <div className={styles.votes}>
          <p>{personalNote}</p>
        </div>
      </div>
      <div className={styles.ratingDiv}>
        <div className={styles.rating}>
          <FontAwesomeIcon
            onClick={() => handleClickWatched()}
            icon={faVideo}
            style={{ color: `${watchCount > 0 ? '#e74c3c' : '#000000'}` }}
          />
        </div>
        <div className={styles.votes}>
          <p>{watchCount}</p>
        </div>
      </div>
      <div className={styles.ratingDiv}>
        <div className={styles.rating}>
          <FontAwesomeIcon
            onClick={() => updateLikedMovies(title)}
            icon={faHeart}
            style={{
              color: `${likedMovies.includes(title) ? '#e74c3c' : '#000000'}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Movie;
