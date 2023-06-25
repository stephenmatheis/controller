import classNames from 'classnames';
import { LinkCtr } from '@/components/link-ctr';
import { ImgCtr } from '@/components/img-ctr';
import styles from './project.module.scss';

type ImageProps = {
    src: string;
    width?: number;
    height?: number;
};

export function Project({ name, link, description, image, displayImages }) {
    const { src }: ImageProps = image;

    return (
        <div
            key={name}
            className={classNames(styles['project-ctr'], {
                [styles['display-images']]: displayImages,
            })}
        >
            <LinkCtr href={link} newTab>
                {name}
            </LinkCtr>
            <div className={styles['description-ctr']}>
                {displayImages && src && (
                    <ImgCtr
                        link={link}
                        description={description}
                        image={image}
                    />
                )}
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
}
