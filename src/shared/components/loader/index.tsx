import './styles.scss'

interface Props {
  fullscreen?: boolean
}
const Loader = ({ fullscreen = false }: Props) => {
  return (
    <div className={`loader ${fullscreen ? 'fullscreen' : ''}`}>
      <span className='loader--wrapper'></span>
    </div>
  )
}

export default Loader
