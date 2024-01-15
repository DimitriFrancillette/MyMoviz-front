import { useRouter } from 'next/router';
import styles from '../styles/MovieDetails.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faVideo, faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import People from './People';



function MovieDetails() {
  const router = useRouter();
  const movieId = router.query.movieId
  const [movieDetails, setMovieDetails] = useState([]);
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

  let producer;
  if (movieDetails.length !== 0) {

    producer = movieDetails.crew.map(data => {
      console.log(data)
      return <People key={data.id} id={data.id} name={data.name} job={data.job} profile={data.profile_path} />
    });
  }

  let cast;
    if (movieDetails.length !== 0) {

      cast = movieDetails.cast.map(data => {
        console.log(data)
        return <People key={data.id} id={data.id} name={data.name} character={data.character} profile={data.profile_path} />
      });
    }
    console.log(cast)


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


  return (
    <div className={styles.globalDiv}>
      <div className={styles.headerDiv}>
        <Link href={`/`}>
          <FontAwesomeIcon icon={faArrowLeft} size='2xl' style={{color: "#FFAD3C", height: "40%", width: "40%"}} />
        </Link>
      </div>
      <div className={styles.detailsDiv}>

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
        <div className={styles.peopleDiv}>
          {producer}
        </div>
        <div className={styles.peopleDiv}>
          {cast}
        </div>
      </div>

    </div>


  );
}

export default MovieDetails;