export default function themeTypography(theme) {
  return {
    fontFamily: 'poppins',
    h6: {
      fontWeight: 500,
      color: theme.heading,
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '0.875rem',
      color: theme.heading,
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      color: theme.heading,
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      color: theme.heading,
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      color: theme.heading,
      fontWeight: 700,
    },
    h1: {
      fontSize: '2.125rem',
      color: theme.heading,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.textDark,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: theme.darkTextSecondary,
    },
    caption: {
      fontSize: '0.75rem',
      color: theme.darkTextSecondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em',
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: theme.darkTextPrimary,
    },
    button: {
      textTransform: 'capitalize',
    },
    mainContent: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 'calc(100vh - 112px)',
      flexGrow: 1,
      padding: '16px',
      marginTop: '80px',
    },
  }
}
