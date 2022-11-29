import P from 'prop-types'
import './styles.css'

const Button = ({ text, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}
Button.defautProps = {
  disables: false
}

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool
}

export default Button
