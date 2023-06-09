import styles from "./Footer.module.css";

const Footer = () => {
    return (
      <footer className={styles['footer-container']}>
        <div className={styles['footer-text-wrapper']}>
          <p className={styles['copyright-text']} >&copy; 2023 Never Settle</p>
        </div>
      </footer>
    );
  }

  export default Footer;