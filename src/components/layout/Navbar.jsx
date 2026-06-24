import React from 'react';
import { Link } from 'react-router-dom';
import { FaBolt } from 'react-icons/fa'; // Icon for logo branding
import '../../styles/variables.css';

const Navbar = () => {
    const navItems = [
        { name: 'Services', path: '/services' },
        { name: 'Shop', path: '/shop' },
        { name: 'Invest', path: '/invest' },
        { name: 'Pros', path: '/pros' },
        { name: 'Online Consulting', path: '/online-consulting' },
        { name: 'Estimator', path: '/estimator' },
    ];

    const styles = {
        header: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '4px solid var(--color-secondary)' // Orange accent
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.5rem',
            fontWeight: '700',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-white)',
            gap: '0.5rem',
        },
        logoIcon: {
            color: 'var(--color-secondary)',
        },
        nav: {
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
        },
        link: {
            color: 'var(--color-white)',
            fontWeight: '700',
            textTransform: 'uppercase',
            border: '2px solid var(--color-white)', // Outlined style
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem',
        },
        emergencyBtn: {
            backgroundColor: '#EF4444',
            color: 'var(--color-white)',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontWeight: '700',
            borderRadius: 'var(--radius-sm)',
            textTransform: 'uppercase',
            fontSize: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            marginLeft: '1rem',
        },
    };

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <Link to="/" style={styles.logo}>
                    <FaBolt style={styles.logoIcon} />
                    ACDC PROS
                </Link>

                <nav style={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            style={styles.link}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'var(--color-white)';
                                e.target.style.color = 'var(--color-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = 'var(--color-white)';
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link to="/emergency" style={styles.emergencyBtn}>
                        24/7 Emergency
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
