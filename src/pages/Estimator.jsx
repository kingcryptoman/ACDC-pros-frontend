import React, { useState } from 'react';
import { FaCalculator, FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';

const Estimator = () => {
    const [step, setStep] = useState(1);
    const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
    const [estimate, setEstimate] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        setStep(2);
        // Simulate AI Processing
        setTimeout(() => {
            setEstimate({
                min: 1200,
                max: 1800,
                materials: ['Drywall Sheets (12)', 'Paint (4gal)', 'Joint Compound'],
                laborHours: 16
            });
            setStep(3);
        }, 2000);
    };

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '3rem 1rem',
        },
        card: {
            backgroundColor: 'var(--color-white)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
        inputGroup: {
            marginBottom: '1.5rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
            color: 'var(--color-primary)',
        },
        input: {
            width: '100%',
            padding: '0.8rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            fontSize: '1rem',
        },
        uploadBox: {
            border: '2px dashed var(--color-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: 'var(--color-bg-light)',
            marginBottom: '2rem',
        },
        btn: {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-white)',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1.2rem',
            width: '100%',
            textTransform: 'uppercase',
        },
        resultBox: {
            textAlign: 'center',
            padding: '2rem',
        },
        priceRange: {
            fontSize: '3rem',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'bold',
            margin: '1rem 0',
        }
    };

    return (
        <div style={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1><FaCalculator style={{ marginRight: '10px' }} /> Smart Estimator</h1>
                <p>AI-Powered Quote Generator</p>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <form onSubmit={handleCalculate}>
                        <h3>Step 1: Room Dimensions</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Length (ft)</label>
                                <input
                                    style={styles.input}
                                    type="number"
                                    required
                                    value={dimensions.length}
                                    onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Width (ft)</label>
                                <input
                                    style={styles.input}
                                    type="number"
                                    required
                                    value={dimensions.width}
                                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Height (ft)</label>
                                <input
                                    style={styles.input}
                                    type="number"
                                    required
                                    value={dimensions.height}
                                    onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                                />
                            </div>
                        </div>

                        <h3>Step 2: Upload Photos</h3>
                        <div style={styles.uploadBox}>
                            <FaCloudUploadAlt style={{ fontSize: '3rem', color: 'var(--color-secondary)' }} />
                            <p>Drag & Drop 4K Photos or Videos here</p>
                            <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Supports JPG, PNG, MP4</p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                            <input type="checkbox" id="ai-enhance" />
                            <label htmlFor="ai-enhance">Use Room Enhancer App (3 Free Tries remaining)</label>
                        </div>

                        <button type="submit" style={styles.btn}>Generate Estimate</button>
                    </form>
                )}

                {step === 2 && (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <div className="loader" style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚙️</div>
                        <h3>Processing Room Data...</h3>
                        <p>Analyzing dimensions and identifying materials.</p>
                    </div>
                )}

                {step === 3 && estimate && (
                    <div style={styles.resultBox}>
                        <FaCheckCircle style={{ fontSize: '4rem', color: '#22c55e', marginBottom: '1rem' }} />
                        <h2>Estimate Ready!</h2>
                        <p>Based on {dimensions.length}x{dimensions.width} room size.</p>

                        <div style={styles.priceRange}>
                            ${estimate.min} - ${estimate.max}
                        </div>

                        <div style={{ textAlign: 'left', backgroundColor: 'var(--color-bg-light)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', margin: '1rem 0' }}>
                            <strong>Detected Materials Needed:</strong>
                            <ul style={{ paddingLeft: '20px', marginTop: '0.5rem' }}>
                                {estimate.materials.map((m, i) => <li key={i}>{m}</li>)}
                            </ul>
                        </div>

                        <button style={styles.btn} onClick={() => window.location.href = '/pros'}>
                            Find a Pro to Build This
                        </button>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>*Estimate is for labor + materials. Actual quotes may vary.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Estimator;
