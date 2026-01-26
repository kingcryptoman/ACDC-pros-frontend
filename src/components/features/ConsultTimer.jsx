import React, { useState, useEffect } from 'react';
import { FaClock, FaStopCircle } from 'react-icons/fa';

const ConsultTimer = ({ isActive, onStop }) => {
    const [seconds, setSeconds] = useState(0);
    const RATE_PER_MINUTE = 2.00;

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const calculateCost = () => {
        return ((seconds / 60) * RATE_PER_MINUTE).toFixed(2);
    };

    return (
        <div style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            marginTop: '1rem',
            maxWidth: '400px',
            margin: '1rem auto'
        }}>
            <h3 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>Live Session</h3>
            <div style={{ fontSize: '3rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
                {formatTime(seconds)}
            </div>
            <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
                Current Cost: ${calculateCost()}
            </div>
            <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '1rem' }}>Rate: $2.00 / min</p>

            {isActive && (
                <button
                    onClick={onStop}
                    style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        margin: '0 auto',
                        fontSize: '1rem'
                    }}
                >
                    <FaStopCircle /> End Session
                </button>
            )}
        </div>
    );
};

export default ConsultTimer;
