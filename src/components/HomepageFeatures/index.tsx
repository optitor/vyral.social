import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  icon: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "True Ownership",
    icon: "👑",
    description: (
      <>
        Your content belongs to you. Export it, delete it, or move it anywhere.
        No platform lock-in, ever.
      </>
    ),
  },
  {
    title: "Fair Rewards",
    icon: "💰",
    description: (
      <>
        Earn VCoins for creating great content. Keep 80-95% of what you make. No
        hidden fees or surprise cuts.
      </>
    ),
  },
  {
    title: "End-to-End Encryption",
    icon: "🔐",
    description: (
      <>
        Military-grade encryption for your messages. Not even we can read them.
        Privacy that's real, not just promised.
      </>
    ),
  },
  {
    title: "Built-In Marketplace",
    icon: "🛍️",
    description: (
      <>
        Sell directly to your community. Low 5% fees, instant payments, built-in
        buyer protection.
      </>
    ),
  },
  {
    title: "You Control Your Feed",
    icon: "🎯",
    description: (
      <>
        Chronological or recommended—your choice. No shadow banning, no
        manipulation, full transparency.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4 margin-bottom--lg")}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>Everything You Need</h2>
          <p className={styles.featuresSubtitle}>
            All the features you love, none of the exploitation
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
