import { useRouter } from 'next/router';
import styles from '../styles/MovieDetails.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faVideo, faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import People from './People';
import 'antd/dist/reset.css';
import { Button, Popover } from 'antd';

const logoLetterStyle = { 'width': '10rem' };
const buttonStyle = {
  'border-radius': '5px',
  'border-color': 'white',
  'background-color': '#021334',
  'margin': '1rem',
};

function MovieDetails() {
  const router = useRouter();
  const movieId = router.query.movieId
  const [movieDetails, setMovieDetails] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [personalNote, setPersonalNote] = useState(0);
  const [watchCount, setWatchCount] = useState(0);
  const [vidColor, setVidColor] = useState("#000000");
  const [heartColor, setHeartColor] = useState("#000000");

  useEffect(() => {
    fetch(`http://localhost:3000/movie/${movieId}`)
      .then(response => response.json())
      .then(data => {
        setMovieDetails(data);
      })
      .catch(err => console.error('error:' + err));
  }, []);

  let director;
  if (movieDetails.length !== 0) {

    director = movieDetails.crew.map(data => {
      return <People key={data.id} id={data.id} name={data.name} job={data.job} profile={data.profile_path} />
    });
  }

  let cast;
  if (movieDetails.length !== 0) {

    cast = movieDetails.cast.map(data => {
      return <People key={data.id} id={data.id} name={data.name} character={data.character} profile={data.profile_path} />
    });
  }


  const avgStars = [];
  for (let i = 0; i < 10; i++) {
    if (i < Math.floor(movieDetails.vote_average)) {
      avgStars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#f1c40f" }} />)
    } else {
      avgStars.push(<FontAwesomeIcon key={i} icon={faStar} />)
    }
  }

  const myStars = [];

  const handleClickStar = (key) => {
    setPersonalNote(key + 1)
  }

  for (let i = 0; i < 10; i++) {
    if (i < personalNote) {
      myStars.push(<FontAwesomeIcon onClick={() => handleClickStar(i)} key={i} icon={faStar} style={{ color: "#2196f3" }} />)
    } else {
      myStars.push(<FontAwesomeIcon onClick={() => handleClickStar(i)} key={i} icon={faStar} style={{ color: "#000000" }} />)
    }
  }

  const handleClickWatched = () => {
    setWatchCount(watchCount + 1);
    setVidColor("#e74c3c")
  }

  const handleClickLiked = () => {
    if (heartColor === "#000000") {
      setHeartColor("#e74c3c")
      props.updateLikedMovies(movieDetails.title)
    } else {
      setHeartColor("#000000") /
        props.updateLikedMovies(movieDetails.title)
    }
  }

  let moviePoster;
  if (movieDetails.poster) {
    moviePoster = `https://image.tmdb.org/t/p/w500/${movieDetails.poster}`;
  }

  const content = likedMovies.map(title => {
    return <div className={styles.likedContainer}>
      <p>{title}</p>
      <FontAwesomeIcon onClick={() => updateLikedMovies(title)} icon={faCircleXmark} className={styles.circleX} />
    </div>
  });

  const likedNumber = likedMovies.length;


  return (
    <div className={styles.globalDiv}>
      <div className={styles.header}>
        <div>
          <Link href={`/`}>
            <img className={styles.images} src="/logo.png" alt="Logo" />
            <img style={logoLetterStyle} className={styles.images} src="/logoletter.png" alt="Letter logo" />
          </Link>

        </div>
        <div>
          <Popover content={content} title="Mes films ♥" trigger="click">
            <Button style={buttonStyle} type="primary">♥ {likedNumber} movie(s)</Button>
          </Popover>
        </div>
      </div>
      <div className={styles.detailsDiv}>
        <Link className={styles.backlink} href={`/`}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#FFAD3C", height: "5%", width: "5%" }} />
        </Link>
        <div className={styles.imgDiv}>
          <img className={styles.img} src={moviePoster} alt={movieDetails.title} />
        </div>
        <div>
          <h2 className={styles.title}>{movieDetails.title}</h2>
          <p>Date de sortie : {movieDetails.release}</p>
          <p>Durée : {movieDetails.runtime} minutes</p>
        </div>
        <div>
          <p className={styles.description}>{movieDetails.overview}</p>
        </div>
        <div className={styles.ratingDiv}>
          <div className={styles.rating}>
            {avgStars}
          </div>
          <div className={styles.votes}>
            <p>({movieDetails.vote_count})</p>
          </div>
        </div>
        <div className={styles.ratingDiv}>
          <div className={styles.rating}>
            {myStars}
          </div>
          <div className={styles.votes}>
            <p>{personalNote}</p>
          </div>
        </div>
        <div className={styles.ratingDiv}>
          <div className={styles.rating}>
            <FontAwesomeIcon onClick={() => handleClickWatched()} icon={faVideo} style={{ color: vidColor }} />
          </div>
          <div className={styles.votes}>
            <p>{watchCount}</p>
          </div>
        </div>
        <div className={styles.ratingDiv}>
          <div className={styles.rating}>
            <FontAwesomeIcon onClick={() => handleClickLiked()} icon={faHeart} style={{ color: heartColor }} />
          </div>
        </div>
        <h3>Director</h3>
        <div className={styles.peopleDiv}>
          {director}
        </div>
        <h3>Main Cast</h3>
        <div className={styles.peopleDiv}>
          {cast}
        </div>
      </div>

    </div>


  );
}

export default MovieDetails;