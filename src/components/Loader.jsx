import ReactDom from "react-dom";

const Backdrop = props => {
    const handleClick = () => {
        if (props.onClose) {
            props.onClose();
        }
    }
    return (
        <div onClick={handleClick} className="loader-overlay"></div>
    )
}

export const Loader = () => {
    return (
        ReactDom.createPortal(
            <>
                <Backdrop />
                <div className="loading-dots">
                    <div>Loading</div>
                    <div className="loading-dots--dot"></div>
                    <div className="loading-dots--dot"></div>
                    <div className="loading-dots--dot"></div>
                </div>
            </>,
            document.getElementById("loader-root")
        )
    )
}