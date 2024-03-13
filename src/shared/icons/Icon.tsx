import * as Icons from '../icons'

interface IconProps {
  name: keyof typeof Icons
  variant: 'filled' | 'outlined'
}

const Icon = ({ name, variant }: IconProps) => {
  const SelectedIcon = Icons[name]
  
  if (!SelectedIcon) return null 

  return <SelectedIcon variant={variant} />
}

export default Icon
