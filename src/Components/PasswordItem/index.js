import './index.css'

const PasswordItem = props => {
  const {itemDetails, showPasswordItem, onClickDelete} = props
  const {id, websiteName, userPassword, name} = itemDetails

  const bgNumber = Math.ceil(Math.random() * 8 - 1)
  const className = `person-logo bg${bgNumber}`

  const onDelete = () => {
    onClickDelete(id)
  }
  return (
    <li>
      <h1 className={className}>{name[0]}</h1>
      <div className="person-details">
        <p>{websiteName}</p>
        <p>{name}</p>
        {showPasswordItem ? (
          <p>{userPassword}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button
        data-testid="delete"
        type="button"
        className="delete-btn"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default PasswordItem
