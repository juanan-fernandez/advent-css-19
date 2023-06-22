import styles from './Button.module.css';

interface Props {
	children: React.ReactNode;
	disabled?: boolean;
	handleClick?(): void;
}
export default function Button({ children, handleClick, disabled }: Props) {
	return (
		<div className={styles.btn__container}>
			<button
				className={styles.btn}
				onClick={handleClick}
				disabled={disabled ? true : false}
			>
				{children}
			</button>
		</div>
	);
}
