import styles from '../styles/Header.module.css';
import 'antd/dist/reset.css';
import { Button, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Header({ content, likedNumber, handleSearch }) {
  const [movieSearch, setMovieSearch] = useState('');

  const handleKey = (param) =>
    param === 'Enter' ? handleSearch(movieSearch) : null;
  return (
    <div className={styles.header}>
      <div>
        <img className={styles.images} src='/logo.png' alt='Logo' />
        <img
          className={styles.imagesLetter}
          src='/logoletter.png'
          alt='Letter logo'
        />
      </div>
      <div className={styles.searchDiv}>
        <input
          className={styles.searchInput}
          type='text'
          placeholder='Vous cherchez un film?'
          id='movieSearch'
          onChange={(e) => setMovieSearch(e.target.value)}
          value={movieSearch}
          onKeyDown={(e) => handleKey(e.code)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size='xl'
          style={{ color: '#021334' }}
          onClick={() => handleSearch(movieSearch)}
        />
      </div>
      <div>
        <Popover content={content} title='Mes films ♥' trigger='click'>
          <Button className={styles.buttonStyle} type='primary'>
            ♥ {likedNumber} movie(s)
          </Button>
        </Popover>
      </div>
    </div>
  );
}
