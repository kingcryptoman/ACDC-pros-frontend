import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg.png';
import { FaHeadset, FaCalculator, FaUserShield } from 'react-icons/fa';

const Home = () => {
    const styles = {
        hero: {
            backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.7), rgba(10, 25, 47, 0.7)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'var(--color-white)',
            padding: '0 1rem',
        },
        heroContent: {
            maxWidth: '800px',
        },
        title: {
            fontSize: '3.5rem',
            marginBottom: '1rem',
            color: 'var(--color-white)',
            textTransform: 'uppercase',
            lineHeight: '1.2',
        },
        subtitle: {
            fontSize: '1.2rem',
            marginBottom: '2rem',
            color: 'var(--color-bg-light)',
        },
        ctaGroup: {
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        primaryBtn: {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-white)',
            padding: '1rem 2.5rem',
            fontSize: '1.2rem',
            fontWeight: '700',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            textTransform: 'uppercase',
            transition: 'transform 0.2s',
        },
        secondaryBtn: {
            backgroundColor: 'transparent',
            color: 'var(--color-white)',
            padding: '1rem 2.5rem',
            fontSize: '1.2rem',
            fontWeight: '700',
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--color-white)',
            textTransform: 'uppercase',
            transition: 'background-color 0.2s',
        },
        section: {
            padding: '5rem 0',
            textAlign: 'center',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '3rem',
        },
        card: {
            backgroundColor: 'var(--color-white)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'left',
        },
        icon: {
            fontSize: '2.5rem',
            color: 'var(--color-secondary)',
            marginBottom: '1rem',
        }
    };

    return (
        <>
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.title}>Your Project. Done Right.</h1>
                    <p style={styles.subtitle}>Expert Pros, DIY Support, and Smart Tools for every homeowner.</p>
                    <div style={styles.ctaGroup}>
                        <Link to="/pros" style={styles.primaryBtn}>Hire a Pro</Link>
                        <Link to="/online-consulting" style={styles.secondaryBtn}>DIY Support</Link>
                    </div>
                </div>
            </section>

            <section style={styles.section} className="container">
                <h2>Why Choose ACDC PROS?</h2>
                <div style={styles.grid}>
                    <div style={styles.card}>
                        <FaHeadset style={styles.icon} />
                        <h3>Virtual Coaching</h3>
                        <p>Stuck on a DIY project? Video chat with a licensed pro for instant guidance.</p>
                    </div>
                    <div style={styles.card}>
                        <FaCalculator style={styles.icon} />
                        <h3>Smart Estimator</h3>
                        <p>Upload photos and dimensions to get AI-powered project estimates instantly.</p>
                    </div>
                    <div style={styles.card}>
                        <FaUserShield style={styles.icon} />
                        <h3>Verified Pros</h3>
                        <p>Connect with vetted contractors for electric, HVAC, and handyman needs.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
