import React from "react";
import './Players.css'
import { PropsPlayerList } from "../type/type";

export const PlayerList:React.FC<PropsPlayerList> = ({ players, setActive, findPlayerById }) => {
    return (
        <div className="list__player">
            {players.map((player) =>
                <div
                    onClick={() => {
                        findPlayerById(player.score)
                        setActive(true)
                    }}
                    className="alert alert-light text-dark player"
                    key={player.score}
                >
                    <span>
                        <img className="img" src={`${player.avatar}`} alt="img"/>
                        {' '}
                        <span>{`${player.name}`}</span>
                    </span>
                    <span>
                        {`score: ${player.score}`}
                    </span>
                </div>
            )}
        </div>
    )
}
