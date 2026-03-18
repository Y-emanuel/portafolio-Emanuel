import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { projects } from '../../data/projects';
import { SectionTitle } from '../ui/SectionTitle';
import { FiExternalLink, FiGithub, FiCode, FiFilter } from 'react-icons/fi';

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${({ active }) => (active ? theme.colors.gradient : 'rgba(139, 92, 246, 0.1)')};
  border: 1px solid ${({ active }) => (active ? 'transparent' : 'rgba(139, 92, 246, 0.3)')};
  border-radius: 30px;
  color: ${({ active }) => (active ? 'white' : theme.colors.textMuted)};
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.futuristic};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// ✅ CAMBIO 1: styled(motion.div) para aceptar props de motion
const ProjectsGrid = styled(motion.div)`
  display: grid;  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled(motion.article)`
  background: ${theme.colors.cardBg};
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: ${theme.transitions.smooth};
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.hover};
    transform: translateY(-8px);
  }
`;

const ProjectImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ProjectCard}:hover & img {
    transform: scale(1.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.95));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${ProjectCard}:hover &::after {
    opacity: 1;
  }`;

const FeaturedBadge = styled(motion.span)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${theme.colors.gradient};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: ${theme.shadows.futuristic};
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${theme.colors.text};
    margin-bottom: 0.5rem;
    word-break: break-word;  /* ✅ Evitar desbordamiento */
    overflow-wrap: break-word;
  }
  
  p {
    font-size: 0.95rem;
    color: ${theme.colors.textMuted};
    line-height: 1.6;
    flex: 1;
    word-break: break-word;  /* ✅ Evitar desbordamiento */
    overflow-wrap: break-word;
  }
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
    span {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    background: rgba(139, 92, 246, 0.15);
    border: 1px solid rgba(139, 92, 246, 0.4);
    border-radius: 20px;
    color: ${theme.colors.accent};
    font-weight: 500;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  
  a {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: ${theme.colors.primary};
    color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    transition: ${theme.transitions.fast};
    
    &:hover {
      background: ${theme.colors.primaryDark};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.futuristic};
    }
    
    &.outline {
      background: transparent;
      border: 1px solid ${theme.colors.primary};
      color: ${theme.colors.primary};
      
      &:hover {
        background: rgba(139, 92, 246, 0.1);
        color: white;
      }
    }
  }
`;
const NoProjectsMessage = styled(motion.div)`
  text-align: center;
  padding: 4rem
