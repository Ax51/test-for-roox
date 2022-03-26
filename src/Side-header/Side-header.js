import React from "react";

import './Side-header.scss'

export default function SideHeader({ sortByCity, sortByCompany}) {
    return (
        <div className="sideBar">
            <h4>Сортировка</h4>
            <button
                onClick={sortByCity}
            >
                по городу</button>
            <button
                onClick={sortByCompany}
            >
                по компании</button>
        </div>
    )
}