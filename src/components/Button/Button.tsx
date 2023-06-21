import styles from './Button.module.css';

interface Props {
	children: React.ReactNode;
	handleClick?(): void;
}
export default function Button({ children, handleClick }: Props) {
	return (
		<div className={styles.btn__container}>
			<button className={styles.btn} onClick={handleClick}>
				{children}
			</button>
		</div>
	);
}
