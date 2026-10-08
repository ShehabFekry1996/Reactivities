import { alpha, createTheme } from "@mui/material/styles";

const primary = '#6C5CE7';

export const gradient = 'linear-gradient(135deg, #6C5CE7 0%, #8E7CFF 45%, #00B8A9 100%)';

export const theme = createTheme({
    cssVariables: { colorSchemeSelector: 'class' },
    colorSchemes: {
        light: {
            palette: {
                primary: { main: primary },
                secondary: { main: '#00B8A9' },
                background: { default: '#F5F6FB', paper: '#FFFFFF' },
                text: { primary: '#141629', secondary: '#5F6480' },
                divider: 'rgba(20, 22, 41, 0.08)'
            }
        },
        dark: {
            palette: {
                primary: { main: '#8E7CFF' },
                secondary: { main: '#2DD4BF' },
                background: { default: '#0B0D17', paper: '#141726' },
                text: { primary: '#ECEEF8', secondary: '#9AA0BF' },
                divider: 'rgba(236, 238, 248, 0.08)'
            }
        }
    },
    shape: { borderRadius: 4 },
    typography: {
        fontFamily: '"Plus Jakarta Sans Variable", "Roboto", sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.03em' },
        h2: { fontWeight: 800, letterSpacing: '-0.025em' },
        h3: { fontWeight: 800, letterSpacing: '-0.02em' },
        h4: { fontWeight: 700, letterSpacing: '-0.015em' },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 600 }
    },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    paddingInline: 18,
                    variants: [{
                        props: { variant: 'contained', color: 'primary' },
                        style: {
                            backgroundImage: gradient,
                            color: '#fff',
                            transition: 'transform .2s ease, box-shadow .2s ease',
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: `0 10px 24px ${alpha(primary, 0.35)}`
                            },
                            '&.Mui-disabled': { backgroundImage: 'none' }
                        }
                    }]
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundImage: 'none',
                    border: `1px solid ${theme.vars?.palette.divider}`
                }),
                rounded: { borderRadius: 16 }
            }
        },
        MuiCard: {
            defaultProps: { elevation: 0 },
            styleOverrides: { root: { borderRadius: 20 } }
        },
        MuiChip: {
            styleOverrides: { root: { fontWeight: 600, borderRadius: 10 } }
        },
        MuiTab: {
            styleOverrides: { root: { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' } }
        },
        MuiOutlinedInput: {
            styleOverrides: { root: { borderRadius: 12 } }
        },
        MuiAvatar: {
            styleOverrides: { root: { fontWeight: 700 } }
        }
    }
});
