import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import styles from "./index.module.css";

// App Store Badge Component
function AppStoreBadges() {
  return (
    <div className={styles.appStoreBadges}>
      <a
        href="https://play.google.com/store/apps/details?id=com.vyral.app"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.storeBadge}
      >
        <img
          src="/img/badges/google-play-badge.svg"
          alt="Get it on Google Play"
          className={styles.storeBadgeImage}
        />
      </a>
      <a
        href="https://apps.apple.com/app/vyral/id123456789"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.storeBadge}
      >
        <img
          src="/img/badges/app-store-badge.svg"
          alt="Download on the App Store"
          className={styles.storeBadgeImage}
        />
      </a>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className={styles.heroBackground}>
        <div className={styles.heroGradient}></div>
        <div className={styles.heroPattern}></div>
      </div>

      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeIcon}>✨</span>
              <span>Now Available</span>
            </div>

            <h1 className={styles.heroTitle}>
              Social Media
              <br />
              <span className={styles.heroGradientText}>
                Built For You, Not Against You
              </span>
            </h1>

            <p className={styles.heroDescription}>
              Own your content. Control your data. Earn real rewards. Join the
              platform that actually respects you.
            </p>

            <AppStoreBadges />

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNumber}>500+</div>
                <div className={styles.heroStatLabel}>Free VCoins</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNumber}>E2E</div>
                <div className={styles.heroStatLabel}>Encrypted</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNumber}>0%</div>
                <div className={styles.heroStatLabel}>Data Selling</div>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.phoneContainer}>
              <div className={styles.phoneFrame}>
                <img
                  src="/img/mockups/app-screenshot-1.png"
                  alt="VYRAL App Feed"
                  className={styles.phoneScreenshot}
                />
              </div>

              {/* Floating Elements */}
              <div
                className={`${styles.floatingElement} ${styles.floatingElement1}`}
              >
                <div className={styles.floatingCard}>
                  <div className={styles.floatingIcon}>💎</div>
                  <div className={styles.floatingContent}>
                    <div className={styles.floatingTitle}>+250 VCoins</div>
                    <div className={styles.floatingSubtitle}>Tip received</div>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.floatingElement} ${styles.floatingElement2}`}
              >
                <div className={styles.floatingCard}>
                  <div className={styles.floatingIcon}>🔥</div>
                  <div className={styles.floatingContent}>
                    <div className={styles.floatingTitle}>Trending</div>
                    <div className={styles.floatingSubtitle}>Your post</div>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.floatingElement} ${styles.floatingElement3}`}
              >
                <div className={styles.floatingCard}>
                  <div className={styles.floatingIcon}>👥</div>
                  <div className={styles.floatingContent}>
                    <div className={styles.floatingTitle}>+1.2K</div>
                    <div className={styles.floatingSubtitle}>New followers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heroWave}>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </header>
  );
}

