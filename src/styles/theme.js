// 🎨 Paleta futurista con énfasis en violeta (preferencia del usuario)
export const theme = {
  colors: {
    primary: '#8B5CF6',        // Violeta principal
    primaryDark: '#7C3AED',    // Violeta oscuro para hover
    secondary: '#0F172A',      // Fondo oscuro elegante
    accent: '#22D3EE',         // Cian para detalles futuristas
    text: '#F8FAFC',           // Texto claro
    textMuted: '#94A3B8',      // Texto secundario
    cardBg: 'rgba(30, 41, 59, 0.7)', // Fondo de tarjetas con transparencia
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
  },
  fonts: {
    main: "'Inter', 'Segoe UI', system-ui, sans-serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1080px',
    wide: '1440px',
  },
  shadows: {
    futuristic: '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(34, 211, 238, 0.1)',
    hover: '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(34, 211, 238, 0.2)',
  },
  transitions: {
    smooth: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    fast: 'all 0.2s ease-in-out',
  },
};