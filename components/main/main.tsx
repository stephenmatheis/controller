import classNames from 'classnames';
import { Sidebar } from '@/components/sidebar';
import styles from './main.module.scss';

type Props = { children: React.ReactNode; columns?: number };

export function Main({ children, columns = 2 }: Props) {
    return (
        <main
            className={classNames(styles.main, {
                [styles['col-2']]: columns === 2,
                [styles['col-3']]: columns === 3,
            })}
        >
            <section className={styles.left}>
                <Sidebar />
            </section>
            {columns === 2 && (
                <section className={styles.right}>{children}</section>
            )}
            {columns === 3 && (
                <>
                    <section className={styles.middle}>{children}</section>
                    {/* Intentionally empty to center `section.middle`. */}
                    <section className={styles.right} />
                </>
            )}
        </main>
    );
}
