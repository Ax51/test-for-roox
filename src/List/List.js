import React from "react";

import './List.scss';

import ListItem from "../List-item/List-item";

export default function List({ users , selectUser}) {
    const listOfUsers = users.map((person, k) => {
        return (
            <ListItem
                key={k}
                person={person}
                selectUser={selectUser} />
        )
    })

    return (
        <div className="list">
            <h1>Список пользователей</h1>
            {listOfUsers}
            <p>Найдено {users.length} пользователей</p>
        </div>
    )
}