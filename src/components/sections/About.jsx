import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { personalInfo } from '../../data/personalInfo';
import { SectionTitle } from '../ui/SectionTitle';

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 20px;
  margin: 4rem auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.2);
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const InfoCard = styled(motion.div)`
  background: ${theme.colors.cardBg};
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: ${theme.transitions.smooth};
  
  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.futuristic};
    transform: translateY(-4px);
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 12px;
  border-left: 3px solid ${theme.colors.primary};
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: rgba(139, 92, 246, 0.2);
    transform: translateX(5px);
  }
  
  .icon {
    font-size: 1.5rem;
    color: ${theme.colors.accent};
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .label {
    font-size: 0.875rem;
    color: ${theme.colors.textMuted};
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.text};
  }
`;

const Description = styled.div`
  h3 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: ${theme.colors.text};
    
    span {
      color: ${theme.colors.primary};
    }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${theme.colors.textMuted};
    margin-bottom: 1.5rem;
  }
  
  .highlight {
    color: ${theme.colors.accent};
    font-weight: 600;
  }
`;

const SoftSkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const SoftSkillBadge = styled(motion.div)`
  padding: 0.75rem 1.25rem;
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid rgba(34, 211, 238, 0.4);
  border-radius: 30px;
  text-align: center;
  font-size: 0.9rem;
  color: ${theme.colors.accent};
  font-weight: 500;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.accent};
    color: ${theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.4);
  }
`;

// ✅ Exportación por DEFECTO
const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const softSkills = [
    "Proactividad",
    "Aprendizaje Rápido",
    "Resolución de Problemas",
    "Adaptabilidad",
    "Comunicación",
    "Trabajo en Equipo",
  ];

  return (
    <Section id="about">
      <SectionTitle 
        title="Sobre Mí" 
        subtitle="Conocé más sobre mi perfil profesional"
      />
      
      <Content>
        {/* Columna Izquierda - Descripción */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Description>
            <motion.h3 variants={itemVariants}>
              Hola, soy <span>{personalInfo.name}</span> 👋
            </motion.h3>
            
            <motion.p variants={itemVariants}>
              Soy un desarrollador web y de aplicaciones de <span className="highlight">23 años</span>, 
              apasionado por crear soluciones digitales modernas y funcionales. Me caracterizo por ser 
              <span className="highlight"> proactivo</span> y tener una gran capacidad de 
              <span className="highlight"> aprendizaje rápido</span>.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              Actualmente me estoy formando como <span className="highlight">Full Stack Developer </span> 
              en CodeHouse, donde estoy profundizando en tecnologías como React, Node.js, y bases de datos. 
              Mi objetivo es crear experiencias web que combinen diseño elegante con funcionalidad robusta.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              Siempre estoy buscando nuevos desafíos que me permitan crecer profesionalmente y 
              aportar valor a través de código limpio, optimizado y escalable.
            </motion.p>
          </Description>
          
          {/* Soft Skills */}
          <motion.div variants={itemVariants}>
            <h4 style={{ marginBottom: '1rem', color: theme.colors.text }}>Habilidades Blandas</h4>
            <SoftSkillsGrid>
              {softSkills.map((skill, index) => (
                <SoftSkillBadge
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </SoftSkillBadge>
              ))}
            </SoftSkillsGrid>
          </motion.div>
        </motion.div>
        
        {/* Columna Derecha - Info Personal */}
        <InfoCard
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -4 }}
        >
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Información Personal</h3>
          
          {/* ✅ CAMBIO: InfoItem sin variants (no necesita animación) */}
          <InfoItem>
            <span className="icon">👤</span>
            <div>
              <span className="label">Nombre Completo</span>
              <span className="value">{personalInfo.name}</span>
            </div>
          </InfoItem>
          
          <InfoItem>
            <span className="icon">🎂</span>
            <div>
              <span className="label">Edad</span>
              <span className="value">{personalInfo.age} años</span>
            </div>
          </InfoItem>
          
          <InfoItem>
            <span className="icon">📧</span>
            <div>
              <span className="label">Email</span>
              <span className="value">{personalInfo.email}</span>
            </div>
          </InfoItem>
          
          <InfoItem>
            <span className="icon">📱</span>
            <div>
              <span className="label">Teléfono</span>
              <span className="value">{personalInfo.phone}</span>
            </div>
          </InfoItem>
          
          <InfoItem>
            <span className="icon">📍</span>
            <div>
              <span className="label">Ubicación</span>
              <span className="value">{personalInfo.location}</span>
            </div>
          </InfoItem>
        </InfoCard>
      </Content>
    </Section>
  );
};

export default About;