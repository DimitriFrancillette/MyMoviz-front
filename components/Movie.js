import styles from '../styles/Movie.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';

function Movie(props) {
    const [personalNote, setPersonalNote] = useState(0);
    const [watchCount, setWatchCount] = useState(0);
    const [vidColor, setVidColor] = useState("#000000");
    const [heartColor, setHeartColor] = useState("#000000");

    const avgStars = [];
    for (let i = 0; i < 10; i++) {
        if (i < Math.floor(props.voteAverage)) {
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
            props.updateLikedMovies(props.title)
        } else {
            setHeartColor("#000000") /
                props.updateLikedMovies(props.title)
        }
    }

    return (
        <div className={styles.globalDiv}>
            <div className={styles.imgDiv}>
                <Link href={`/details/${props.movieId}`}>
                    <img className={styles.img} src={props.poster} alt={props.title} />
                </Link>
            </div>
            <div>
                <Link href={`/details/${props.movieId}`}>
                    <h2 className={styles.title}>{props.title}</h2>
                </Link>
            </div>
            <div>
                <p className={styles.description}>{props.overview}</p>
            </div>
            <div className={styles.ratingDiv}>
                <div className={styles.rating}>
                    {avgStars}
                </div>
                <div className={styles.votes}>
                    <p>({props.voteCount})</p>
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
        </div>
    );
}

export default Movie;
