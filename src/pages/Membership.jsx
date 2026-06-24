import React from 'react';
import { FaCheck, FaCrown, FaTools, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Membership = () => {
    const tiers = [
        {
            name: 'Basic',
            subtitle: 'DIY',
            price: 'Free',
            priceNote: 'Forever',
            description: 'Perfect for homeowners who want to tackle projects with expert guidance.',
            features: [
                'AI CoachBot access',
                'Step-by-step tutorials',
                'Community forum access',
                'Project estimation tools',
                'DIY project guides'
            ],
            cta: 'Get Started Free',
            ctaStyle: 'outline',
            highlight: false
        },
        {
            name: 'Professional',
            subtitle: 'Most Popular',
            price: '$29',
            priceNote: '/month',
            description: 'Ideal for active homeowners who need regular expert support.',
            features: [
                'Everything in Basic',
                '2 video consults/month',
                'Priority dispatch queue',
                '10% discount on materials',
                'Expert project reviews',
                'Phone support'
            ],
            cta: 'Join Professional',
            ctaStyle: 'primary',
            highlight: true
        },
        {
            name: 'Executive',
            subtitle: 'VIP',
            price: '$99',
            priceNote: '/month',
            description: 'For homeowners who want a dedicated partner for all home projects.',
            features: [
                'Everything in Professional',
                'Unlimited video consults',
                'Dedicated account manager',
                'VIP dispatch queue',
                '15% discount on materials',
                'Site visits included',
                'After-hours support'
            ],
            cta: 'Go Executive',
            ctaStyle: 'premium',
            highlight: false
        }
    ];

    const styles = {
        header: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '4rem 1rem',
            textAlign: 'center',
        },
        section: {
            padding: '4rem 1rem',
            maxWidth: '1200px',
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
        tierGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
        },
        tierCard: {
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            transition: 'transform 0.2s, box-shadow 0.2s',
        },
        tierCardHighlight: {
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            border: '3px solid var(--color-secondary)',
            transform: 'scale(1.05)',
            zIndex: 1,
        },
        badge: {
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-white)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-heading)',
        },
        tierName: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            marginBottom: '0.25rem',
        },
        tierSubtitle: {
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '1.5rem',
        },
        priceContainer: {
            textAlign: 'center',
            marginBottom: '1.5rem',
            padding: '1.5rem 0',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
        },
        price: {
            fontSize: '3.5rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-primary)',
        },
        priceNote: {
            fontSize: '1rem',
            color: '#666',
        },
        priceNoteFree: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-heading)',
            color: '#22C55E',
        },
        description: {
            color: '#666',
            marginBottom: '1.5rem',
            lineHeight: '1.6',
        },
        featuresList: {
            listStyle: 'none',
            padding: 0,
            margin: '0 0 1.5rem 0',
            flex: 1,
        },
        featureItem: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            marginBottom: '0.75rem',
            color: 'var(--color-text-dark)',
        },
        checkIcon: {
            color: '#22C55E',
            fontSize: '1.1rem',
            flexShrink: 0,
            marginTop: '0.15rem',
        },
        btnBase: {
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s',
            textAlign: 'center',
        },
        btnPrimary: {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-white)',
            border: 'none',
        },
        btnOutline: {
            backgroundColor: 'transparent',
            color: 'var(--color-primary)',
            border: '2px solid var(--color-primary)',
        },
        btnPremium: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            border: 'none',
        },
        faq: {
            marginTop: '4rem',
            textAlign: 'left',
        },
        faqTitle: {
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'var(--color-primary)',
        },
        faqItem: {
            backgroundColor: 'var(--color-white)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        faqQuestion: {
            fontWeight: 'bold',
            color: 'var(--color-primary)',
            marginBottom: '0.5rem',
        },
        faqAnswer: {
            color: '#666',
            lineHeight: '1.6',
        },
    };

    const faqItems = [
        {
            question: 'Can I cancel my membership anytime?',
            answer: 'Yes, you can cancel your membership at any time. Your benefits will continue until the end of your current billing period.'
        },
        {
            question: 'Do video consults roll over to the next month?',
            answer: 'Video consults are credited monthly and do not roll over. Book your sessions any time during your billing cycle.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, debit cards, and PayPal. All payments are processed securely.'
        },
        {
            question: 'Can I upgrade or downgrade my plan?',
            answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the next billing cycle.'
        }
    ];

    return (
        <div>
            <div style={styles.header}>
                <FaCrown style={{ fontSize: '3rem', marginBottom: '1rem' }} />
                <h1>Choose Your ACDC Pros Membership</h1>
                <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                    Expert support for every stage of your home projects
                </p>
            </div>

            <div style={styles.section}>
                <p style={styles.introText}>
                    Whether you're a DIY enthusiast or want full-service support, ACDC Pros membership 
                    gives you access to expert guidance, priority service, and exclusive savings. 
                    Choose the tier that fits your needs.
                </p>

                <div style={styles.tierGrid}>
                    {tiers.map((tier, index) => (
                        <div 
                            key={index}
                            style={tier.highlight ? styles.tierCardHighlight : styles.tierCard}
                            onMouseEnter={(e) => {
                                if (!tier.highlight) {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!tier.highlight) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                                }
                            }}
                        >
                            {tier.highlight && <div style={styles.badge}>{tier.subtitle}</div>}
                            
                            <div style={tier.highlight ? {...styles.tierName, marginTop: '1rem'} : styles.tierName}>
                                {tier.name}
                            </div>
                            {!tier.highlight && <div style={styles.tierSubtitle}>{tier.subtitle}</div>}
                            
                            <div style={styles.priceContainer}>
                                {tier.price === 'Free' ? (
                                    <span style={styles.priceNoteFree}>{tier.price}</span>
                                ) : (
                                    <>
                                        <span style={styles.price}>{tier.price}</span>
                                        <span style={styles.priceNote}>{tier.priceNote}</span>
                                    </>
                                )}
                                <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                                    {tier.priceNote}
                                </div>
                            </div>
                            
                            <p style={styles.description}>{tier.description}</p>
                            
                            <ul style={styles.featuresList}>
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} style={styles.featureItem}>
                                        <FaCheck style={styles.checkIcon} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <Link 
                                to="/contact" 
                                style={{
                                    ...styles.btnBase,
                                    ...(tier.ctaStyle === 'primary' ? styles.btnPrimary : 
                                       tier.ctaStyle === 'premium' ? styles.btnPremium : styles.btnOutline),
                                }}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <div style={styles.faq}>
                    <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
                    {faqItems.map((item, index) => (
                        <div key={index} style={styles.faqItem}>
                            <div style={styles.faqQuestion}>{item.question}</div>
                            <div style={styles.faqAnswer}>{item.answer}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Membership;
