import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { personalInfo } from '../../data/personalInfo';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiCode } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: rgba(15, 23, 42, 0.95);
  border-top: 1px solid rgba(139, 92, 246, 0.3);
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
  backdrop-filter: blur(10px);
`;

// ✅ FooterContent es motion.div → acepta props de motion
const FooterContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterSection = styled.div`
  h4 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: ${theme.colors.text};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &::before {
      content: '';
      width: 3px;
      height: 20px;
      background: ${theme.colors.gradient};
      border-radius: 2px;
    }
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 0.75rem;
    
    a {
      color: ${theme.colors.textMuted};
      text-decoration: none;
      transition: ${theme.transitions.fast};
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      &:hover {
        color: ${theme.colors.primary};
        transform: translateX(5px);
      }
      
      svg {
        font-size: 1rem;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 12px;
    color: ${theme.colors.primary};
    font-size: 1.25rem;
    transition: ${theme.transitions.smooth};
    text-decoration: none;
    
    &:hover {
      background: ${theme.colors.primary};
      color: white;
      transform: translateY(-5px) scale(1.1);
      box-shadow: ${theme.shadows.futuristic};
    }
  }
`;

const ContactInfo = styled.div`
  p {
    color: ${theme.colors.textMuted};
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    svg {
      color: ${theme.colors.accent};
      min-width: 20px;
    }
    
    a {
      color: ${theme.colors.textMuted};
      text-decoration: none;
      transition: ${theme.transitions.fast};
      
      &:hover {
        color: ${theme.colors.primary};
      }
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 0.9rem;
  
  .heart {
    color: #ef4444;
    animation: heartbeat 1.5s ease-in-out infinite;
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  span {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 20px;
    color: ${theme.colors.textMuted};
  }
`;

const BackToTop = styled(motion.button)`
  width: 45px;
  height: 45px;
  background: ${theme.colors.gradient};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.futuristic};
  transition: ${theme.transitions.smooth};
  
  &:hover {
    box-shadow: ${theme.shadows.hover};
    transform: translateY(-3px);
  }
`;

// ✅ Exportación por DEFECTO
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Educación', href: '#education' },
    { name: 'Contacto', href: '#contact' },
  ];

  const technologies = [
    'React',
    'Node.js',
    'JavaScript',
    'MongoDB',
    'Git',
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <FooterContainer>
      {/* ✅ FooterContent es motion.div → acepta props de motion */}
      <FooterContent 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
      >
        {/* Sección 1: Sobre el Portafolio */}
        {/* ✅ CAMBIO: FooterSection sin variants (la animación viene del padre) */}
        <FooterSection>
          <h4>Brian Emanuel Ybalo</h4>
          <p style={{ color: theme.colors.textMuted, lineHeight: 1.7 }}>
            Desarrollador web y de aplicaciones apasionado por crear soluciones 
            digitales modernas, funcionales y escalables.
          </p>
          <SocialLinks>
            <motion.a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub />
            </motion.a>
            <motion.a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLinkedin />
            </motion.a>
            <motion.a
              href={personalInfo.social.email}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail />
            </motion.a>
          </SocialLinks>
        </FooterSection>

        {/* Sección 2: Navegación Rápida */}
        <FooterSection>
          <h4>Navegación</h4>
          <FooterLinks>
            {quickLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <a href={link.href}>
                  <FiCode /> {link.name}
                </a>
              </motion.li>
            ))}
          </FooterLinks>
        </FooterSection>

        {/* Sección 3: Contacto */}
        <FooterSection>
          <h4>Contacto</h4>
          <ContactInfo>
            <p>
              <FiMail />
              <a href={personalInfo.social.email}>{personalInfo.email}</a>
            </p>
            <p>
              <FiGithub />
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
            </p>
            <p>
              <FiLinkedin />
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
            </p>
          </ContactInfo>
        </FooterSection>

        {/* Sección 4: Tech Stack */}
        <FooterSection>
          <h4>Tech Stack</h4>
          <TechStack>
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </TechStack>
        </FooterSection>
      </FooterContent>

      {/* Footer Bottom */}
      <FooterBottom>
        <Copyright>
          © {currentYear} <strong style={{ color: theme.colors.primary }}>{personalInfo.name}</strong>. 
          Hecho con <span className="heart"><FiHeart /></span> y ☕
        </Copyright>
        
        <BackToTop
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Volver arriba"
        >
          ↑
        </BackToTop>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;