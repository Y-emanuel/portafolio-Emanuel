import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { personalInfo } from '../../data/personalInfo';
import { FiMenu, FiX, FiCode, FiArrowUp } from 'react-icons/fi';

const NAV_ITEMS = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre Mí', href: '#about' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Educación', href: '#education' },
  { name: 'Contacto', href: '#contact' },
];

const NAVBAR_HEIGHT = 80;

/* ================= STYLES ================= */

const NavbarContainer = styled.nav`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  height: ${NAVBAR_HEIGHT}px;
  padding: 1rem 2rem;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(15, 23, 42, 0.95);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  color: ${theme.colors.text};
  cursor: pointer;

  .icon {
    color: ${theme.colors.primary};
    font-size: 1.5rem;
  }

  span {
    background: ${theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  padding: 0.75rem 1.25rem;
  color: ${theme.colors.textMuted};
  text-decoration: none;
  font-weight: 500;
  border-radius: 10px;
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.text};
  }
`;

const BaseMobileButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 2px solid ${theme.colors.primary};
  background: rgba(139, 92, 246, 0.15);
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  transition: ${theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(139, 92, 246, 0.25);
    transform: scale(1.05);
  }
`;

const MobileMenuButton = styled(BaseMobileButton)`
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const CloseButton = styled(BaseMobileButton)`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 2000; /* Más alto que cualquier cosa */
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const MobileNavLink = styled.a`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${theme.colors.text};
  text-decoration: none;
  padding: 1.25rem 2rem;
  border-radius: 12px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  width: 100%;
  max-width: 300px;
  text-align: center;
`;

const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.gradient};
  color: white;
  cursor: pointer;
  z-index: 1000;
`;

/* ================= COMPONENT ================= */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    document.body.style.paddingTop = `${NAVBAR_HEIGHT}px`;
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (!element) return;

    const y =
      element.getBoundingClientRect().top +
      window.scrollY -
      NAVBAR_HEIGHT;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      {/* 🔥 El navbar NO se renderiza si el menú está abierto */}
      {!isMobileMenuOpen && (
        <NavbarContainer className={isScrolled ? 'scrolled' : ''}>
          <NavbarContent>
            <Logo
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <FiCode className="icon" />
              <span>{personalInfo.name.split(' ')[0]}</span>
            </Logo>

            <NavLinks>
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </NavLink>
              ))}
            </NavLinks>

            <MobileMenuButton
              onClick={() => setIsMobileMenuOpen(true)}
              type="button"
            >
              <FiMenu />
            </MobileMenuButton>
          </NavbarContent>
        </NavbarContainer>
      )}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CloseButton
              onClick={() => setIsMobileMenuOpen(false)}
              type="button"
            >
              <FiX />
            </CloseButton>

            {NAV_ITEMS.map((item) => (
              <MobileNavLink
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </MobileNavLink>
            ))}
          </MobileMenuOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <ScrollToTopButton
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <FiArrowUp />
          </ScrollToTopButton>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
