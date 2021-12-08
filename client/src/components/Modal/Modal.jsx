import React from "react";
import './modal.css'

export const ModalContent = ({ active, setActive, playerById }) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <img className="modal_img" src={`${playerById.avatar}`} alt="img"/>
                <div className="modal__name">{playerById.name}</div>
                <div className="modal__score">Score: {playerById.score}</div>
                <div className="modal__bio">{playerById.bio}</div>
                <button className="modal__button" onClick={() => setActive(false)}>X Close</button>
            </div>
        </div>
    )
}