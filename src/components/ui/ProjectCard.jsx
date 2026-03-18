import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const Card = styled(motion.article)`
  background: ${theme.colors.cardBg};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  flex-direction: column;
  transition: ${theme.transitions.smooth};
  backdrop-filter: blur(10px);
  
  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.hover};
    transform: translateY(-8px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${Card}:hover & img {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(15, 23, 42, 0.9));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${Card}:hover &::after {
    opacity: 1;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  span {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    background: rgba(139, 92, 246, 0.2);
    border: 1px solid ${theme.colors.primary};
    border-radius: 20px;
    color: ${theme.colors.text};
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
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.875rem;
    transition: ${theme.transitions.fast};
    
    &:hover {
      background: ${theme.colors.primaryDark};
      transform: translateY(-2px);
    }
    
    &.outline {
      background: transparent;
      border: 1px solid ${theme.colors.primary};
      &:hover {
        background: rgba(139, 92, 246, 0.1);
      }
    }
  }
`;

export const ProjectCard = ({ project, index }) => {
  return (
    <Card
      // ✅ Props que van al DOM → llevan $ (evitan warnings)
      $initial={{ opacity: 0, y: 40 }}
      $whileInView={{ opacity: 1, y: 0 }}
      $viewport={{ once: true, margin: "-50px" }}
      
      // ✅ Props que framer-motion consume → SIN $ (animaciones funcionan)
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <ImageWrapper>
        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            // ✅ Fallback con placehold.co (más estable que via.placeholder.com)
            const encodedTitle = encodeURIComponent(project.title);
            e.target.src = `https://placehold.co/400x200/1e293b/8b5cf6?text=${encodedTitle}&font=roboto`;
          }}
        />
      </ImageWrapper>
      
      <Content>
        <div>
          <h3>{project.title}</h3>
          <p style={{ color: theme.colors.textMuted, fontSize: '0.95rem' }}>
            {project.description}
          </p>
        </div>
        
        <TechTags>
          {project.technologies.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </TechTags>
        
        <ButtonGroup>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <FiExternalLink /> Ver Demo
            </a>
          )}
          {project.codeUrl && (
            <a 
              href={project.codeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="outline"
            >
              <FiGithub /> Código
            </a>
          )}
        </ButtonGroup>
      </Content>
    </Card>
  );
};