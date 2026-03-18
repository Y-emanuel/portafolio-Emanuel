import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { SectionTitle } from '../ui/SectionTitle';
import { FiBook, FiCalendar, FiAward, FiClock, FiCheckCircle, FiLoader } from 'react-icons/fi';

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4rem 1rem;
  }
`;

// ✅ CAMBIO: Grid responsive con media queries
const EducationGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const EducationCard = styled(motion.div)`
  background: ${theme.colors.cardBg};
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: ${theme.transitions.smooth};
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &::before {
    content: '';    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${theme.colors.gradient};
    border-radius: 4px 0 0 4px;
  }
  
  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.futuristic};
    transform: translateY(-8px);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem 1.25rem;
    border-radius: 12px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  .icon {
    width: 50px;
    height: 50px;
    min-width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(139, 92, 246, 0.2);
    border-radius: 12px;
    color: ${theme.colors.primary};
    font-size: 1.5rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    
    .icon {
      width: 40px;
      height: 40px;
      min-width: 40px;
      font-size: 1.25rem;
    }  }
`;

const CardContent = styled.div`
  flex: 1;
  
  h3 {
    font-size: clamp(1.1rem, 4vw, 1.25rem);
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${theme.colors.text};
    line-height: 1.3;
    word-break: break-word;
    overflow-wrap: break-word;
  }
  
  .institution {
    font-size: clamp(0.9rem, 3vw, 1rem);
    color: ${theme.colors.accent};
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: clamp(0.8rem, 2.5vw, 0.875rem);
    color: ${theme.colors.textMuted};
    word-break: break-word;
    overflow-wrap: break-word;
    
    svg {
      color: ${theme.colors.primary};
      min-width: 16px;
    }
  }
    @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
`;

const ContentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ListItem = styled(motion.li)`
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: clamp(0.85rem, 3vw, 0.95rem);
  color: ${theme.colors.textMuted};
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
  
  &::before {
    content: '▹';
    position: absolute;
    left: 0;
    top: 0;
    color: ${theme.colors.accent};
    font-weight: bold;
  }
  
  > span:first-child {
    flex: 1;
    min-width: 0;
    word-break: break-word;
    overflow-wrap: break-word;
  }
  
  &:hover {
    color: ${theme.colors.text};
    transform: translateX(5px);
    transition: ${theme.transitions.fast};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {    padding-left: 1.25rem;
    margin-bottom: 0.65rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }
`;

const StatusBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(34, 211, 238, 0.15);
  border: 1px solid ${theme.colors.accent};
  border-radius: 30px;
  font-size: clamp(0.8rem, 2.5vw, 0.875rem);
  color: ${theme.colors.accent};
  font-weight: 600;
  margin-top: 1rem;
  white-space: nowrap;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: ${theme.colors.accent};
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
    margin-top: 0.75rem;
  }
`;

// ✅ Badge para items individuales
const ItemBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: clamp(0.7rem, 2.5vw, 0.75rem);  font-weight: 500;
  border-radius: 20px;
  white-space: nowrap;
  
  &.completed {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.4);
  }
  
  &.learning {
    background: rgba(34, 211, 238, 0.15);
    color: ${theme.colors.accent};
    border: 1px solid rgba(34, 211, 238, 0.4);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.2rem 0.4rem;
    font-size: 0.7rem;
    gap: 0.2rem;
    
    svg {
      width: 10px;
      height: 10px;
    }
  }
`;

// ✅ Exportación por DEFECTO
const Education = () => {
  const educationData = [
    {
      id: 1,
      title: "Desarrollador Full Stack",
      institution: "CodeHouse",
      period: "2025 – En Curso",
      status: "En Progreso",
      icon: FiBook,
      contents: [
        { name: "JavaScript Avanzado (ES6+)", status: "completed" },
        { name: "React.js y Hooks", status: "completed" },
        { name: "Node.js y Express", status: "completed" },
        { name: "Bases de Datos SQL y MySQL", status: "completed" },
        { name: "Testing y Debugging", status: "learning" },
        { name: "Cloud Computing (AWS)", status: "learning" },
        { name: "Git y Control de Versiones", status: "completed" },
        { name: "APIs REST y GraphQL", status: "learning" },
      ],
    },
    {      id: 2,
      title: "Desarrollo Web Frontend",
      institution: "Autoformación",
      period: "2023 – 2024",
      status: "Completado",
      icon: FiAward,
      contents: [
        { name: "HTML5 Semántico", status: "completed" },
        { name: "CSS3 y Flexbox/Grid", status: "completed" },
        { name: "JavaScript DOM Manipulation", status: "completed" },
        { name: "Responsive Design", status: "completed" },
        { name: "Accesibilidad Web", status: "completed" },
        { name: "Performance Optimization", status: "completed" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };

  // ✅ Helper para renderizar badge según estado
  const renderStatusBadge = (status) => {
    if (status === "completed") {
      return (
        <ItemBadge className="completed">
          <FiCheckCircle size={12} /> Completado
        </ItemBadge>
      );
    }
    if (status === "learning") {
      return (
        <ItemBadge className="learning">
          <FiLoader size={12} className="animate-spin" /> En aprendizaje
        </ItemBadge>
      );
    }    return null;
  };

  return (
    <Section id="education">
      <SectionTitle 
        title="Educación" 
        subtitle="Mi formación académica y profesional"
      />
      
      <EducationGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {educationData.map((edu, index) => {
          const IconComponent = edu.icon;
          
          return (
            <EducationCard
              key={edu.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ delay: index * 0.1 }}
            >
              <CardHeader>
                <div className="icon">
                  <IconComponent />
                </div>
                <CardContent>
                  <h3>{edu.title}</h3>
                  <div className="institution">
                    <FiAward /> {edu.institution}
                  </div>
                </CardContent>
              </CardHeader>
              
              <MetaInfo>
                <div className="meta-item">
                  <FiCalendar />
                  <span>{edu.period}</span>
                </div>
                <div className="meta-item">
                  <FiClock />
                  <span>{edu.status === "En Progreso" ? "Actualmente cursando" : "Finalizado"}</span>
                </div>
              </MetaInfo>
              
              <ContentList>                {edu.contents.map((item, i) => (
                  <ListItem
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span>{item.name}</span>
                    {renderStatusBadge(item.status)}
                  </ListItem>
                ))}
              </ContentList>
              
              {edu.status === "En Progreso" && (
                <StatusBadge
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {edu.status}
                </StatusBadge>
              )}
            </EducationCard>
          );
        })}
      </EducationGrid>
    </Section>
  );
};

export default Education;
