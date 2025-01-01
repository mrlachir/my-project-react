const Footer = () => {
  return (
    <>
      <style>{`
        footer {
          margin-top: 7rem;
          padding: 1rem;
          background-color: #333;
          color: #fff;
          text-align: center;
          font-size: 0.875rem; // Equivalent to text-sm in Tailwind
          left: 0;
          bottom: 0;
          width: 97.6%;
          box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
        }

        .social-link {
          color: #0af; // Bright blue for visibility
          text-decoration: none; // No underline
          margin-left: 0.5rem;
        }

        .social-link:hover {
          color: #08d; // Slightly darker blue on hover
        }
      `}</style>

      <footer>
        © 2025 Travel App. All rights reserved. 
        <a href="https://INSTAGRAM.com/mrlachir" className="social-link" target="_blank" rel="noopener noreferrer">
           @mrlachir
        </a>
      </footer>
    </>
  );
};

export default Footer;
