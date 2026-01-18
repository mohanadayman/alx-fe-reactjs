import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <h1 style={styles.logo}>My Company</h1>
        <ul style={styles.navList}>
          <li>
            <Link to="/" style={styles.link}>Home</Link>
          </li>
          <li>
            <Link to="/about" style={styles.link}>About</Link>
          </li>
          <li>
            <Link to="/services" style={styles.link}>Services</Link>
          </li>
          <li>
            <Link to="/contact" style={styles.link}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '1rem 0',
    marginBottom: '2rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingX: '1rem',
  },
  logo: {
    color: 'white',
    margin: 0,
    fontSize: '1.5rem',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
    margin: 0,
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
};

export default Navbar;
