import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { personalInfo } from '../../data/personalInfo';
import { AnimatedButton } from '../ui/AnimatedButton';

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow-x: hidden;  /* ✅ Evitar scroll horizontal en móvil */
  
  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
    top: -200px;
    right: -200px;
    animation: pulse 8s ease-in-out infinite;
    pointer-events: none;
    
    /* ✅ Ocultar efecto en móvil para mejor performance */
    @media (max-width: ${theme.breakpoints.tablet}) {
      display: none;
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 0.8; }
  }
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;  /* ✅ Asegurar que no se desborde */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;    gap: 2rem;  /* ✅ Menos gap en móvil */
  }
`;

const TextContent = styled.div`
  h1 {
    font-size: clamp(2rem, 8vw, 4rem);  /* ✅ clamp más agresivo para móvil */
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1rem;
    
    span {
      background: ${theme.colors.gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  .subtitle {
    font-size: clamp(1rem, 4vw, 1.25rem);  /* ✅ Texto responsive */
    color: ${theme.colors.textMuted};
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;  /* ✅ Centrar en móvil */
  }
  
  .age-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(34, 211, 238, 0.1);
    border: 1px solid ${theme.colors.accent};
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    color: ${theme.colors.accent};
    margin-left: auto;
    margin-right: auto;  /* ✅ Centrar en móvil */
  }
`;

const ImageWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    order: -1;    margin-bottom: 2rem;
  }
  
  .profile-container {
    position: relative;
    width: 280px;
    height: 280px;
    
    @media (max-width: ${theme.breakpoints.mobile}) {
      width: 220px;  /* ✅ Más pequeño en móvil */
      height: 220px;
    }
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${theme.colors.primary};
    box-shadow: ${theme.shadows.futuristic};
    transition: ${theme.transitions.smooth};
  }
  
  .profile-container:hover .profile-image {
    transform: scale(1.02);
    box-shadow: ${theme.shadows.hover};
  }
  
  .ring {
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: ${theme.colors.primary};
    border-bottom-color: ${theme.colors.accent};
    animation: spin 3s linear infinite;
    
    /* ✅ Ocultar anillo en móvil para mejor performance */
    @media (max-width: ${theme.breakpoints.mobile}) {
      display: none;
    }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ButtonGroup = styled.div`  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;  /* ✅ Centrar botones en móvil */
  }
`;

// ✅ Función helper para scroll suave (compatible con móvil)
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    // ✅ Offset para navbar fija si la tienes
    const offset = 80; 
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Section id="hero">
      <Content>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >          <TextContent>
            <motion.div variants={itemVariants} className="age-badge">
              <span>👋</span> {personalInfo.age} años
            </motion.div>
            
            <motion.h1 variants={itemVariants}>
              Hola, soy <br />
              <span>{personalInfo.name}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="subtitle">
              {personalInfo.tagline}
            </motion.p>
            
            <ButtonGroup>
              <AnimatedButton 
                as="button"
                onClick={() => scrollToSection('projects')}
                variant="primary"
                $whileHover={{ scale: 1.05 }}  /* ✅ Transient prop */
                $whileTap={{ scale: 0.95 }}
              >
                Ver Proyectos →
              </AnimatedButton>
              
              <AnimatedButton 
                as="button"
                onClick={() => scrollToSection('contact')}
                variant="outline"
                $whileHover={{ scale: 1.05 }}
                $whileTap={{ scale: 0.95 }}
              >
                Contáctame
              </AnimatedButton>
            </ButtonGroup>
          </TextContent>
        </motion.div>
        
        <ImageWrapper
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="profile-container">
            <div className="ring"></div>
            <img 
              src={personalInfo.photo} 
              alt={personalInfo.name}
              className="profile-image"
              loading="eager"  /* ✅ Carga prioritaria para LCP */              onError={(e) => {
                e.target.src = 'https://ui-avatars.com/api/?name=Brian+Ybalo&size=280&background=8B5CF6&color=fff&bold=true';
              }}
            />
          </div>
        </ImageWrapper>
      </Content>
    </Section>
  );
};

export default Hero;
