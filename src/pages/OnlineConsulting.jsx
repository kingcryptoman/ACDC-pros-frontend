import React from 'react';
import CoachBot from '../components/CoachBot';
import { FaVideo, FaUpload, FaTools, FaRobot, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const OnlineConsulting = () => {
  const [activeTab, setActiveTab] = React.useState('coachbot');

  const tabStyle = (isActive) => ({
    padding: '10px 20px',
    border: 'none',
    background: isActive ? 'rgba(28, 94, 115, 0.3)' : 'transparent',
    color: isActive ? '#22D3EE' : '#64748b',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '0.95rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    borderBottom: isActive ? '2px solid #22D3EE' : '2px solid transparent',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0A0F14' }}>
      {/* Hero header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f3d4d 0%, #1C5E73 50%, #0A0F14 100%)',
        padding: '3rem 1.5rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(28, 94, 115, 0.3)',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '0.5rem',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #1C5E73, #22D3EE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FaRobot color="#fff" size={22} />
          </div>
          <h1 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            margin: 0,
          }}>
            CoachBot AI
          </h1>
        </div>
        <p style={{
          color: 'rgba(34, 211, 238, 0.85)',
          fontSize: '1rem',
          margin: '0 auto',
          maxWidth: '560px',
          lineHeight: '1.6',
        }}>
          Your ACDC Pros AI assistant — 40+ home repair scenarios at your fingertips.
          From leaky faucets to heat pump installs, get expert guidance instantly.
        </p>

        {/* Trust indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '1.2rem',
          flexWrap: 'wrap',
        }}>
          {[
            { icon: <FaCheckCircle size={14} />, text: '40+ Scenarios' },
            { icon: <FaCheckCircle size={14} />, text: 'Code References' },
            { icon: <FaCheckCircle size={14} />, text: 'Cost Estimates' },
            { icon: <FaCheckCircle size={14} />, text: 'Pro Dispatch' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '0.8rem', color: 'rgba(34, 211, 238, 0.7)',
            }}>
              {item.icon}
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0',
        background: '#0A0F14',
        borderBottom: '1px solid rgba(28, 94, 115, 0.3)',
      }}>
        <button
          style={tabStyle(activeTab === 'coachbot')}
          onClick={() => setActiveTab('coachbot')}
          onMouseEnter={e => { if (activeTab !== 'coachbot') { e.currentTarget.style.color = '#94a3b8'; } }}
          onMouseLeave={e => { if (activeTab !== 'coachbot') { e.currentTarget.style.color = '#64748b'; } }}
        >
          <FaRobot size={14} />
          CoachBot AI
        </button>
        <button
          style={tabStyle(activeTab === 'live')}
          onClick={() => setActiveTab('live')}
          onMouseEnter={e => { if (activeTab !== 'live') { e.currentTarget.style.color = '#94a3b8'; } }}
          onMouseLeave={e => { if (activeTab !== 'live') { e.currentTarget.style.color = '#64748b'; } }}
        >
          <FaVideo size={14} />
          Live Coaching
        </button>
        <button
          style={tabStyle(activeTab === 'ondemand')}
          onClick={() => setActiveTab('ondemand')}
          onMouseEnter={e => { if (activeTab !== 'ondemand') { e.currentTarget.style.color = '#94a3b8'; } }}
          onMouseLeave={e => { if (activeTab !== 'ondemand') { e.currentTarget.style.color = '#64748b'; } }}
        >
          <FaUpload size={14} />
          On-Demand
        </button>
        <button
          style={tabStyle(activeTab === 'estimator')}
          onClick={() => setActiveTab('estimator')}
          onMouseEnter={e => { if (activeTab !== 'estimator') { e.currentTarget.style.color = '#94a3b8'; } }}
          onMouseLeave={e => { if (activeTab !== 'estimator') { e.currentTarget.style.color = '#64748b'; } }}
        >
          <FaTools size={14} />
          Smart Estimator
        </button>
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}>
        {activeTab === 'coachbot' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Scenario category pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              padding: '0 0 0.5rem',
            }}>
              {[
                'Doors & Windows', 'Plumbing', 'Electrical', 'HVAC',
                'Exterior', 'Drywall & Paint', 'Flooring', 'Appliances',
                'Cleaning', 'Disaster Relief',
              ].map((cat, i) => (
                <div key={i} style={{
                  padding: '4px 14px',
                  borderRadius: '20px',
                  background: 'rgba(28, 94, 115, 0.15)',
                  border: '1px solid rgba(28, 94, 115, 0.3)',
                  color: '#64748b',
                  fontSize: '0.75rem',
                  fontFamily: "'Oswald', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {cat}
                </div>
              ))}
            </div>

            {/* CoachBot chat interface */}
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(28, 94, 115, 0.4)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}>
              <CoachBot />
            </div>

            {/* Safety note */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px 16px',
              background: 'rgba(245, 158, 11, 0.06)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: '#94a3b8',
            }}>
              <FaShieldAlt color="#F59E0B" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#F59E0B' }}>Safety Notice:</strong>{' '}
                CoachBot AI provides informational guidance only, not licensed professional advice.
                For electrical, gas, structural, or permit-required work, always consult a licensed contractor.
                In emergencies (flooding, gas smell, fire), call 911 immediately.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'live' && <LiveCoachingTab />}
        {activeTab === 'ondemand' && <OnDemandTab />}
        {activeTab === 'estimator' && <EstimatorTab />}
      </div>
    </div>
  );
};

