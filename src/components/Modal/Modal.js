import React from "react";
import styles from "./Modal.module.css";
import ReactDom from "react-dom";

const Modal = ({ open, children, onClose, outerLayerClick, style}) => {
    if (!open) return null;


    
    return ReactDom.createPortal(
        <>
            <div
                onClick={outerLayerClick}
                className={styles["modal-container-overlay"]}
            />
            <div className={styles[`${style}`]}>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </>,
        document.getElementById("portal")
    );
};

export default Modal;
