import React, { useState, useEffect } from 'react';
import { FaUserShield, FaUsers, FaVideo, FaTruck, FaChartLine, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const ADMIN_EMAILS = [
    'Henryhomes2016@gmail.com',
    'acdcproservices@gmail.com'
];

// Mock data for dashboard stats
const mockStats = {
    totalUsers: 247,
    activeSessions: 12,
    dispatchesToday: 8,
    revenueThisMonth: 4250,
};

const mockRecentActivity = [
    { id: 1, type: 'user', message: 'New user registered: john.smith@email.com', time: '5 min ago' },
    { id: 2, type: 'session', message: 'Video session completed (30 min, HVAC repair)', time: '12 min ago' },
    { id: 3, type: 'dispatch', message: 'Dispatch #1247 assigned to Mike Thompson', time: '25 min ago' },
    { id: 4, type: 'membership', message: 'New Professional membership: sarah.lee@email.com', time: '1 hour ago' },
    { id: 5, type: 'session', message: 'Video session completed (15 min, deck inspection)', time: '2 hours ago' },
];

const Admin = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [emailInput, setEmailInput] = useState('');

    useEffect(() => {
        // Simulate checking stored auth state
        const storedEmail = localStorage.getItem('adminEmail');
        if (storedEmail && ADMIN_EMAILS.includes(storedEmail.toLowerCase())) {
            setUserEmail(storedEmail);
            setIsAuthorized(true);
        }
        setIsChecking(false);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const normalizedEmail = emailInput.toLowerCase().trim();
        if (ADMIN_EMAILS.includes(normalizedEmail)) {
            localStorage.setItem('adminEmail', normalizedEmail);
            setUserEmail(normalizedEmail);
            setIsAuthorized(true);
        } else {
            alert('Access Denied. This email is not authorized for admin access.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminEmail');
        setUserEmail('');
        setIsAuthorized(false);
        setEmailInput('');
    };

    const styles = {
        header: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '3rem 1rem',
            textAlign: 'center',
        },
        container: {
            padding: '3rem 1rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        deniedContainer: {
            textAlign: 'center',
            padding: '4rem 1rem',
            maxWidth: '500px',
            margin: '0 auto',
        },
        deniedIcon: {
            fontSize: '4rem',
            color: '#EF4444',
            marginBottom: '1.5rem',
        },
        deniedTitle: {
            fontSize: '2rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-primary)',
            marginBottom: '1rem',
        },
        deniedText: {
            color: '#666',
            marginBottom: '2rem',
            lineHeight: '1.6',
        },
        loginForm: {
            backgroundColor: 'var(--color-white)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            margin: '0 auto',
        },
        formTitle: {
            textAlign: 'center',
            marginBottom: '1.5rem',
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
        btnPrimary: {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-white)',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1rem',
            fontWeight: 'bold',
            width: '100%',
            cursor: 'pointer',
        },
        welcomeSection: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
        },
        welcomeText: {
            color: 'var(--color-primary)',
        },
        logoutBtn: {
            backgroundColor: 'transparent',
            color: '#666',
            border: '1px solid #666',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontSize: '0.9rem',
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
        },
        statCard: {
            backgroundColor: 'var(--color-white)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        },
        statIcon: {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            flexShrink: 0,
        },
        statContent: {
            flex: 1,
        },
        statValue: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-primary)',
        },
        statLabel: {
            color: '#666',
            fontSize: '0.9rem',
        },
        section: {
            marginBottom: '3rem',
        },
        sectionTitle: {
            fontSize: '1.5rem',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-primary)',
            marginBottom: '1rem',
            textTransform: 'uppercase',
        },
        activityList: {
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden',
        },
        activityItem: {
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        },
        activityIcon: {
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            flexShrink: 0,
        },
        activityContent: {
            flex: 1,
        },
        activityMessage: {
            color: 'var(--color-text-dark)',
        },
        activityTime: {
            color: '#999',
            fontSize: '0.85rem',
            marginTop: '0.25rem',
        },
        quickActions: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
        },
        actionBtn: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            border: 'none',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 'bold',
            cursor: 'pointer',
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
        },
    };

    const getActivityIcon = (type) => {
        const iconProps = { style: {} };
        const configs = {
            user: { icon: <FaUsers />, bg: '#3B82F6', color: '#fff' },
            session: { icon: <FaVideo />, bg: '#8B5CF6', color: '#fff' },
            dispatch: { icon: <FaTruck />, bg: '#F59E0B', color: '#fff' },
            membership: { icon: <FaCheckCircle />, bg: '#22C55E', color: '#fff' },
        };
        const config = configs[type] || configs.user;
        return (
            <div style={{ ...styles.activityIcon, backgroundColor: config.bg, color: config.color }}>
                {config.icon}
            </div>
        );
    };

    // Loading state
    if (isChecking) {
        return (
            <div style={{ ...styles.container, textAlign: 'center' }}>
                <p>Checking authorization...</p>
            </div>
        );
    }

    // Access Denied / Login Form
    if (!isAuthorized) {
        return (
            <div>
                <div style={styles.header}>
                    <FaUserShield style={{ fontSize: '3rem', marginBottom: '1rem' }} />
                    <h1>Admin Dashboard</h1>
                </div>
                <div style={styles.deniedContainer}>
                    <FaExclamationTriangle style={styles.deniedIcon} />
                    <h2 style={styles.deniedTitle}>Access Denied</h2>
                    <p style={styles.deniedText}>
                        This area is restricted to authorized administrators only. 
                        Please enter your authorized email address to continue.
                    </p>
                    <form style={styles.loginForm} onSubmit={handleLogin}>
                        <h3 style={styles.formTitle}>Admin Login</h3>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email Address</label>
                            <input 
                                type="email" 
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                style={styles.input}
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                        <button type="submit" style={styles.btnPrimary}>
                            Verify Access
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Authorized Dashboard
    return (
        <div>
            <div style={styles.header}>
                <FaUserShield style={{ fontSize: '3rem', marginBottom: '1rem' }} />
                <h1>Admin Dashboard</h1>
            </div>

            <div style={styles.container}>
                <div style={styles.welcomeSection}>
                    <div>
                        <h2 style={styles.welcomeText}>Welcome back, {userEmail}</h2>
                        <p style={{ color: '#666' }}>Last login: Today at 9:45 AM</p>
                    </div>
                    <button style={styles.logoutBtn} onClick={handleLogout}>
                        Log Out
                    </button>
                </div>

                {/* Stats Cards */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                            <FaUsers />
                        </div>
                        <div style={styles.statContent}>
                            <div style={styles.statValue}>{mockStats.totalUsers}</div>
                            <div style={styles.statLabel}>Total Users</div>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' }}>
                            <FaVideo />
                        </div>
                        <div style={styles.statContent}>
                            <div style={styles.statValue}>{mockStats.activeSessions}</div>
                            <div style={styles.statLabel}>Active Sessions</div>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statIcon, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                            <FaTruck />
                        </div>
                        <div style={styles.statContent}>
                            <div style={styles.statValue}>{mockStats.dispatchesToday}</div>
                            <div style={styles.statLabel}>Dispatches Today</div>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}>
                            <FaChartLine />
                        </div>
                        <div style={styles.statContent}>
                            <div style={styles.statValue}>${mockStats.revenueThisMonth.toLocaleString()}</div>
                            <div style={styles.statLabel}>Revenue This Month</div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Recent Activity</h3>
                    <div style={styles.activityList}>
                        {mockRecentActivity.map((activity) => (
                            <div key={activity.id} style={styles.activityItem}>
                                {getActivityIcon(activity.type)}
                                <div style={styles.activityContent}>
                                    <div style={styles.activityMessage}>{activity.message}</div>
                                    <div style={styles.activityTime}>{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Quick Actions</h3>
                    <div style={styles.quickActions}>
                        <button style={styles.actionBtn}>View All Users</button>
                        <button style={styles.actionBtn}>Manage Dispatches</button>
                        <button style={styles.actionBtn}>View Reports</button>
                        <button style={styles.actionBtn}>Settings</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
