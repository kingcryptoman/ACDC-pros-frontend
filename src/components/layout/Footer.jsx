import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const styles = {
        footer: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '4rem 0 2rem',
            marginTop: 'auto',
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        },
        heading: {
            color: 'var(--color-secondary)',
            fontSize: '1.2rem',
            marginBottom: '0.5rem',
        },
        link: {
            opacity: 0.8,
            transition: 'opacity 0.2s',
            fontSize: '0.9rem',
        },
        socials: {
            display: 'flex',
            gap: '1rem',
            fontSize: '1.5rem',
            marginTop: '1rem',
        },
        copyright: {
            textAlign: 'center',
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.8rem',
            opacity: 0.6,
        }
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.column}>
                    <h3 style={styles.heading}>ACDC PROS</h3>
                    <p>Trust, Power, & Precision.</p>
                    <p>Connecting homeowners with expert trades and DIY support.</p>
                    <div style={styles.socials}>
                        <FaFacebook />
                        <FaInstagram />
                        <FaLinkedin />
                    </div>
                </div>

                <div style={styles.column}>
                    <h3 style={styles.heading}>Services</h3>
                    <a style={styles.link} href="/services">Electrical</a>
                    <a style={styles.link} href="/services">HVAC</a>
                    <a style={styles.link} href="/handyman">Handyman Services</a>
                    <a style={styles.link} href="/emergency">24/7 Emergency</a>
                </div>

                <div style={styles.column}>
                    <h3 style={styles.heading}>Marketplace</h3>
                    <a style={styles.link} href="/shop">Digital Guides</a>
                    <a style={styles.link} href="#">Home Depot Affiliate</a>
                    <a style={styles.link} href="#">Lowe's Affiliate</a>
                </div>

                <div style={styles.column}>
                    <h3 style={styles.heading}>Partners</h3>
                    <a style={styles.link} href="/pros">Join as a Pro</a>
                    <a style={styles.link} href="/invest">Invest with Us</a>
                </div>
            </div>

            <div style={styles.copyright}>
                &copy; {new Date().getFullYear()} ACDC PROS. All rights reserved.
                <br />
                <span style={{ fontSize: '0.7em' }}>Disclaimer: This site contains affiliate links. We may earn a commission from qualifying purchases.</span>
            </div>
        </footer>
    );
};

export default Footer;
