import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { projects } from "../../data/projects";
import { SectionTitle } from "../ui/SectionTitle";
import { FiExternalLink, FiGithub, FiCode, FiFilter } from "react-icons/fi";

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

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  width: 100%;
`;

const FilterButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${({ active }) =>
    active ? theme.colors.gradient : "rgba(139, 92, 246, 0.1)"};
  border: 1px solid
    ${({ active }) => (active ? "transparent" : "rgba(139, 92, 246, 0.3)")};
  border-radius: 30px;
  color: ${({ active }) => (active ? "white" : theme.colors.textMuted)};
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.futuristic};  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
`;

// ✅ CAMBIO: Grid responsive con media queries
const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
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

const ProjectCard = styled(motion.article)`
  background: ${theme.colors.cardBg};
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: ${theme.transitions.smooth};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  
  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.hover};
    transform: translateY(-8px);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {    border-radius: 12px;
  }
`;

const ProjectImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  width: 100%;
  
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
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 40%,
      rgba(15, 23, 42, 0.95)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${ProjectCard}:hover &::after {
    opacity: 1;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 180px;
  }
`;

const FeaturedBadge = styled(motion.span)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${theme.colors.gradient};
  border-radius: 20px;  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: ${theme.shadows.futuristic};
  white-space: nowrap;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.4rem 0.75rem;
    font-size: 0.7rem;
    top: 0.75rem;
    right: 0.75rem;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  
  h3 {
    font-size: clamp(1.1rem, 4vw, 1.25rem);
    font-weight: 700;
    color: ${theme.colors.text};
    margin-bottom: 0.5rem;
    line-height: 1.3;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  p {
    font-size: clamp(0.9rem, 3vw, 0.95rem);
    color: ${theme.colors.textMuted};
    line-height: 1.6;
    flex: 1;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.25rem 1rem;
    gap: 0.85rem;
  }`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;

  span {
    font-size: clamp(0.7rem, 2.5vw, 0.75rem);
    padding: 0.25rem 0.65rem;
    background: rgba(139, 92, 246, 0.15);
    border: 1px solid rgba(139, 92, 246, 0.4);
    border-radius: 20px;
    color: ${theme.colors.accent};
    font-weight: 500;
    word-break: break-word;
    overflow-wrap: break-word;
    
    @media (max-width: ${theme.breakpoints.mobile}) {
      padding: 0.2rem 0.5rem;
      font-size: 0.7rem;
      border-radius: 16px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  width: 100%;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.6rem;
  }

  a {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: ${theme.colors.primary};
    color: white;
    border-radius: 10px;    font-weight: 600;
    font-size: clamp(0.85rem, 3vw, 0.875rem);
    text-decoration: none;
    transition: ${theme.transitions.fast};
    word-break: break-word;
    overflow-wrap: break-word;

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
    
    @media (max-width: ${theme.breakpoints.mobile}) {
      padding: 0.65rem;
      font-size: 0.85rem;
      min-height: 44px;
    }
  }
`;

const NoProjectsMessage = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  color: ${theme.colors.textMuted};
  width: 100%;

  svg {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: ${theme.colors.primary};
  }

  h3 {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    color: ${theme.colors.text};
    margin-bottom: 0.5rem;
    word-break: break-word;
  }  
  p {
    font-size: clamp(0.9rem, 3vw, 1rem);
    word-break: break-word;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 3rem 1rem;
  }
`;

// ✅ Exportación por DEFECTO
const Projects = () => {
  const [filter, setFilter] = useState("all");

  const categories = [
    "all",
    ...new Set(projects.flatMap((p) => p.technologies.slice(0, 1))),
  ];
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: -40, transition: { duration: 0.3 } },
  };

  return (
    <Section id="projects">
      <SectionTitle
        title="Proyectos"
        subtitle="Explorá mi trabajo y contribuciones"
      />

      <FilterContainer>        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiFilter /> Todos
        </FilterButton>

        {categories.slice(1).map((category) => (
          <FilterButton
            key={category}
            active={filter === category}
            onClick={() => setFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProjectsGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{ y: -8 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectImage>
                  {project.featured && (
                    <FeaturedBadge
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      ⭐ Destacado
                    </FeaturedBadge>                  )}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      const encodedTitle = encodeURIComponent(project.title);
                      e.target.src = `https://placehold.co/400x200/1e293b/8b5cf6?text=${encodedTitle}&font=roboto`;
                    }}
                  />
                </ProjectImage>

                <ProjectContent>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>

                  <TechTags>
                    {project.technologies.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </TechTags>

                  <ButtonGroup>
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiExternalLink /> Ver Demo
                      </motion.a>
                    )}
                    {project.codeUrl && (
                      <motion.a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="outline"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiGithub /> Código
                      </motion.a>
                    )}
                  </ButtonGroup>
                </ProjectContent>              </ProjectCard>
            ))
          ) : (
            <NoProjectsMessage
              key="no-projects"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <FiCode />
              <h3>No hay proyectos en esta categoría</h3>
              <p>Probá con otro filtro o volvé más tarde.</p>
            </NoProjectsMessage>
          )}
        </AnimatePresence>
      </ProjectsGrid>
    </Section>
  );
};

export default Projects;
