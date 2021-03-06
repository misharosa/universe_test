import React from "react";
import './form.css'
import { PropsForm } from "../type/type";

export const Form:React.FC<PropsForm> = ({ setValue, setSelectedSort, value }) => {
    return (
        <form className="form alert-light text-light">
            <label>
                <input
                    className="form__input"
                    placeholder="Player’s name"
                    type="text"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                />
            </label>
            <div className="input-group-btn">
                <select
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="btn btn-default dropdown-toggle form__select"
                >
                    <option value="score">Score</option>
                    <option value="nameLength">NameLength</option>
                    <option value="name">Name</option>
                </select>
            </div>
        </form>
    )
}
