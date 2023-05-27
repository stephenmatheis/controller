import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './header.module.scss';
// FIXME: Replace name and title
import LinkCtr from '@/components/link-ctr/link-ctr';

export default function Header({
    loading,
    setLoading,
    speed,
    showLinkBackground,
}) {
    // State
    const [backgroundColor, setBackgroundColor] = useState(false);
    const [transition, setTransition] = useState(false);

    // Name and Title
    const firstName = 'Stephen';
    const lastName = 'Matheis';
    const frontEnd = 'Front-end';
    const software = 'Software';
    const engineer = 'Engineer';

    // Container refs
    const overlay = useRef();
    const ctr = useRef();

    // From refs
    const fromFirstName = useRef();
    const fromLastName = useRef();
    const fromFrontEnd = useRef();
    const fromSoftware = useRef();
    const fromEngineer = useRef();

    // To refs
    const toFirstName = useRef();
    const toLastName = useRef();
    const toFrontEnd = useRef();
    const toSoftware = useRef();
    const toEngineer = useRef();

    useEffect(() => {
        if (!transition) {
            return;
        }

        if (!overlay.current || !ctr.current) {
            return;
        }

        run();

        async function run() {
            // Fade overlay background
            setBackgroundColor(true);

            // Set ctr height
            const { height, width } = ctr.current.getBoundingClientRect();

            ctr.current.style.height = `${height}px`;
            ctr.current.style.width = `${width}px`;

            // Animate name and title
            const duration = speed * 7;

            await Promise.all([
                anim(fromFirstName, toFirstName, duration),
                anim(fromLastName, toLastName, duration),
                anim(fromFrontEnd, toFrontEnd, duration),
                anim(fromSoftware, toSoftware, duration),
                anim(fromEngineer, toEngineer, duration),
            ]);

            // Loading is complete after animation
            setLoading(false);
        }

        async function anim(from, to, duration) {
            const fromName = from.current;
            const {
                color: fromColor,
                fontSize,
                height,
                marginBottom,
            } = getComputedStyle(fromName);
            const { color: toColor } = getComputedStyle(to.current);
            const fromNamePos = fromName.getBoundingClientRect();
            const toNamePos = to.current.getBoundingClientRect();

            fromName.style.height = `${height}px`;
            fromName.style.position = 'absolute';
            fromName.style.top = `${fromNamePos.top}px`;
            fromName.style.left = `${fromNamePos.left}px`;

            const animateName = fromName.animate(
                [
                    {
                        color: fromColor,
                        top: `${fromNamePos.top}px`,
                        left: `${fromNamePos.left}px`,
                        fontSize,
                        marginBottom,
                    },
                    {
                        color: toColor,
                        top: `${toNamePos.top}px`,
                        left: `${toNamePos.left}px`,
                        fontSize: '12px',
                        marginBottom: '0px',
                    },
                ],
                {
                    duration: duration || 0,
                    easing: 'ease-in-out',
                    fill: 'forwards',
                }
            );

            const isNameFinished = await animateName.finished;

            if (isNameFinished.playState === 'finished') {
                return 'done';
            }
        }
    }, [loading, setLoading, speed, transition]);

    return (
        <>
            <header className={styles['header']}>
                <Link href="/" aria-label="Stephen Matheis' personal website">
                    <div
                        className={classNames(styles['profile'], {
                            [styles['loading']]: loading,
                            [styles['link-background']]: showLinkBackground,
                        })}
                    >
                        <span ref={toFirstName} className={styles['name']}>
                            {firstName}
                        </span>
                        <span className={styles['name']}> </span>
                        <span ref={toLastName} className={styles['name']}>
                            {lastName}
                        </span>
                        <span> </span>
                        <span className={styles['nowrap']}>
                            <span ref={toFrontEnd} className={styles['title']}>
                                {frontEnd}
                            </span>
                            <span className={styles['title']}> </span>
                            <span ref={toSoftware} className={styles['title']}>
                                {software}
                            </span>
                            <span className={styles['title']}> </span>
                            <span ref={toEngineer} className={styles['title']}>
                                {engineer}
                            </span>
                        </span>
                    </div>
                </Link>
            </header>
            {loading && (
                <div
                    ref={overlay}
                    className={classNames(styles['loading-overlay'], {
                        [styles['background-color']]: backgroundColor,
                    })}
                >
                    {/* Name and title */}
                    <div
                        ref={ctr}
                        className={styles['ctr']}
                        onClick={() => {
                            setTransition(true);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        {
                            <>
                                <span
                                    ref={fromFirstName}
                                    className={styles['name']}
                                >
                                    {firstName}
                                </span>
                                <span
                                    ref={fromLastName}
                                    className={styles['name']}
                                >
                                    {lastName}
                                </span>
                                <span
                                    ref={fromFrontEnd}
                                    className={styles['title']}
                                >
                                    {frontEnd}
                                </span>
                                <span
                                    ref={fromSoftware}
                                    className={styles['title']}
                                >
                                    {software}
                                </span>
                                <span
                                    ref={fromEngineer}
                                    className={styles['title']}
                                >
                                    {engineer}
                                </span>
                            </>
                        }
                    </div>

                    {/* Nav */}
                    <div className={styles['routes']}>
                        <Link className={styles['link']} href="/resume">
                            Resume
                        </Link>
                        <Link className={styles['link']} href="/Projects">
                            Projects
                        </Link>
                        <Link className={styles['link']} href="/posts">
                            Posts
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
