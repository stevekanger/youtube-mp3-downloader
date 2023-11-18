import styles from '../styles/PageContainer.module.css'

type Props = {
  children: React.ReactNode
}

export default function PageContainer({ children }: Props) {
  return <div className={styles.pageContainer}>{children}</div>
}
