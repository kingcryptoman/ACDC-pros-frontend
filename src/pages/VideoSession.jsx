import React, { useState } from 'react';
import { FaVideo, FaClock, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

const VideoSession = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        topic: ''
    });

    const pricingTiers = [
        {
            duration: '15',
            price: '35',
            description: 'Quick question or single issue review'
        },
        {
            duration: '30',
            price: '60',
            description: 'Standard consultation for project planning'
        },
        {
            duration: '60',
            price: '100',
            description: 'Extended session for complex projects'
        }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Session Request Submitted!\n\nWe'll contact you at ${formData.email} to confirm your ${formData.preferredDate} ${formData.preferredTime} session.`);
        setShowForm(false);
        setFormData({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '', topic: '' });
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
        introText: {
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            color: 'var(--color-text-dark)',
            fontSize: '1.1rem',
            lineHeight: '1.8',
        },
        pricingGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
        },
        pricingCard: {
            backgroundColor: 'var(--color-white)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '2px solid var(--color-border)',
            transition: 'transform 0.2s, box-shadow 0.2s',
        },
        pricingHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            color: 'var(--color-primary)',
        },
        duration: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-heading)',
        },
        durationUnit: {
            fontSize: '1.2rem',
            color: '#666',
        },
        price: {
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'var(--color-secondary)',
            fontFamily: 'var(--font-heading)',
        },
        priceUnit: {
            fontSize: '1rem',
            color: '#666',
        },
        description: {
            marginTop: '1rem',
            color: '#666',
        },
        features: {
            marginTop: '1.5rem',
            textAlign: 'left',
        },
        featureItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem',
            color: 'var(--color-text-dark)',
        },
        btnPrimary: {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-white)',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            width: '100%',
            marginTop: '1.5rem',
            textTransform: 'uppercase',
        },
        btnOutline: {
            backgroundColor: 'transparent',
            color: 'var(--color-primary)',
            border: '2px solid var(--color-primary)',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'block',
            margin: '2rem auto 0',
            textTransform: 'uppercase',
        },
        formContainer: {
            backgroundColor: 'var(--color-white)',
            padding: '2.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin: '0 auto',
        },
        formTitle: {
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'var(--color-primary)',
        },
        formGroup: {
            marginBottom: '1.5rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
            color: 'var(--color-text-dark)',
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
        },
        textarea: {
            width: '100%',
            padding: '0.75rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            minHeight: '120px',
            resize: 'vertical',
        },
        formRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
        },
    };

    return (
        <div>
            <div style={styles.header}>
                <FaVideo style={{ fontSize: '3rem', marginBottom: '1rem' }} />
                <h1>Video Consultation with a Pro</h1>
                <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                    Expert 1-on-1 video sessions for project guidance
                </p>
            </div>

            <div style={styles.section}>
                <p style={styles.introText}>
                    Get personalized guidance from our experienced contractors. Whether you're planning a DIY project, 
                    evaluating repair options, or need expert advice on your home improvement decisions, our video 
                    consultations connect you with seasoned professionals ready to help.
                </p>

                <div style={styles.pricingGrid}>
                    {pricingTiers.map((tier, index) => (
                        <div 
                            key={index} 
                            style={styles.pricingCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                            }}
                        >
                            <div style={styles.pricingHeader}>
                                <FaClock style={{ color: 'var(--color-secondary)' }} />
                                <span style={styles.duration}>{tier.duration}</span>
                                <span style={styles.durationUnit}>min</span>
                            </div>
                            <div>
                                <span style={styles.price}>${tier.price}</span>
                            </div>
                            <p style={styles.description}>{tier.description}</p>
                            <div style={styles.features}>
                                <div style={styles.featureItem}>
                                    <FaCheckCircle style={{ color: '#22C55E' }} />
                                    <span>Screen share capability</span>
                                </div>
                                <div style={styles.featureItem}>
                                    <FaCheckCircle style={{ color: '#22C55E' }} />
                                    <span>Written follow-up notes</span>
                                </div>
                                <div style={styles.featureItem}>
                                    <FaCheckCircle style={{ color: '#22C55E' }} />
                                    <span>No obligation quote</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {!showForm ? (
                    <button style={styles.btnOutline} onClick={() => setShowForm(true)}>
                        <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                        Book Your Session
                    </button>
                ) : (
                    <div style={styles.formContainer}>
                        <button 
                            onClick={() => setShowForm(false)}
                            style={{
                                float: 'right',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        >
                            ×
                        </button>
                        <h2 style={styles.formTitle}>Book Your Session</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Full Name *</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Email *</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Phone</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Preferred Date *</label>
                                    <input 
                                        type="date" 
                                        name="preferredDate"
                                        value={formData.preferredDate}
                                        onChange={handleChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Preferred Time *</label>
                                    <select 
                                        name="preferredTime"
                                        value={formData.preferredTime}
                                        onChange={handleChange}
                                        style={styles.input}
                                        required
                                    >
                                        <option value="">Select a time</option>
                                        <option value="9:00 AM">9:00 AM</option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="1:00 PM">1:00 PM</option>
                                        <option value="2:00 PM">2:00 PM</option>
                                        <option value="3:00 PM">3:00 PM</option>
                                        <option value="4:00 PM">4:00 PM</option>
                                        <option value="5:00 PM">5:00 PM</option>
                                    </select>
                                </div>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Topic / Issue Description *</label>
                                <textarea 
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    style={styles.textarea}
                                    placeholder="Please describe your project or issue so we can match you with the right specialist..."
                                    required
                                />
                            </div>
                            <button type="submit" style={styles.btnPrimary}>
                                Submit Booking Request
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoSession;
