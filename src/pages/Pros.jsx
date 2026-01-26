import React from 'react';

const Pros = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem', textAlign: 'center' }}>
            <h1>Join the ACDC PROS Network</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', margin: '1rem 0 3rem' }}>
                Get leads, insurance support, and back-office management.
            </p>

            <div style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '3rem',
                borderRadius: 'var(--radius-md)'
            }}>
                <h2>Partnership Benefits</h2>
                <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '2rem auto', lineHeight: '2' }}>
                    <li>✅ Active Lead Generation</li>
                    <li>✅ Pre-vetted Project Opportunities</li>
                    <li>✅ Back-office & Permit Support</li>
                    <li>✅ Fast Pay Schedules</li>
                </ul>
                <button style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: 'white',
                    padding: '1rem 3rem',
                    border: 'none',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginTop: '1rem'
                }}>
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default Pros;
