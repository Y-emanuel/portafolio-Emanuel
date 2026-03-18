import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  /* Efecto de texto con gradiente */
  background: ${theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Línea decorativa debajo del título */
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${theme.colors.gradient};
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.textMuted};
  max-width: 600px;
  margin: 1.5rem auto 0;
  line-height: 1.6;
`;

// Variantes de animación reutilizables
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] // easing suave y futurista
    } 
  },
};

// ✅ Exportación NOMBRADA (importante para el import en Skills.jsx)
export const SectionTitle = ({ title, subtitle }) => {
  return (
    <TitleContainer as={motion.div} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
      <motion.h2 variants={itemVariants} className="title">
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p variants={itemVariants} className="subtitle">
          {subtitle}
        </motion.p>
      )}
    </TitleContainer>
  );
};