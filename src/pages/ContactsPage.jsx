import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaWhatsapp } from 'react-icons/fa';
import Button from '../components/Button.jsx';
import PageDecor from '../components/PageDecor.jsx';
import { contactInfo, emailJSConfig, contactIntro } from '../data/contact.js';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [toast, setToast] = useState(null);
  const formRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('sending');

    try {
      
      if (emailJSConfig.serviceId === 'YOUR_SERVICE_ID' || 
          emailJSConfig.templateId === 'YOUR_TEMPLATE_ID' || 
          emailJSConfig.publicKey === 'YOUR_PUBLIC_KEY') {
        throw new Error('EmailJS not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY environment variables.');
      }

      await emailjs.send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: contactInfo.email,
        },
        emailJSConfig.publicKey
      );
      showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setStatus('success');
    } catch (error) {
      console.error('EmailJS error:', error);
      showToast(error.message || 'Failed to send message. Please try again or use WhatsApp.', 'error');
      setStatus('error');
    }
  };

  const lastWhatsAppRef = useRef(0);
  const sendWhatsApp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = `Hello,%0A%0AName: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0ASubject: ${encodeURIComponent(formData.subject)}%0A%0AMessage:%0A${encodeURIComponent(formData.message)}`;
    const url = `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp...', 'info');
  };

  const handleWhatsAppTap = (e) => {
    const now = Date.now();
    if (now - lastWhatsAppRef.current < 500) {
      if (e) e.preventDefault();
      return;
    }
    lastWhatsAppRef.current = now;
    if (e.type === 'touchend') e.preventDefault();
    sendWhatsApp(e);
  };

  return (
    <form ref={formRef} onSubmit={sendEmail} className="contact-form" noValidate>
      <div className="form-group">
        <label htmlFor="name">Name <span className="required" aria-hidden="true">*</span></label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Your name"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={status === 'sending'}
        />
        {errors.name && <span id="name-error" className="error-message" role="alert">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email <span className="required" aria-hidden="true">*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="your@email.com"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={status === 'sending'}
        />
        {errors.email && <span id="email-error" className="error-message" role="alert">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject <span className="required" aria-hidden="true">*</span></label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={errors.subject ? 'error' : ''}
          placeholder="What\'s this about?"
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          disabled={status === 'sending'}
        />
        {errors.subject && <span id="subject-error" className="error-message" role="alert">{errors.subject}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message <span className="required" aria-hidden="true">*</span></label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? 'error' : ''}
          placeholder="Tell me about your project, opportunity, or idea..."
          rows={5}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : 'message-hint'}
          disabled={status === 'sending'}
        />
        {errors.message && <span id="message-error" className="error-message" role="alert">{errors.message}</span>}
        <span id="message-hint" className="form-hint">Minimum 10 characters</span>
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary" size="lg" loading={status === 'sending'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Send by Email
        </Button>
        <Button type="button" variant="secondary" size="lg" onClick={handleWhatsAppTap} onTouchEnd={handleWhatsAppTap} onPointerUp={handleWhatsAppTap} disabled={status === 'sending'}>
          <FaWhatsapp aria-hidden="true" size={18} />
          Send via WhatsApp
        </Button>
      </div>

      <p className="form-note">
        By submitting this form, you agree to your data being processed for the purpose of responding to your inquiry.
      </p>

      {toast && (
        <div className={`toast toast-${toast.type}`} role="alert" aria-live="polite">
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => setToast(null)} aria-label="Dismiss">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </form>
  );
}

function ContactInfo() {
  const contacts = [
    {
      label: 'Email',
      value: contactInfo.email,
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=ahchtourkhadija@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: 'Phone',
      value: contactInfo.phoneDisplay,
      href: contactInfo.phoneHref,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      value: contactInfo.phoneDisplay,
      href: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`,
      icon: <FaWhatsapp aria-hidden="true" size={20} />,
    },
    {
      label: 'GitHub',
      value: contactInfo.githubDisplay,
      href: contactInfo.github,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      label: 'Location',
      value: contactInfo.location,
      href: 'https://www.google.com/maps/search/?api=1&query=Agadir%2C%20Morocco',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 21s-6-5.373-6-10a6 6 0 1 1 12 0c0 4.627-6 10-6 10z" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="contact-info">
      <h2 className="contact-info-title">Get In Touch</h2>
      <p className="contact-intro">{contactIntro}</p>

      <div className="contact-methods" role="list" aria-label="Contact methods">
        {contacts.map((contact) => {
          const isExternal = contact.href && /^https?:\/\//i.test(contact.href);
          const isLink = Boolean(contact.href);
          const inner = (
            <>
              <span className="contact-icon" aria-hidden="true">{contact.icon}</span>
              <div className="contact-details">
                <span className="contact-label">{contact.label}</span>
                <span className="contact-value">{contact.value}</span>
              </div>
              {isLink && (
                <svg className="contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </>
          );
          return isLink ? (
            <a
              key={contact.label}
              href={contact.href}
              className="contact-method"
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              role="listitem"
            >
              {inner}
            </a>
          ) : (
            <div key={contact.label} className="contact-method" role="listitem" aria-label={contact.label}>
              {inner}
            </div>
          );
        })}
      </div>

      <div className="contact-note">
        <p>I usually reply within a few hours.</p>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  return (
    <div className="page-decor">
      <header className="page-header">
        <PageDecor variant="contact" count={3} />
        <div className="container">
          <p className="page-kicker" aria-hidden="true">{'// say-hello'}</p>
          <h1 className="page-title">Contact</h1>
          <p className="page-description">Let's work together on something great</p>
        </div>
      </header>

      <main>
        <section className="content-section contact-page">
          <PageDecor variant="contact" count={2} />
          <div className="container">
            <div className="contact-grid">
              <div className="contact-form-wrapper">
                <ContactForm />
              </div>
              <div className="contact-info-wrapper">
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}