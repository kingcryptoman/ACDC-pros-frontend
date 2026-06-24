import React from 'react';
import { FaPhoneAlt, FaExclamationTriangle } from 'react-icons/fa';

const Emergency = () => {
    return (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: '#FEF2F2' }}>
            <FaExclamationTriangle style={{ fontSize: '5rem', color: '#EF4444', marginBottom: '1rem' }} />
            <h1 style={{ color: '#991B1B' }}>24/7 EMERGENCY DISPATCH</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                For immediate assistance with electrical failures, water damage, or storm debris.
            </p>

            <div style={{
                backgroundColor: 'white',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <h2>Call Now for Immediate Dispatch</h2>
                <a href="tel:4042469810" style={{
                    display: 'block',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    padding: '1.5rem',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    margin: '1.5rem 0',
                    textDecoration: 'none'
                }}>
                    <FaPhoneAlt style={{ marginRight: '1rem' }} />
                    (404) 246-9810
                </a>
                <p>Average Response Time: <strong>45 Minutes</strong></p>
            </div>

            <div style={{ maxWidth: '800px', margin: '4rem auto', textAlign: 'left' }}>
                <h3>Covered Emergencies:</h3>
                <ul style={{ lineHeight: '2', fontSize: '1.1rem' }}>
                    <li>🔴 Electrical Outages & Hazardous Wiring</li>
                    <li>🔴 Water Main Breaks & Flooding Mitigation</li>
                    <li>🔴 Storm Damage & Tree Removal</li>
                    <li>🔴 Emergency Tarping & Board-up</li>
                </ul>
            </div>
        </div>
    );
};

export default Emergency;
