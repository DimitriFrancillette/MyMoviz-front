import styles from '../styles/Movie.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faStar } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function Movie(props) {
    const [starBlink, setstarBlink] = useState(false);
    const [personalNote, setPersonalNote] = useState(0);
    const [watchCount, setWatchCount] = useState(0);

    const avgStars = [];

    for (let i = 0; i < 10; i++) {
        if (i < Math.floor(props.voteAverage)) {
            avgStars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#f1c40f" }} />)
        } else {
            avgStars.push(<FontAwesomeIcon key={i} icon={faStar} />)
        }
    }

    const myStars = [];

    const handleClick = (key) => {
        setPersonalNote(key + 1)
    }

    for (let i = 0; i < 10; i++) {
        if (i < personalNote) {
            myStars.push(<FontAwesomeIcon onClick={() => handleClick(i)} key={i} icon={faStar} style={{ color: "#0048ff" }} />)
        } else {
            myStars.push(<FontAwesomeIcon onClick={() => handleClick(i)} key={i} icon={faStar} style={{ color: "#000000" }} />)
        }
    }

    return (
        <div className={styles.globalDiv}>
            <div>
                <img className={styles.img} src={props.poster} alt={props.title} />
            </div>
            <div>
                <h2 className={styles.title}>{props.title}</h2>
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
        </div>
    );
}

export default Movie;
