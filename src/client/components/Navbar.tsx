import styles from '../styles/Navbar.module.css'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <SearchBar />
    </div>
  )
}
