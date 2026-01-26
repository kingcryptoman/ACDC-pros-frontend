import React from 'react';
import { FaHardHat, FaFileContract, FaTree, FaWater } from 'react-icons/fa';

const Services = () => {
    const serviceList = [
        {
            title: 'Pre-Construction & Permits',
            icon: <FaFileContract />,
            desc: 'Detailed estimates for banks/insurance, permit expediting, and occupancy management.'
        },
        {
            title: 'Site Management',
            icon: <FaHardHat />,
            desc: 'Turn-key project management, site supervision, and subcontractor coordination.'
        },
        {
            title: 'Disaster Relief & Mitigation',
            icon: <FaWater />,
            desc: 'Water cleanup, debris removal, and emergency tarping services.'
        },
        {
            title: 'Landscaping & Tree Removal',
            icon: <FaTree />,
            desc: 'Professional tree removal and lot clearing services.'
        }
    ];

    const styles = {
        header: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '4rem 1rem',
            textAlign: 'center',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            padding: '4rem 1rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        card: {
            backgroundColor: 'var(--color-white)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
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
                <h1>Contracting Services</h1>
                <p>From Permits to Occupancy. We manage it all.</p>
            </div>

            <div style={styles.grid}>
                {serviceList.map((s, i) => (
                    <div key={i} style={styles.card}>
                        <div style={styles.icon}>{s.icon}</div>
                        <h2>{s.title}</h2>
                        <p style={{ marginTop: '1rem', color: '#666' }}>{s.desc}</p>
                        <button style={{
                            marginTop: '1.5rem',
                            padding: '0.75rem 1.5rem',
                            border: '2px solid var(--color-primary)',
                            color: 'var(--color-primary)',
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            Request Quote
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f3f4f6' }}>
                <h2>Looking for Handyman Services?</h2>
                <p style={{ marginBottom: '1rem' }}>Deck repair, painting, drywall, and trim work.</p>
                <button onClick={() => window.location.href = '/handyman'} style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: 'white',
                    padding: '1rem 2rem',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                }}>
                    View Handyman Services
                </button>
            </div>
        </div>
    );
};

export default Services;
