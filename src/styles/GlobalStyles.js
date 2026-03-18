    import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    overflow-x: hidden;
    width: 100%;
  }

  body {
    font-family: ${theme.fonts.main};
    background: ${theme.colors.secondary};
    color: ${theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    width: 100%;
    
    /* Efecto de fondo futurista */
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.1) 0%, transparent 50%);
    background-attachment: fixed;
  }

  /* ✅ Contención de texto global para responsive */
  h1, h2, h3, h4, h5, h6, p, span, div, li {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }

  /* ✅ Imágenes y medios responsivos */
  img, video, iframe, embed, object {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* ✅ Inputs y textareas */
  input, textarea, select, button {
    max-width: 100%;
    width: 100%;  }

  /* Scrollbar personalizado */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.secondary};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
    transition: ${theme.transitions.fast};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryDark};
  }

  /* Selección de texto */
  ::selection {
    background: ${theme.colors.primary};
    color: white;
  }

  /* Animación de entrada para elementos */
  .fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Efecto glow para elementos interactivos */
  .glow-hover:hover {
    box-shadow: ${theme.shadows.hover};
    transform: translateY(-2px);
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: ${theme.transitions.fast};
  }
  a:hover {
    color: ${theme.colors.primary};
  }

  button {    cursor: pointer;
    font-family: inherit;
  }
`;
