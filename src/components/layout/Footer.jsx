// src/components/layout/Footer.jsx
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer-simple {
          border-top: 1px solid rgba(255,255,255,.07);
          background: rgba(4,7,15,.95);
          padding: 2rem 1.5rem;
          text-align: center;
        }
        .footer-simple p {
          font-size: .85rem;
          color: rgba(255,255,255,.45);
          margin: 0;
          font-family: 'Inter', sans-serif;
        }
        .footer-simple span {
          color: rgba(255,255,255,.65);
        }
        .footer-simple .heart {
          color: #ff3b30;
          display: inline-block;
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
      
      <footer className="footer-simple">
        <p>
          <span>© {year} Leonardo Daniel Domínguez Olvera</span>
          {' · '}
          Hecho con <span className="heart">❤️</span> en React + Firebase
        </p>
      </footer>
    </>
  );
};

export default Footer;