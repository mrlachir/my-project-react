const Footer = () => {
  const teamMembers = [
    "Lachir Mohammed",
    "Znady Mohammed Amine",
    "Hadraoui Anas"
  ];

  return (
    <>
      <style>{`
        footer {
          margin-top: 7rem;
          padding: 1.5rem;
          background-color: #1f2937;
          color: #fff;
          text-align: center;
          font-size: 0.875rem;
          width: 96.3%;
          box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .copyright-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .social-link {
          color: #60a5fa;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color 0.2s;
        }

        .social-link:hover {
          color: #93c5fd;
        }

        .team-section {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #374151;
          width: 98%;
        }

        .team-title {
          color: #9ca3af;
          margin-bottom: 0.5rem;
        }

        .team-members {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }

        .team-member {
          background-color: #374151;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
        }

        .instagram-icon {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }
      `}</style>

      <footer>
        <div className="footer-container">
          <div className="footer-main">
            <div className="copyright-section">
              <span>© 2025 Travel App. All rights reserved.</span>
              <a 
                href="https://instagram.com/mrlachir" 
                className="social-link"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg 
                  className="instagram-icon" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @TravelMate
              </a>
            </div>
            
            <div className="team-section">
              <p className="team-title">Our Team:</p>
              <div className="team-members">
                {teamMembers.map((member, index) => (
                  <span key={index} className="team-member">
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;