function ProblemsSection() {
  return (
    <section className={styles.problemsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Social Media is <span className={styles.textDanger}>Broken</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Big Tech profits while you get exploited. It's time for change.
          </p>
        </div>

        <div className={styles.problemsGrid}>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>🚫</div>
            <h3>Your Data, Their Billions</h3>
            <p>
              Platforms make billions selling your personal information to
              advertisers. You get nothing.
            </p>
          </div>

          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>🎭</div>
            <h3>Algorithmic Manipulation</h3>
            <p>
              Feeds optimized for engagement and addiction, not your wellbeing
              or interests.
            </p>
          </div>

          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>💸</div>
            <h3>Creators Exploited</h3>
            <p>
              Platforms take 30-50% cuts and can demonetize you overnight
              without explanation.
            </p>
          </div>

          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>🔒</div>
            <h3>Zero Privacy</h3>
            <p>
              Every click, message, and like tracked, analyzed, and monetized
              without your consent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

<br></br>;

function SolutionSection() {
  return (
    <section className={styles.solutionSection}>
      <div className="container">
        <div className={styles.solutionContent}>
          <div className={styles.solutionVisual}>
            <div className={styles.comparisonCard}>
              <div className={styles.oldWay}>
                <div className={styles.comparisonHeader}>
                  <span className={styles.comparisonIcon}>❌</span>
                  <h3>Traditional Social</h3>
                </div>
                <ul className={styles.comparisonList}>
                  <li>Platform owns your content</li>
                  <li>Your data is sold</li>
                  <li>Algorithms control reach</li>
                  <li>High fees (30-50%)</li>
                  <li>No transparency</li>
                  <li>You are the product</li>
                </ul>
              </div>

              <div className={styles.newWay}>
                <div className={styles.comparisonHeader}>
                  <span className={styles.comparisonIcon}>✓</span>
                  <h3>VYRAL</h3>
                </div>
                <ul className={styles.comparisonList}>
                  <li>You own your content</li>
                  <li>Your data is private</li>
                  <li>You control your feed</li>
                  <li>Low fees (5-20%)</li>
                  <li>Complete transparency</li>
                  <li>You are the customer</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.solutionText}>
            <h2 className={styles.sectionTitle}>
              The <span className={styles.textGradient}>VYRAL</span> Difference
            </h2>
            <p className={styles.solutionDescription}>
              We're not just another social platform. We're building the future
              of social media—one that puts you first, not advertisers.
            </p>

            <div className={styles.solutionFeatures}>
              <div className={styles.solutionFeature}>
                <div className={styles.featureIconBox}>👑</div>
                <div>
                  <h4>True Ownership</h4>
                  <p>
                    Your content, your rules. Export, delete, or move it
                    anytime.
                  </p>
                </div>
              </div>

              <div className={styles.solutionFeature}>
                <div className={styles.featureIconBox}>💰</div>
                <div>
                  <h4>Fair Earnings</h4>
                  <p>
                    Keep 80-95% of what you earn. No hidden fees or sudden cuts.
                  </p>
                </div>
              </div>

              <div className={styles.solutionFeature}>
                <div className={styles.featureIconBox}>🔐</div>
                <div>
                  <h4>Real Privacy</h4>
                  <p>
                    End-to-end encryption. We literally can't read your
                    messages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VCoinSection() {
  return (
    <section className={styles.vcoinSection}>
      <div className="container">
        <div className={styles.vcoinContent}>
          <div className={styles.vcoinText}>
            <h2 className={styles.sectionTitle}>
              Meet <span className={styles.textGradient}>VCoin</span>
            </h2>
            <p className={styles.vcoinDescription}>
              The currency that powers VYRAL. Earn it by creating content,
              spending it on what you love. Built on Solana for speed and low
              fees.
            </p>

            <div className={styles.vcoinFeaturesList}>
              <div className={styles.vcoinFeature}>
                <span className={styles.vcoinCheck}>✓</span>
                <span>Earn rewards for great content</span>
              </div>
              <div className={styles.vcoinFeature}>
                <span className={styles.vcoinCheck}>✓</span>
                <span>Tip creators directly (80% goes to them)</span>
              </div>
              <div className={styles.vcoinFeature}>
                <span className={styles.vcoinCheck}>✓</span>
                <span>Buy & sell in the marketplace</span>
              </div>
              <div className={styles.vcoinFeature}>
                <span className={styles.vcoinCheck}>✓</span>
                <span>Withdraw to your wallet anytime</span>
              </div>
              <div className={styles.vcoinFeature}>
                <span className={styles.vcoinCheck}>✓</span>
                <span>Trade on DEXs (coming soon)</span>
              </div>
            </div>

            <Link
              to="/docs/whitepaper/abstract"
              className={clsx("button button--lg", styles.vcoinButton)}
            >
              Learn About VCoin
            </Link>
          </div>

          <div className={styles.vcoinVisual}>
            <div className={styles.coinContainer}>
              <div className={styles.coinGlow}></div>
              <img
                src="/img/vcoin-3d.png"
                alt="VCoin"
                className={styles.coinImage}
              />
            </div>

            <div className={styles.vcoinStats}>
              <div className={styles.vcoinStat}>
                <div className={styles.vcoinStatNumber}>10B</div>
                <div className={styles.vcoinStatLabel}>Fixed Supply</div>
              </div>
              <div className={styles.vcoinStat}>
                <div className={styles.vcoinStatNumber}>50%</div>
                <div className={styles.vcoinStatLabel}>For Users</div>
              </div>
              <div className={styles.vcoinStat}>
                <div className={styles.vcoinStatNumber}>1%</div>
                <div className={styles.vcoinStatLabel}>Burned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreatorsSection() {
  return (
    <section className={styles.creatorsSection}>
      <div className="container">
        <div className={styles.creatorsContent}>
          <div className={styles.creatorsVisual}>
            <div className={styles.earningsCard}>
              <div className={styles.earningsHeader}>
                <h4>Your Earnings</h4>
                <span className={styles.earningsMonth}>This Month</span>
              </div>

              <div className={styles.earningsAmount}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>3,847</span>
              </div>

              <div className={styles.earningsBreakdown}>
                <div className={styles.breakdownItem}>
                  <span className={styles.breakdownLabel}>Tips</span>
                  <div className={styles.breakdownBar}>
                    <div
                      className={styles.breakdownFill}
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <span className={styles.breakdownAmount}>$1,731</span>
                </div>

                <div className={styles.breakdownItem}>
                  <span className={styles.breakdownLabel}>Subscriptions</span>
                  <div className={styles.breakdownBar}>
                    <div
                      className={styles.breakdownFill}
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                  <span className={styles.breakdownAmount}>$1,346</span>
                </div>

                <div className={styles.breakdownItem}>
                  <span className={styles.breakdownLabel}>Marketplace</span>
                  <div className={styles.breakdownBar}>
                    <div
                      className={styles.breakdownFill}
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                  <span className={styles.breakdownAmount}>$770</span>
                </div>
              </div>

              <div className={styles.earningsGrowth}>
                <span className={styles.growthBadge}>↑ 23%</span>
                <span className={styles.growthText}>vs last month</span>
              </div>
            </div>
          </div>

          <div className={styles.creatorsText}>
            <h2 className={styles.sectionTitle}>
              Built for <span className={styles.textGradient}>Creators</span>
            </h2>
            <p className={styles.creatorsDescription}>
              Stop giving away half your earnings. VYRAL gives you the tools and
              freedom to monetize your passion on your terms.
            </p>

            <div className={styles.creatorsBenefits}>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>💸</div>
                <div>
                  <h4>Keep 80-95%</h4>
                  <p>Lowest fees in the industry. Your work, your money.</p>
                </div>
              </div>

              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>📊</div>
                <div>
                  <h4>Powerful Analytics</h4>
                  <p>Understand your audience with detailed insights.</p>
                </div>
              </div>

              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>🎯</div>
                <div>
                  <h4>Multiple Revenue Streams</h4>
                  <p>Tips, subscriptions, marketplace—diversify your income.</p>
                </div>
              </div>

              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>🛡️</div>
                <div>
                  <h4>No Sudden Demonetization</h4>
                  <p>Clear policies, fair enforcement, appeal process.</p>
                </div>
              </div>
            </div>

            <div className={styles.creatorsActions}>
              <AppStoreBadges />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Loved by Creators</h2>
          <p className={styles.sectionSubtitle}>
            Join thousands who've already made the switch
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "I made more in my first month on VYRAL than I did in a year on
                Instagram. The creator economy here actually works."
              </p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div>
                <div className={styles.authorName}>Sarah Chen</div>
                <div className={styles.authorTitle}>
                  Digital Artist • 50K followers
                </div>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "Finally, a platform that doesn't manipulate my feed. I see what
                I want to see, when I want to see it. Revolutionary."
              </p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div>
                <div className={styles.authorName}>Marcus Rivera</div>
                <div className={styles.authorTitle}>
                  Tech Reviewer • 120K followers
                </div>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "The fact that my messages are actually encrypted and they can't
                read them is huge. Privacy that actually means something."
              </p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div>
                <div className={styles.authorName}>Priya Patel</div>
                <div className={styles.authorTitle}>
                  Privacy Advocate • 80K followers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Join the Revolution?</h2>
          <p className={styles.ctaSubtitle}>
            Download VYRAL today and get 500 free VCoins to start your journey.
          </p>
          <div className="container">
            <AppStoreBadges />
          </div>
          <div className={styles.ctaFeatures}>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaCheck}>✓</span>
              <span>Free to download & use</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaCheck}>✓</span>
              <span>500 VCoins welcome bonus</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaCheck}>✓</span>
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Social Media Reimagined"
      description="Own your content. Control your data. Earn real rewards. VYRAL is social media done right."
    >
      <HomepageHeader />
      <main>
        <ProblemsSection />
        <HomepageFeatures />
        <SolutionSection />
        <VCoinSection />
        <CreatorsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </Layout>
  );
}
