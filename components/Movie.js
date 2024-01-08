import styles from '../styles/Movie.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function Movie() {
    return (
        <div className={styles.globalDiv}>
            <div>
                <img className={styles.img} src="/poster.jpg" alt="Poster" />
            </div>
            <div>
                <h2 className={styles.title}>Movie</h2>
            </div>
            <div>
                <p className={styles.description}>Description</p>
            </div>
            <div className={styles.ratingDiv}>
                <div className={styles.rating}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                </div>
                <div className={styles.votes}>
                    <p>(vote count)</p>
                </div>
                
            </div>
        </div>
    );
}

export default Movie;
