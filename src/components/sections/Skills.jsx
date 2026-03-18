import { motion as Motion } from 'framer-motion';  // ✅ Alias en mayúscula
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { skills } from '../../data/skills';
import { SkillCard } from '../ui/SkillCard';
import { SectionTitle } from '../ui/SectionTitle';

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Category = styled.div`
  margin-bottom: 3rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    &::before {
      content: '';
      width: 4px;
      height: 24px;
      background: ${theme.colors.gradient};
      border-radius: 2px;
    }
  }
`;

const SoftSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  
  span {
    padding: 0.5rem 1.25rem;
    background: rgba(139, 92, 246, 0.15);
    border: 1px solid rgba(139, 92, 246, 0.4);
    border-radius: 30px;
    font-size: 0.9rem;
    transition: ${theme.transitions.fast};
    
    &:hover {
      background: ${theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.futuristic};
    }
  }
`;

export const Skills = () => {
  return (
    <Section id="skills">
      <SectionTitle 
        title="Habilidades Técnicas" 
        subtitle="Stack tecnológico y competencias profesionales"
      />
      
      {/* Lenguajes y Frameworks */}
      <Category>
        <h3>Lenguajes</h3>
        <Grid>
          {skills.languages.map((skill, index) => (
            <SkillCard key={skill.name} {...skill} index={index} />
          ))}
        </Grid>
      </Category>
      
      <Category>
        <h3>Frameworks & Librerías</h3>
        <Grid>
          {skills.frameworks.map((skill, index) => (
            <SkillCard key={skill.name} {...skill} index={index} />
          ))}
        </Grid>
      </Category>
      
      <Category>
        <h3>Bases de Datos</h3>
        <Grid>
          {skills.databases.map((skill, index) => (
            <SkillCard key={skill.name} {...skill} index={index} />
          ))}
        </Grid>
      </Category>
      
      <Category>
        <h3>Herramientas</h3>
        <Grid>
          {skills.tools.map((skill, index) => (
            <SkillCard key={skill.name} {...skill} index={index} />
          ))}
        </Grid>
      </Category>
      
      {/* Habilidades Blandas - Diseño innovador */}
      <Category>
        <h3>Habilidades Blandas</h3>
        <SoftSkills>
          {skills.softSkills.map((skill, index) => (
            <Motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {skill}
            </Motion.span>
          ))}
        </SoftSkills>
      </Category>
    </Section>
  );
};

export default Skills;