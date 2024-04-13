import { createTheme } from '@mui/material/styles'
import themeTypography from './typography'

const theme = () =>
  createTheme({
    direction: 'ltr',
    mixins: {
      toolbar: {
        minHeight: '60px',
        padding: '8px',
      },
    },
    typography: themeTypography({}),
  })

export default theme()
