import React, { useEffect, useState } from "react";
import { ModalContent } from "./components/Modal/Modal";

export const EventSourcing = () => {
    const [players, setPlayers] = useState([])
    const [value, setValue] = useState('')
    const [modalActive, setModalActive] = useState(false)
    const [playerByID, setPlayerById] = useState({})
    const [selectedSort, setSelectedSort] = useState('score')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
            const eventSource = new EventSource(`http://localhost:5000/`)
            eventSource.onmessage = await function (event) {
                const player = JSON.parse(event.data)
                switch (selectedSort) {
                    case 'score':
                 setPlayers(prev => [...prev, player].sort(function(firstScore, secondScore){
                    if(firstScore[selectedSort] > secondScore[selectedSort]) { return -1; }
                    if(firstScore[selectedSort] < secondScore[selectedSort]) { return 1; }
                    return 0
                }))
                        break;

                    case 'name':
                        setPlayers(prev => [...prev, player].sort(function(firstPlayer, secondPlayer){
                            if(firstPlayer[selectedSort].length > secondPlayer[selectedSort].length) { return -1; }
                            if(firstPlayer[selectedSort].length < secondPlayer[selectedSort].length) { return 1; }
                            return 0
                        }))
                        break;

                    default:
                        throw new Error('Уупс!')
                }
        }
    }

    useEffect(() => {
        const filterPlayer = [...players].filter(player => (player.name.toLowerCase()).includes((value).toLowerCase()))
        setPlayers([...filterPlayer])
    },[value])

    const findPlayerById = (playerId) => {
        const findPlayer = players.find(player => player.score === playerId)
        setPlayerById(findPlayer)
    }

    if (!players.length) {
        return (
            <div className="loading">
                <span>No players available...</span>
                <br/>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <>
        <h1 className="title">Score board</h1>
        <div className="center">
            <form className="form alert-light text-light">
                <label htmlFor="">
                    <input
                        placeholder="Player’s name"
                        className="form__input"
                        type="text"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                        }}
                    />
                </label>

                <div className="input-group-btn">
                    <select onChange={e => setSelectedSort(e.target.value)} className="btn btn-default dropdown-toggle form__select">
                        <option value="score">Score</option>
                        <option value="name">Name</option>
                    </select>
                </div>
            </form>
            <div className="list__player">
                {players.map((player) =>
                <div
                    onClick={() => {
                        findPlayerById(player.score)
                        setModalActive(true)
                    }}
                    className="alert alert-light text-dark player"
                    key={player.score}
                >
                    <span>
                        <img className="img" src={`${player.avatar}`} alt="img"/>
                        {' '}
                        <span>{`name : ${player.name}`}</span>
                    </span>
                    <span>
                        {`score: ${player.score}`}
                    </span>
                </div>
                )}
                <ModalContent
                    active={modalActive} setActive={setModalActive}
                    playerById={playerByID}
                />
            </div>
        </div>
        </>
    )
}

