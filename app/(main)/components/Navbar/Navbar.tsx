'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.scss';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo}>The Movie Finder</div>
        
        <div className={styles.navbar__links}>
          <Link
            href="/movies"
            className={`${styles.navbar__link} ${isActive('/movies') ? styles.active : ''}`}
          >
            Movies
          </Link>
          <Link
            href="/tv-shows"
            className={`${styles.navbar__link} ${isActive('/tv-shows') ? styles.active : ''}`}
          >
            TV shows
          </Link>
          <Link
            href="/actors"
            className={`${styles.navbar__link} ${isActive('/actors') ? styles.active : ''}`}
          >
            Actors
          </Link>
        </div>

        <button className={styles.mobileMenuButton} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={styles.mobileSearch}>
          <FaSearch />
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <Link
          href="/movies"
          className={`${styles.mobileLink} ${isActive('/movies') ? styles.active : ''}`}
          onClick={toggleMenu}
        >
          Movies
        </Link>
        <Link
          href="/tv-shows"
          className={`${styles.mobileLink} ${isActive('/tv-shows') ? styles.active : ''}`}
          onClick={toggleMenu}
        >
          TV shows
        </Link>
        <Link
          href="/actors"
          className={`${styles.mobileLink} ${isActive('/actors') ? styles.active : ''}`}
          onClick={toggleMenu}
        >
          Actors
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;