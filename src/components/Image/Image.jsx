import styles from './Image.module.css'
export default function Image({ image, onClick }) {
  return (
    <div
      onClick={onClick}
      className={styles.container}
    >
      <img className={styles.image} src={image.url}  alt={image.title} />
    </div>
  );
}
