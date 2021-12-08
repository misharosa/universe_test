import React, {useEffect, useMemo, useState} from "react";
import { ModalContent } from "./components/Modal/Modal";
import { PlayerList } from "./components/PlayerList/PlayerList";
import { Form } from "./components/Form/Form";
import { IPlayer } from "./components/type/type";

export const EventSourcing:React.FC<any> = () => {
    const [players, setPlayers] = useState<IPlayer[]>([])
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
                setPlayers(prev => [...prev, player])
        }
    }

    const sortPlayers = useMemo(() => {
        switch (selectedSort) {
            case 'score':
               return players.sort(function(firstScore, secondScore){
                    if(firstScore[selectedSort] > secondScore[selectedSort]) { return -1; }
                    if(firstScore[selectedSort] < secondScore[selectedSort]) { return 1; }
                    return 0
                })

            case 'nameLength':
                return players.sort(function(firstPlayer, secondPlayer){
                    if(firstPlayer['name'].length > secondPlayer['name'].length) { return -1; }
                    if(firstPlayer['name'].length < secondPlayer['name'].length) { return 1; }
                    return 0
                })

            case 'name':
                return players.sort(function(firstPlayer, secondPlayer){
                    if(firstPlayer[selectedSort] < secondPlayer[selectedSort]) { return -1; }
                    if(firstPlayer[selectedSort] > secondPlayer[selectedSort]) { return 1; }
                    return 0
                })

            default:
                return players
        }
    }, [players, selectedSort])

    const filteredPlayers = useMemo(() => {
        return sortPlayers.filter(player => (player.name.toLowerCase()).includes((value).toLowerCase()))
    },[sortPlayers, value]);

    const findPlayerById = (playerId:number) => {
        const findPlayer:any = players.find(player => player.score === playerId)
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
                players={filteredPlayers}
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

