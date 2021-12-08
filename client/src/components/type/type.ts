export interface IPlayer {
    name: string // можно использовать как ID, всегда будет уникальным
    avatar: string // ссылка на фото игрока
    score: number // текущий счёт
    bio: string // краткое описание игрока
}

export interface PropsPlayerList {
    players:  IPlayer[],
    setActive: (setActive:boolean) => void,
    findPlayerById: (playerId: number) => void
}

export interface PropsForm {
    setValue: (value:string) => void
    setSelectedSort: (playerId: string) => void
    value: string
}