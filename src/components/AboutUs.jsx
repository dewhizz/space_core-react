import React from 'react';

const AboutUs = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #e3f2fd, #fbe9e7)',
        padding: '4rem 1rem',
        borderRadius: '15px',
        boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
      }}
    >
      <div className="container text-center text-dark">
        {/* Hero Section */}
        <section className="about-us my-5 px-4">
          <h2 className="text-primary display-4 fw-bold mb-4">
             About Space Core
          </h2>
          <p className="lead mb-4 px-md-5 text-secondary">
            <strong>Space Core</strong> is your ultimate gateway to real estate freedom.
            Whether you're looking for an inspiring workspace, a cozy apartment, or a launching pad for your next big idea — we bring the options to you, effortlessly.
          </p>
          <p className="mb-4 px-md-5 text-secondary">
            Navigate smart filters, explore verified listings, and communicate directly with property owners —
            all inside a sleek, user-centric platform designed to simplify your space search.
          </p>
          <p className="fw-bold text-dark">
            <strong>Space Core:</strong> Your next space, found your way.
          </p>
        </section>

        {/* What Is Space Core */}
        <section className="px-4 mt-5">
          <h3 className="text-primary fw-bold mb-3"> What Is Space Core?</h3>
          <p className="px-md-5 text-secondary">
            A smart platform built around you. From homes to studios and commercial locations,
            Space Core uses intelligent matching to pair you with the perfect space.
            No endless scrolling — just clarity, control, and convenience.
          </p>
        </section>

        {/* What Sets Us Apart */}
        <section className="px-4 mt-5">
          <h3 className="text-primary fw-bold mb-3"> What Sets Us Apart</h3>
          <ul className="list-unstyled px-md-5 text-start text-secondary">
            <li className="mb-3">
              ✅ <strong>Hyper-Relevant Matching:</strong> Our filters aren’t just smart — they’re intuitive, showing you listings that *understand* what you’re looking for.
            </li>
            <li className="mb-3">
              📞 <strong>Streamlined Communication:</strong> Message property owners, request viewings, and make decisions — without leaving the platform.
            </li>
            <li className="mb-3">
              📍 <strong>Journey Tracking:</strong> Stay on top of your space search with favorites, inquiry tracking, and calendar-friendly scheduling.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;