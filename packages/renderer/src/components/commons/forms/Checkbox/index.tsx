import './index.scss'

interface Props {
  checked: boolean
  label?: string
  onChange?: () => void
}

const CCheckbox = ({ label, checked, onChange }: Props) => {
  return (
    <label
      className="c-checkbox-container"
    >
      <input
        type="checkbox"
        checked={ checked }
        onChange={ onChange }
      />
      <span
        className="c-checkbox-container-label"
      >
        { label }
      </span>
    </label>
  )
}

export default CCheckbox
