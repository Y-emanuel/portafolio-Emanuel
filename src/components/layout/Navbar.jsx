import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { personalInfo } from '../../data/personalInfo';
import { FiMenu, FiX, FiCode, FiArrowUp } from 'react-icons/fi';

// ✅ Constante externa para navegación
const NAV_ITEMS = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre Mí', href: '#about' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Educación', href: '#education' },
  { name: 'Contacto', href: '#contact' },
];

// ✅ Altura del navbar para cálculos de scroll
const NAVBAR_HEIGHT = 80;

// ✅ Props de motion que NO deben pasar al DOM
const MOTION_PROPS = [
  'whileHover', 'whileTap', 'whileDrag', 'whileFocus',
  'initial', 'animate', 'exit', 'variants', 'transition',
  'custom', 'onAnimationStart', 'onAnimationComplete',
  'onHoverStart', 'onHoverEnd', 'onTapStart', 'onTapCancel',
];

// ✅ Styled Components con shouldForwardProp para filtrar props de motion
const NavbarContainer = styled.nav.withConfig({
  shouldForwardProp: (prop) => !MOTION_PROPS.includes(prop),
})`
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

const Logo = styled(motion.a).withConfig({
  shouldForwardProp: (prop) => !MOTION_PROPS.includes(prop),
})`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${theme.colors.text};
  
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
  
  &:hover {
    .icon {
      transform: rotate(180deg);
      transition: transform 0.5s ease;
    }
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
const NavLink = styled(motion.a).withConfig({
  shouldForwardProp: (prop) => !MOTION_PROPS.includes(prop),
})`
  padding: 0.75rem 1.25rem;
  color: ${theme.colors.textMuted};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 10px;
  transition: ${theme.transitions.fast};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 60%;
    height: 2px;
    background: ${theme.colors.gradient};
    border-radius: 2px;
    transition: transform 0.3s ease;
  }
  
  &:hover,
  &.active {
    color: ${theme.colors.text};
    
    &::after {
      transform: translateX(-50%) scaleX(1);
    }
  }
`;

const MobileMenuButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !MOTION_PROPS.includes(prop),
})`
  display: none;
  width: 45px;
  height: 45px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  transition: ${theme.transitions.fast};
    @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:hover {
    background: rgba(139, 92, 246, 0.2);
    transform: scale(1.05);
  }
`;

const MobileMenu = styled(motion.div)`
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
  gap: 2rem;
  padding: 2rem;
  overflow-y: auto;
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileNavLink = styled(motion.a).withConfig({
  shouldForwardProp: (prop) => !MOTION_PROPS.includes(prop),
})`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text};
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  transition: ${theme.transitions.fast};
  position: relative;
  width: 100%;
  text-align: center;
  
  &::before {
    content: '';    position: absolute;
    inset: 0;
    background: ${theme.colors.gradient};
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: white;
    
    &::before {
      opacity: 1;
    }
  }
`;

const ScrollToTopButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !MOTION_PROPS.includes(prop),
})`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
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

// ✅ Exportación por DEFECTO
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');  const [showScrollTop, setShowScrollTop] = useState(false);

  // ✅ Función para scroll suave considerando altura del navbar
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - NAVBAR_HEIGHT;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Efecto para detectar scroll y sección activa
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
      
      // ✅ Offset ajustado para móvil
      const offset = window.innerWidth <= 768 ? 100 : 150;
      const scrollPosition = window.scrollY + offset;
      
      const sections = NAV_ITEMS.map(item => item.href.replace('#', ''));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Cerrar menú móvil al cambiar orientación o resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToSection(href);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <>
      <NavbarContainer className={isScrolled ? 'scrolled' : ''}>
        <NavbarContent>
          <Logo 
            href="#hero" 
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >            <FiCode className="icon" />
            <span>{personalInfo.name.split(' ')[0]}</span>
          </Logo>

          <NavLinks>
            {NAV_ITEMS.map((item, index) => (
              <NavLink
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={activeSection === item.href.replace('#', '') ? 'active' : ''}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.name}
              </NavLink>
            ))}
          </NavLinks>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Abrir menú"
          >
            <FiMenu />
          </MobileMenuButton>
        </NavbarContent>
      </NavbarContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <MobileMenuButton
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(false);
              }}
              style={{ position: 'absolute', top: '2rem', right: '2rem' }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}              aria-label="Cerrar menú"
            >
              <FiX />
            </MobileMenuButton>

            {NAV_ITEMS.map((item, index) => (
              <MobileNavLink
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavClick(e, item.href);
                }}
                custom={index}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </MobileNavLink>
            ))}

            <motion.div 
              style={{ display: 'flex', gap: '1rem', marginTop: '2rem', width: '100%', justifyContent: 'center' }}
              variants={linkVariants}
              custom={NAV_ITEMS.length}
              initial="hidden"
              animate="visible"
              onClick={(e) => e.stopPropagation()}
            >
              <MobileNavLink 
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                custom={NAV_ITEMS.length + 1}
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </MobileNavLink>
              <MobileNavLink 
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                custom={NAV_ITEMS.length + 2}
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}                onClick={(e) => e.stopPropagation()}
              >
                LinkedIn
              </MobileNavLink>
            </motion.div>
          </MobileMenu>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <ScrollToTopButton
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
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
