import React from 'react';
import { FaHammer, FaPaintRoller, FaRulerCombined, FaLayerGroup } from 'react-icons/fa';

const HandymanServices = () => {
    const services = [
        { name: 'Deck Repair', icon: <FaHammer />, desc: 'Board replacement, structural reinforcement, and staining.' },
        { name: 'Trim Carpenter', icon: <FaRulerCombined />, desc: 'Custom crown molding, baseboards, and window casings.' },
        { name: 'Drywall Repairs', icon: <FaLayerGroup />, desc: 'Hole patching, texture matching, and finishing.' },
        { name: 'Painting', icon: <FaPaintRoller />, desc: 'Interior/Exterior painting and detailed color consultations.' },
    ];

    const styles = {
        header: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '3rem 1rem',
            textAlign: 'center',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            padding: '3rem 1rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        card: {
            border: '1px solid var(--color-border)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            backgroundColor: 'var(--color-white)',
            transition: 'transform 0.2s',
        },
        icon: {
            fontSize: '3rem',
            color: 'var(--color-secondary)',
            marginBottom: '1rem',
        }
    };

    return (
        <div>
            <div style={styles.header}>
                <h1>Expert Handyman Services</h1>
                <p>Small jobs. Big impact. Done right.</p>
            </div>

            <div style={styles.grid}>
                {services.map((s, i) => (
                    <div key={i} style={styles.card}>
                        <div style={styles.icon}>{s.icon}</div>
                        <h2>{s.name}</h2>
                        <p style={{ marginTop: '0.5rem', color: '#666' }}>{s.desc}</p>
                        <button style={{
                            marginTop: '1.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: 'var(--color-bg-light)',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            Check Availability
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HandymanServices;
