import { Tooltip } from '@mui/material'

export default ({ content }) => {
  return (
    <Tooltip title={content}>
      <span className="material-icons" style={{ fontSize: '16px', color: '#6F767E' }}>
        info
      </span>
    </Tooltip>
  )
}
