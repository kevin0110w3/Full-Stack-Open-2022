const Notification = ({ message }) => {

    console.log(message)
    if (message === null || message === '') {
        return null;
    }

    return (
        <div className="notification">
            {message}
        </div>
    )
}

export default Notification