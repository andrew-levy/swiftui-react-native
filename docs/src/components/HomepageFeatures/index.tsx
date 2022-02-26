import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};


const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    image: '/img/undraw_mobile_development.svg',
    description: (
      <>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti nam laborum, ipsum autem alias illo! Explicabo doloribus sapiente perspiciatis, sunt tempore quas iste repudiandae.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    image: '/img/undraw_progressive_app.svg',
    description: (
      <>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim eius cupiditate sint iure ratione cumque, aliquid iusto sit ad qui nemo blanditiis asperiores autem.
      </>
    ),
  },
  {
    title: 'Powered by React Native',
    image: '/img/undraw_mobile_prototyping.svg',
    description: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nulla aspernatur cupiditate, perspiciatis debitis asperiores dolore, eum esse mollitia ut?
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
