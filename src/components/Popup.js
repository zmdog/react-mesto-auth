import {useEffect} from "react";

function Popup({onClose, children, type, isOpen}) {

    useEffect(() => {
        if (!isOpen) return

        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    const handleOverlay = (event) => {
        if (event.target.classList.contains("popup_opened") || event.target.classList.contains("popup__close-button")) {
            onClose();
        }
    };

    return (
        <div
            className={`popup popup_type_image popup_${isOpen ? 'opened' : 'closed'}`}
            onClick={handleOverlay}
        >
            <div className={`popup__wrapper popup__wrapper_${type}`}>
                <button
                    title="Закрыть модальное окно"
                    aria-label="Закрыть модальное окно"
                    type="button"
                    className="button popup__close-button popup__close-button_image"
                    onClick={onClose}
                />
                {children}
            </div>
        </div>
    )

}

export default Popup;
