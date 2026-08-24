
import React from 'react';

export const ChartBar = ({ className = '', title = 'chart' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <rect x="3" y="3" width="4" height="18" rx="1" fill="currentColor" />
    <rect x="10" y="9" width="4" height="12" rx="1" fill="currentColor" />
    <rect x="17" y="13" width="4" height="8" rx="1" fill="currentColor" />
  </svg>
);

export const Graduation = ({ className = '', title = 'graduation' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    {/* mortarboard top */}
    <path d="M12 3L2 8l10 5 10-5-10-5z" fill="currentColor" />
    {/* band under the cap */}
    <path d="M6 10.5V15c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.5l-6 3-6-3z" fill="currentColor" />
    {/* tassel string */}
    <path d="M20 9v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <circle cx="20" cy="15" r="1.2" fill="currentColor" />
  </svg>
);

export const Teacher = ({ className = '', title = 'teacher' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <circle cx="12" cy="8" r="3" fill="currentColor" />
    <path d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" fill="currentColor" />
  </svg>
);

export const Calendar = ({ className = '', title = 'calendar' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    {/* body */}
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
    {/* header bar */}
    <rect x="3" y="5" width="18" height="4" rx="1" fill="currentColor" />
    {/* hangers */}
    <path d="M7 3v4M17 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    {/* date dots */}
    <circle cx="7.5" cy="14" r="1.1" fill="currentColor" />
    <circle cx="12" cy="14" r="1.1" fill="currentColor" />
    <circle cx="16.5" cy="14" r="1.1" fill="currentColor" />
    <circle cx="7.5" cy="17.5" r="1.1" fill="currentColor" />
    <circle cx="12" cy="17.5" r="1.1" fill="currentColor" />
  </svg>
);

export const Timer = ({ className = '', title = 'timer' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M12 8v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M9 2h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Money = ({ className = '', title = 'money' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <circle cx="5" cy="9" r="0.9" fill="currentColor" />
    <circle cx="19" cy="15" r="0.9" fill="currentColor" />
  </svg>
);

export const User = ({ className = '', title = 'user' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <circle cx="12" cy="8" r="3" fill="currentColor" />
    <path d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" fill="currentColor" />
  </svg>
);

export const ImageIcon = ({ className = '', title = 'image' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" />
    <circle cx="8.5" cy="10.5" r="1.5" fill="rgba(255,255,255,0.8)" />
    <path d="M21 19l-6-6-5 5H21z" fill="rgba(255,255,255,0.8)" />
  </svg>
);

export const Star = ({ className = '', title = 'star' }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.853L19.335 24 12 19.897 4.665 24 6 15.601 0 9.748l8.332-1.73L12 .587z" />
  </svg>
);

export const MapPin = ({ className = '', title = 'location' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <path d="M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" fill="currentColor" />
  </svg>
);

export const Clock = ({ className = '', title = 'clock' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const Phone = ({ className = '', title = 'phone' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <path d="M6.6 10.2c1.4 2.8 3.8 5.2 6.6 6.6l1.8-1.8c.2-.2.5-.3.8-.2 1 .3 2 .5 3 .5.4 0 .8.3.9.7l.9 3.2c.1.4 0 .8-.3 1-1.1.7-3 1.3-5.9 1.3-5.9 0-10.7-4.8-10.7-10.7 0-2.9.5-4.8 1.3-5.9.2-.3.6-.4 1-.3l3.2.9c.4.1.7.5.7.9 0 1 .2 2 .5 3 .1.3 0 .6-.2.8l-1.8 1.8z" fill="currentColor" />
  </svg>
);

export const Mail = ({ className = '', title = 'mail' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" />
    <path d="M3 6l9 7 9-7" fill="rgba(255,255,255,0.9)" />
  </svg>
);

export const Facebook = ({ className = '', title = 'facebook' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H20l-1 3h-2v7A10 10 0 0022 12z" />
  </svg>
);

export const Envelope = ({ className = '', title = 'envelope' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={title} role="img">
    <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" />
    <path d="M3 7l9 7 9-7" fill="rgba(255,255,255,0.9)" />
  </svg>
);

export default null;