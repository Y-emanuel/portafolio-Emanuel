import { motion } from "framer-motion";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import * as Icons from 'react-icons/si';
import * as DevIcons from 'react-icons/di';

const Card = styled(motion.div)`
  background: ${theme.colors.cardBg};
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: ${theme.transitions.smooth};
  backdrop-filter: blur(10px);
  
  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.futuristic};
    transform: translateY(-4px);
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 8px;
  
  svg {
    display: block !important;
    color: inherit !important;
    fill: currentColor !important;
  }
`;

const Info = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  span {
    font-size: 0.875rem;
    color: ${theme.colors.textMuted};
    background: rgba(34, 211, 238, 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    display: inline-block;
  }
`;

export const SkillCard = ({ name, level, icon }) => {
  // ✅ Buscar en ambas librerías (si y di)
  const IconComponent = 
    Icons[icon] ||           // 1. Simple Icons
    DevIcons[icon] ||        // 2. DevIcons
    null;                    // 3. Si no existe, null
  
  return (
    <Card
      $initial={{ opacity: 0, y: 20 }}
      $animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <IconWrapper>
        {/* ✅ Solo renderizar si el ícono existe */}
        {IconComponent && <IconComponent key={icon} />}
      </IconWrapper>
      <Info>
        <h4>{name}</h4>
        <span>{level}</span>
      </Info>
    </Card>
  );
};