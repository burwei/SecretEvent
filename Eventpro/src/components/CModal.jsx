import { Modal, Grid, Container, Box, styled, Backdrop } from '@mui/material'
import logo from '@/assets/img/logo.svg'

export default ({ open, setOpen, title, children }) => {
  const backdrop = styled(Backdrop)({ backgroundColor: 'rgba(0,0,0,0.75)' })
  return (
    <Modal open={open} onClose={setOpen} disableAutoFocus BackdropComponent={backdrop}>
      <Container
        maxWidth={'sm'}
        sx={{
          position: 'absolute',
          transform: 'translate(-50%, 0)',
          top: '20%',
          left: '50%',
        }}
        children={
          <Grid
            container
            sx={{
              p: 4,
              bgcolor: '#070707',
              boxShadow: 20,
              borderRadius: 2,
              border: '2px solid rgba(111,118,126,0.2)',
              flexDirection: 'column',
            }}
          >
            <Grid item sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Box display={'flex'} alignItems={'center'}>
                <img src={logo} style={{ display: 'flex', height: '20px', marginRight: '16px' }} />
                <span style={{ display: 'flex', color: '#fff', fontSize: '20px' }}>{title}</span>
              </Box>
              <Box display={'flex'} sx={{ '&:hover': { cursor: 'pointer' } }}>
                <span className="material-icons" style={{ color: '#EFEFEF', fontSize: '24px' }} onClick={setOpen}>
                  cancel
                </span>
              </Box>
            </Grid>
            {children}
          </Grid>
        }
      />
    </Modal>
  )
}
