import React from "react";

import './List-item.scss';

export default function ListItem({ person, selectUser }) {
    const { name, address: {city}, company: {name:companyName} } = person
    return (
        <div 
            className="person-body"
            /* onClick={() => selectUser(person)} */>
            <p><span>ФИО:</span> {name}</p>
            <p><span>Город:</span> {city}</p>
            <p><span>Компания:</span> {companyName}</p>
            <button
                onClick={() => selectUser(person)}
            >
                Подробнее</button>
        </div>
    )
}