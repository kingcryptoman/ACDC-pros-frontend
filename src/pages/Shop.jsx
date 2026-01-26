import React from 'react';
import { FaBook, FaWrench, FaShoppingCart, FaExternalLinkAlt } from 'react-icons/fa';

const Shop = () => {
    const digitalProducts = [
        { id: 1, title: 'Complete Wiring Guide', price: 29.99, type: 'PDF + Video' },
        { id: 2, title: 'HVAC Troubleshooting 101', price: 24.99, type: 'Video Course' },
        { id: 3, title: 'Drywall Mastery', price: 19.99, type: 'PDF Guide' },
    ];

    const affiliateTools = [
        { id: 1, name: 'DeWalt 20V Max Drill', store: 'Home Depot', price: '99.00', link: '#' },
        { id: 2, name: 'Klein Tools Multimeter', store: "Lowe's", price: '49.97', link: '#' },
        { id: 3, name: 'Milwaukee Sawzall', store: 'Home Depot', price: '129.00', link: '#' },
    ];

    const styles = {
        header: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '3rem 1rem',
            textAlign: 'center',
        },
        section: {
            padding: '3rem 1rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
        },
        card: {
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-white)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
        },
        cardBody: {
            padding: '1.5rem',
            flex: 1,
        },
        badge: {
            backgroundColor: 'var(--color-bg-light)',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: 'var(--color-primary)',
        },
        price: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--color-primary)',
            margin: '1rem 0',
        },
        btn: {
            width: '100%',
            padding: '1rem',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
        },
        btnPrimary: {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-white)',
        },
        btnAffiliate: {
            backgroundColor: '#F97316', // Different orange for Home Depot vibe
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
        },
        btnLowes: {
            backgroundColor: '#004990', // Lowe's Blue
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
        }
    };

    return (
        <div>
            <div style={styles.header}>
                <h1>ACDC Shop</h1>
                <p>Pro Guides & Recommended Tools</p>
            </div>

            <div style={styles.section}>
                <h2>Digital Repair Guides</h2>
                <div style={styles.grid}>
                    {digitalProducts.map(product => (
                        <div key={product.id} style={styles.card}>
                            <div style={{ height: '150px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FaBook style={{ fontSize: '3rem', color: '#9ca3af' }} />
                            </div>
                            <div style={styles.cardBody}>
                                <span style={styles.badge}>{product.type}</span>
                                <h3 style={{ margin: '0.5rem 0' }}>{product.title}</h3>
                                <div style={styles.price}>${product.price}</div>
                                <button style={{ ...styles.btn, ...styles.btnPrimary }}>
                                    <FaShoppingCart style={{ marginRight: '0.5rem' }} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <h2>Pro Tool Board (Affiliate Links)</h2>
                <div style={styles.grid}>
                    {affiliateTools.map(tool => (
                        <div key={tool.id} style={styles.card}>
                            <div style={{ height: '150px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FaWrench style={{ fontSize: '3rem', color: '#9ca3af' }} />
                            </div>
                            <div style={styles.cardBody}>
                                <span style={styles.badge}>{tool.store}</span>
                                <h3 style={{ margin: '0.5rem 0' }}>{tool.name}</h3>
                                <div style={styles.price}>${tool.price}</div>
                                <button style={{ ...styles.btn, ...(tool.store === "Lowe's" ? styles.btnLowes : styles.btnAffiliate) }}>
                                    Buy at {tool.store} <FaExternalLinkAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