// ── Sub-tabs ──────────────────────────────────────────────────────────────

function LiveCoachingTab() {
  return (
    <div style={{
      background: '#0F1F2C',
      borderRadius: '12px',
      border: '1px solid rgba(28, 94, 115, 0.3)',
      padding: '3rem 2rem',
      textAlign: 'center',
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'rgba(28, 94, 115, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1rem',
        }}>
          <FaVideo color="#22D3EE" size={28} />
        </div>
        <h2 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: '1.5rem',
          color: '#e2e8f0',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          Live Coaching Session
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
          Video chat with a Senior Consultant (25+ years experience).
          Perfect for troubleshooting active projects or walk-through guidance.
        </p>
        <div style={{
          display: 'inline-block',
          background: 'rgba(28, 94, 115, 0.2)',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          borderRadius: '8px',
          padding: '8px 20px',
          marginBottom: '1.5rem',
        }}>
          <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#22D3EE' }}>$2.00</span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}> / minute</span>
        </div>
      </div>
      <button
        onClick={() => alert('Connecting to a Senior Consultant...')}
        style={{
          background: 'linear-gradient(135deg, #1C5E73, #22D3EE)',
          color: '#fff',
          border: 'none',
          padding: '14px 36px',
          borderRadius: '8px',
          fontFamily: "'Oswald', sans-serif",
          fontSize: '1.1rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          cursor: 'pointer',
        }}
      >
        Start Live Session
      </button>
      <p style={{ color: '#475569', fontSize: '0.78rem', marginTop: '1rem' }}>
        Average session: 15–30 minutes · Credit card charged at end · Receipt emailed automatically
      </p>
    </div>
  );
}

function OnDemandTab() {
  return (
    <div style={{
      background: '#0F1F2C',
      borderRadius: '12px',
      border: '1px solid rgba(28, 94, 115, 0.3)',
      padding: '3rem 2rem',
      textAlign: 'center',
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'rgba(28, 94, 115, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1rem',
        }}>
          <FaUpload color="#22D3EE" size={28} />
        </div>
        <h2 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: '1.5rem',
          color: '#e2e8f0',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          On-Demand Support
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
          Upload 4K photos or video of your problem.
          A licensed contractor reviews and sends a detailed video solution within 24 hours.
        </p>
        <div style={{
          display: 'inline-block',
          background: 'rgba(28, 94, 115, 0.2)',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          borderRadius: '8px',
          padding: '8px 20px',
          marginBottom: '1.5rem',
        }}>
          <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#22D3EE' }}>$25.00</span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}> / ticket</span>
        </div>
      </div>
      <button
        onClick={() => alert('Upload feature coming soon!')}
        style={{
          background: 'transparent',
          color: '#22D3EE',
          border: '2px solid rgba(34, 211, 238, 0.5)',
          padding: '14px 36px',
          borderRadius: '8px',
          fontFamily: "'Oswald', sans-serif",
          fontSize: '1.1rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          cursor: 'pointer',
        }}
      >
        Submit Request
      </button>
      <p style={{ color: '#475569', fontSize: '0.78rem', marginTop: '1rem' }}>
        Accepted formats: JPG, PNG, MP4, MOV · Max file size: 500MB · 24-hour turnaround
      </p>
    </div>
  );
}

function EstimatorTab() {
  return (
    <div style={{
      background: '#0F1F2C',
      borderRadius: '12px',
      border: '1px solid rgba(28, 94, 115, 0.3)',
      padding: '3rem 2rem',
      textAlign: 'center',
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'rgba(28, 94, 115, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1rem',
        }}>
          <FaTools color="#22D3EE" size={28} />
        </div>
        <h2 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: '1.5rem',
          color: '#e2e8f0',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          Smart Estimator
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
          Using our AI Room Enhancer app? Upload your dimensions here for a verified quote from a licensed contractor.
        </p>
        <div style={{
          display: 'inline-block',
          background: 'rgba(28, 94, 115, 0.2)',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          borderRadius: '8px',
          padding: '8px 20px',
          marginBottom: '1.5rem',
        }}>
          <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#22D3EE' }}>Free</span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}> · 3 tries included</span>
        </div>
      </div>
      <button
        onClick={() => window.location.href = '/estimator'}
        style={{
          background: 'transparent',
          color: '#22D3EE',
          border: '2px solid rgba(34, 211, 238, 0.5)',
          padding: '14px 36px',
          borderRadius: '8px',
          fontFamily: "'Oswald', sans-serif",
          fontSize: '1.1rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          cursor: 'pointer',
        }}
      >
        Go to Estimator
      </button>
    </div>
  );
}

export default OnlineConsulting;
