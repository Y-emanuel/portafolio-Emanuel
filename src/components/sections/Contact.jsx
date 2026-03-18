import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { personalInfo } from '../../data/personalInfo';
import { SectionTitle } from '../ui/SectionTitle';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend, FiLoader } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  background: ${theme.colors.cardBg};
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 16px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  height: fit-content;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: ${theme.colors.text};
  }
`;

const ContactItem = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 12px;
  border: 1px solid transparent;
  transition: ${theme.transitions.smooth};
  text-decoration: none;
  color: ${theme.colors.text};
  
  &:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: ${theme.colors.primary};
    transform: translateX(8px);
    box-shadow: ${theme.shadows.futuristic};
  }
  
  .icon {
    font-size: 1.5rem;
    color: ${theme.colors.accent};
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(34, 211, 238, 0.1);
    border-radius: 50%;
  }
  
  .content {
    flex: 1;
    
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
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(139, 92, 246, 0.3);
  
  a {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 12px;
    color: ${theme.colors.primary};
    font-size: 1.5rem;
    transition: ${theme.transitions.smooth};
    text-decoration: none;
    
    &:hover {
      background: ${theme.colors.primary};
      color: white;
      transform: translateY(-5px);
      box-shadow: ${theme.shadows.futuristic};
    }
  }
`;

const ContactForm = styled(motion.form)`
  background: ${theme.colors.cardBg};
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 16px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: ${theme.colors.text};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: ${theme.colors.textMuted};
    font-weight: 500;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 1rem;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 10px;
    color: ${theme.colors.text};
    font-size: 1rem;
    font-family: inherit;
    transition: ${theme.transitions.fast};
    
    &::placeholder {
      color: ${theme.colors.textMuted};
    }
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    }
    
    &:hover {
      border-color: rgba(139, 92, 246, 0.5);
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: ${theme.colors.gradient};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: ${theme.transitions.smooth};
  box-shadow: ${theme.shadows.futuristic};
  
  &:hover {
    box-shadow: ${theme.shadows.hover};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid ${theme.colors.accent};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  color: ${theme.colors.accent};
  margin-top: 1rem;
`;

// ✅ Exportación por DEFECTO
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, message } = formData;
    
    // Validación básica
    if (!name || !email || !message) {
      alert('Por favor completá todos los campos');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 📧 1. Enviar email con EmailJS
      await emailjs.send(
        'service_0ydi109',
        'template_ar7ml39',
        {
          name: name,
          time: new Date().toLocaleString('es-AR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          message: message,
          from_email: email,
        },
        'nNFz97Tggh4BaXR8k'  // ✅ Tu Public Key real
      );
      
      // 💬 2. Preparar y abrir WhatsApp
      const whatsappMessage = `
*🚀 Nuevo contacto desde mi portafolio*

👤 *Nombre:* ${name}
📧 *Email:* ${email}
🕐 *Hora:* ${new Date().toLocaleString('es-AR')}

💬 *Mensaje:*
${message}

---
*Enviado desde: ${window.location.hostname}*
      `.trim();
      
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappNumber = '5491154827168';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Error:', error);
      
      // Fallback: si EmailJS falla, al menos abrir WhatsApp
      const whatsappMessage = `*Nuevo contacto:* ${name} (${email})\n\n${message}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappNumber = '5491154827168';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      alert('El email tuvo un problema, pero tu mensaje se abrió en WhatsApp. ¡Gracias!');
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // ✅ itemVariants eliminado (no se usaba)

  return (
    <Section id="contact">
      <SectionTitle 
        title="Contacto" 
        subtitle="¿Tenés un proyecto en mente? ¡Hablemos!"
      />
      
      <ContactGrid>
        {/* Columna Izquierda - Información de Contacto */}
        <ContactInfo
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Información de Contacto</h3>
          
          <ContactItem href={`mailto:${personalInfo.email}`}>
            <span className="icon"><FiMail /></span>
            <div className="content">
              <span className="label">Email</span>
              <span className="value">{personalInfo.email}</span>
            </div>
          </ContactItem>
          
          <ContactItem href={`tel:${personalInfo.phone}`}>
            <span className="icon"><FiPhone /></span>
            <div className="content">
              <span className="label">Teléfono</span>
              <span className="value">{personalInfo.phone}</span>
            </div>
          </ContactItem>
          
          <ContactItem 
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon"><FiGithub /></span>
            <div className="content">
              <span className="label">GitHub</span>
              <span className="value">Ver perfil</span>
            </div>
          </ContactItem>
          
          <ContactItem 
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon"><FiLinkedin /></span>
            <div className="content">
              <span className="label">LinkedIn</span>
              <span className="value">Ver perfil</span>
            </div>
          </ContactItem>
          
          <SocialLinks>
            <motion.a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub />
            </motion.a>
            <motion.a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLinkedin />
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail />
            </motion.a>
          </SocialLinks>
        </ContactInfo>
        
        {/* Columna Derecha - Formulario */}
        <ContactForm
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3>Envíame un Mensaje</h3>
          
          <FormGroup>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Contame sobre tu proyecto..."
              required
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin" /> Enviando...
              </>
            ) : (
              <>
                <FiSend /> Enviar por Email + WhatsApp
              </>
            )}
          </SubmitButton>
          
          {submitSuccess && (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ✅ ¡Mensaje enviado! Se abrió WhatsApp para confirmar.
            </SuccessMessage>
          )}
        </ContactForm>
      </ContactGrid>
    </Section>
  );
};

export default Contact;