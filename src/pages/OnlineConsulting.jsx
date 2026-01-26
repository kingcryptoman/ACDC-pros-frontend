import React, { useState } from 'react';
import { FaVideo, FaUpload, FaTools } from 'react-icons/fa';
import ConsultTimer from '../components/features/ConsultTimer';
import heroBg from '../assets/hero-bg.png'; // Reusing hero for consistency or we can use another image if provided

const OnlineConsulting = () => {
    const [isSessionActive, setIsSessionActive] = useState(false);

    const startSession = () => {
        setIsSessionActive(true);
        // In a real app, this would trigger the video call API
        alert('Connecting to a Senior Consultant...');
    };

    const stopSession = () => {
        const confirmEnd = window.confirm("End the session?");
        if (confirmEnd) {
            setIsSessionActive(false);
            alert('Session Ended. Invoice generated.');
        }
    };

    const styles = {
        header: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '4rem 1rem',
            textAlign: 'center',
        },
        section: {
            padding: '4rem 1rem',
            maxWidth: '1000px',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
        },
        card: {
            backgroundColor: 'var(--color-white)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        icon: {
            fontSize: '3rem',
            color: 'var(--color-secondary)',
            marginBottom: '1rem',
            marginInline: 'auto'
        },
        btnPrimary: {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-white)',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1.1rem',
            marginTop: '1rem',
            width: '100%',
        },
        btnOutline: {
            backgroundColor: 'transparent',
            color: 'var(--color-primary)',
            border: '2px solid var(--color-primary)',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1.1rem',
            marginTop: '1rem',
            width: '100%',
        }
    };

    return (
        <div>
            <div style={styles.header}>
                <h1>Online Services</h1>
                <p>Professional support, right when you need it.</p>
            </div>

            <div style={styles.section}>
                {isSessionActive ? (
                    <ConsultTimer isActive={isSessionActive} onStop={stopSession} />
                ) : (
                    <div style={styles.grid}>
                        {/* Live Coaching Card */}
                        <div style={styles.card}>
                            <div>
                                <FaVideo style={styles.icon} />
                                <h2>Live Coaching</h2>
                                <p style={{ margin: '1rem 0', color: '#666' }}>
                                    Video chat with a Senior Consultant (25+ years exp).
                                    Perfect for troubleshooting or active project guidance.
                                </p>
                                <h3 style={{ color: 'var(--color-primary)' }}>$2.00 / min</h3>
                            </div>
                            <button style={styles.btnPrimary} onClick={startSession}>
                                Start Live Session
                            </button>
                        </div>

                        {/* On-Demand Support Card */}
                        <div style={styles.card}>
                            <div>
                                <FaUpload style={styles.icon} />
                                <h2>On-Demand Support</h2>
                                <p style={{ margin: '1rem 0', color: '#666' }}>
                                    Upload 4K photos or videos of your problem.
                                    A pro will review and send a detailed video solution within 24 hours.
                                </p>
                                <h3 style={{ color: 'var(--color-primary)' }}>$25.00 / ticket</h3>
                            </div>
                            <button style={styles.btnOutline}>
                                Submit Request
                            </button>
                        </div>

                        {/* Smart Estimator Card */}
                        <div style={styles.card}>
                            <div>
                                <FaTools style={styles.icon} />
                                <h2>Smart Estimator</h2>
                                <p style={{ margin: '1rem 0', color: '#666' }}>
                                    Using our AI Room Enhancer app? Upload your dimensions here for a verified quote.
                                </p>
                                <h3 style={{ color: 'var(--color-primary)' }}>Free (3 tries)</h3>
                            </div>
                            <button style={styles.btnOutline} onClick={() => window.location.href = '/estimator'}>
                                Go to Estimator
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnlineConsulting;
