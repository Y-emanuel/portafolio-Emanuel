import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const MOTION_PROPS = [
  'whileHover', 'whileTap', 'whileDrag', 'whileFocus',
  'initial', 'animate', 'exit', 'variants', 'transition',
  'custom', 'onAnimationStart', 'onAnimationComplete',
  'onHoverStart', 'onHoverEnd', 'onTapStart', 'onTapCancel',
];

const StyledButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !MOTION_PROPS.includes(prop),
})`
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: ${theme.transitions.fast};
  border: none;
  cursor: pointer;
  
  ${({ $variant }) => $variant === 'primary' && `
    background: ${theme.colors.gradient};
    color: white;
    box-shadow: ${theme.shadows.futuristic};
    &:hover { box-shadow: ${theme.shadows.hover}; }
  `}
  
  ${({ $variant }) => $variant === 'outline' && `
    background: transparent;
    border: 2px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    &:hover {
      background: rgba(139, 92, 246, 0.1);
      color: white;
    }
  `}
`;

export const AnimatedButton = ({ children, variant = 'primary', ...props }) => {
  return (
    <StyledButton
      $variant={variant}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};