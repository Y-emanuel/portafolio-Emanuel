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

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  transition: ${theme.transitions.fast};
  height: ${NAVBAR_HEIGHT}px;
  
  &.scrolled {
    padding: 0.75rem 2rem;
    background: rgba(15, 23, 42, 0.95);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Logo = styled(motion.a)`
  display: flex;
  align-items: center;  gap: 0.5rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.25rem;
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
    background-clip: text;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  padding: 0.75rem 1.25rem;
  color: ${theme.colors.textMuted};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 10px;
  transition: ${theme.transitions.fast};
  cursor: pointer;
  
  &:hover,
  &.active {
    color: ${theme.colors.text};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  width: 48px;
  height: 48px;  background: rgba(139, 92, 246, 0.15);
  border: 2px solid ${theme.colors.primary};
  border-radius: 12px;
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  transition: ${theme.transitions.fast};
  z-index: 1001;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:hover {
    background: rgba(139, 92, 246, 0.25);
    transform: scale(1.05);
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  overflow-y: auto;
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 56px;
  height: 56px;
  background: rgba(239, 68, 68, 0.2);  border: 2px solid #ef4444;
  border-radius: 50%;
  color: #ef4444;
  font-size: 1.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ef4444;
    color: white;
    transform: rotate(90deg);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const MobileNavLink = styled.a`
  font-size: clamp(1.3rem, 4vw, 1.5rem);
  font-weight: 600;
  color: ${theme.colors.text};
  text-decoration: none;
  padding: 1.25rem 2rem;
  border-radius: 12px;
  transition: ${theme.transitions.fast};
  width: 100%;
  max-width: 300px;
  text-align: center;
  cursor: pointer;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  
  &:hover {
    background: ${theme.colors.primary};
    color: white;
  }
`;

const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;  right: 2rem;
  width: 50px;
  height: 50px;
  background: ${theme.colors.gradient};
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.futuristic};
  z-index: 999;
  transition: ${theme.transitions.fast};
  
  &:hover {
    box-shadow: ${theme.shadows.hover};
    transform: translateY(-5px);
  }
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
      
      const offset = window.innerWidth <= 768 ? 100 : 150;
      const scrollPosition = window.scrollY + offset;
      const sections = NAV_ITEMS.map(item => item.href.replace('#', ''));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMenu();
    setTimeout(() => scrollToSection(href), 150);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <NavbarContainer className={isScrolled ? 'scrolled' : ''}>
        <NavbarContent>
          <Logo href="#hero" onClick={handleLogoClick}>
            <FiCode className="icon" />
            <span>{personalInfo.name.split(' ')[0]}</span>
          </Logo>

          <NavLinks>            {NAV_ITEMS.map((item, index) => (
              <NavLink
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={activeSection === item.href.replace('#', '') ? 'active' : ''}
              >
                {item.name}
              </NavLink>
            ))}
          </NavLinks>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú"
            type="button"
          >
            <FiMenu />
          </MobileMenuButton>
        </NavbarContent>
      </NavbarContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuOverlay>
            <CloseButton
              onClick={closeMenu}
              aria-label="Cerrar menú"
              type="button"
            >
              <FiX />
            </CloseButton>

            {NAV_ITEMS.map((item, index) => (
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
            onClick={scrollToTop}            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Volver arriba"
          >
            <FiArrowUp />
          </ScrollToTopButton>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
