import React, { useEffect, useState } from "react";
import { ModalContent } from "./components/Modal/Modal";
import {PlayerList} from "./components/PlayerList/PlayerList";
import {Form} from "./components/Form/Form";

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
            <Form
                value={value}
                setValue={setValue}
                setSelectedSort={setSelectedSort}
            />
            <div className="list__player">
            <PlayerList
                players={players}
                findPlayerById={findPlayerById}
                setActive={setModalActive}
            />
                <ModalContent
                    active={modalActive}
                    setActive={setModalActive}
                    playerById={playerByID}
                />
            </div>
        </div>
        </>
    )
}

