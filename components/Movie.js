import styles from '../styles/Movie.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function Movie(props) {
    const stars = [];

    for (let i = 0; i < 10; i++) {
        if (i< Math.floor(props.voteAverage)) {
            stars.push(<FontAwesomeIcon icon={faStar} style={{color: "#f1c40f"}}/>)
        } else {
            stars.push(<FontAwesomeIcon icon={faStar} />)
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
                    {stars}
                </div>
                <div className={styles.votes}>
                    <p>{props.voteCount}</p>
                </div>
                
            </div>
        </div>
    );
}

export default Movie;
