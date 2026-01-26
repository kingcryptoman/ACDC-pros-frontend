import React from 'react';
import { FaChartLine, FaBuilding } from 'react-icons/fa';

const Invest = () => {
    return (
        <div>
            <div style={{ backgroundColor: '#111827', color: 'white', padding: '5rem 1rem', textAlign: 'center' }}>
                <FaChartLine style={{ fontSize: '4rem', color: '#10B981', marginBottom: '1rem' }} />
                <h1>Invest with Impact</h1>
                <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>High-yield opportunities in Residential Flips & New Construction.</p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div>
                    <h2>Why Invest?</h2>
                    <p style={{ lineHeight: '1.8', color: '#4b5563' }}>
                        ACDC PROS connects capital with vetted construction projects.
                        We manage the entire lifecycle from permit to occupancy, ensuring
                        project deadlines are met and returns are maximized.
                    </p>
                    <ul style={{ marginTop: '1rem', lineHeight: '2' }}>
                        <li>✅ <strong>Transparency:</strong> Real-time project tracking.</li>
                        <li>✅ <strong>Security:</strong> Asset-backed investments.</li>
                        <li>✅ <strong>Experience:</strong> Managed by industry veterans.</li>
                    </ul>
                </div>
                <div style={{ backgroundColor: '#f9fafb', padding: '2rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <h3>Request Investment Packet</h3>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <input type="text" placeholder="Full Name" style={{ padding: '0.8rem' }} />
                        <input type="email" placeholder="Email Address" style={{ padding: '0.8rem' }} />
                        <select style={{ padding: '0.8rem' }}>
                            <option>Accredited Investor</option>
                            <option>Institutional Partner</option>
                            <option>Other</option>
                        </select>
                        <button style={{ backgroundColor: '#10B981', color: 'white', border: 'none', padding: '1rem', fontWeight: 'bold' }}>
                            Get Details
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Invest;
