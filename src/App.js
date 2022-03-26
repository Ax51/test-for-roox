import React, { useState, useEffect } from 'react';

import './App.scss';

import SideHeader from './Side-header/Side-header';
import List from './List/List';
import PersonFile from './Person-file/Person-file';

function App() {
    const storageData = sessionStorage.getItem('data')
    const temporaryData = storageData ? JSON.parse(storageData) : []
    const [users, setUsers] = useState(temporaryData)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        sessionStorage.setItem('data', JSON.stringify(users))
    },[users])

    if (!storageData) {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(res => {
                setUsers(res)
            })
    }

    function editUser(user, newData) {
        const editableUserIndex = users.findIndex(i => i.id === user)
        setUsers(prevState => {
            return ([
                ...prevState.slice(0, editableUserIndex),
                prevState[editableUserIndex] = newData,
                ...prevState.slice(editableUserIndex + 1)
            ])
        })

    }

    function selectUser(user = null) {
        selectedUser
            ? setSelectedUser(null)
            : setSelectedUser(user)
    }

    function sortUsers(selector) {
        switch (selector) {
            case 'city':
                setUsers(prevState => {
                    return [...prevState].sort((a, b) => {
                        if (a.address.city < b.address.city) {
                            return -1
                        }
                        else if (a.address.city > b.address.city) {
                            return 1
                        }
                        else return 0
                    })
                })
                break;
            case 'company':
                setUsers(prevState => {
                    return [...prevState].sort((a, b) => {
                        if (a.company.name < b.company.name) {
                            return -1
                        }
                        else if (a.company.name > b.company.name) {
                            return 1
                        }
                        else return 0
                    })
                })
                break;
            default:
                break;
        }
    }

    function sortByCity() {
        sortUsers('city')
    }
    function sortByCompany() {
        sortUsers('company')
    }

    return (
        <div className="app">
            <SideHeader
                sortByCity={sortByCity}
                sortByCompany={sortByCompany} />
            {users.length > 0
                ? selectedUser
                    ? <PersonFile
                        person={selectedUser}
                        resetSelectedUser={selectUser}
                        editUser={editUser} />
                    : <List
                        users={users}
                        selectUser={selectUser} />
                : <div className="wrapper">
                    <i className="bi bi-arrow-repeat"/>
                </div>}
        </div>
    );
}

export default App;