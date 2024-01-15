import styles from '../styles/People.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImagePortrait } from '@fortawesome/free-solid-svg-icons';




function People(props) {
    let picture;

    if(props.profile) {
        picture = `https://image.tmdb.org/t/p/w500/${props.profile}`;
    };

    return (
        <div className={styles.globalDiv}>
            <div className={styles.imgDiv}>
                {props.profile? <img className={styles.img} src={picture} alt={`portrait de ${props.name}`} /> : <FontAwesomeIcon icon={faImagePortrait} size='2xl' style={{color: "#B19FC", height: "100%", width: "80%"}}/> }
            </div>
            <div>
                <h2 className={styles.name}>{props.name}</h2>
                <p>Role : {props.character? props.character: props.job}</p>
            </div>
        </div>

    )
}

export default People;
