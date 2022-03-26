import React, { useState, Fragment } from "react";

import './Person-file.scss';

export default function PersonFile({ person:p, resetSelectedUser, editUser }) {


    const [readOnly, setReadOnly] = useState(true)
    const [person, setPerson] = useState(p)
    const [changeFlag, setChangeFlag] = useState(false)
    const [validateFormFlag, setValidateFormFlag] = useState(true);
    const { id, name, username, email, address: { street, city, zipcode }, company: { name: company }, phone, website, comment } = person
    const objForFieldSet = { name, username, company, email, street, city, zipcode, phone, website }
    const fieldSetInputs = []
    const namingMap = {
        name: "Имя",
        username: "Никнейм",
        company: 'Организация',
        email: "Электронный адрес",
        street: "Улица",
        city: "Город",
        zipcode: "Почтовый индекс",
        phone: "Телефон",
        website: "Веб-сайт",
    }

    for (let attr in objForFieldSet) {
        fieldSetInputs.push(
            <Fragment key={attr}>
                <p>{namingMap[attr]}</p>
                <input
                    className={objForFieldSet[attr].length === 0 ? 'red' : null}
                    type="text"
                    defaultValue={objForFieldSet[attr]}
                    onChange={e => changeAttr(attr, e.target.value)}
                    required />
            </Fragment>
        )
    }

    function toggleReadOnly() {
        setReadOnly(prevState => !prevState)
    }
    function changeAttr(attr, value) {
        setChangeFlag(prev => !prev)
        if (value.length === 0) {
            setValidateFormFlag(false)
        }
        if (value.length > 0) {
            setValidateFormFlag(true)
        }
        switch (attr) {
            case 'company':
                setPerson(prevState => ({
                    ...prevState,
                    'company':{
                        ...prevState.company,
                        'name':value
                    }
                }))
                break;
            case 'street':
            case 'city':
            case 'zipcode':
                setPerson(prevState => ({
                    ...prevState,
                    'address':{
                        ...prevState.address,
                        [attr]:value
                    }
                }))
                break;
            default:
                setPerson(prevState => ({
                    ...prevState,
                    [attr]:value
                }))
                break;
        }
    }
    function submit(event) {
        event.preventDefault()
        if (changeFlag && validateFormFlag) {
            editUser(id, person)
            console.log(JSON.stringify(person));
            resetSelectedUser()
        }
        if (!changeFlag) {
            resetSelectedUser()
        }
    }

    return (
        <div className="person-file_wrapper">
            <div className="header">
                <h1>Профиль пользователя</h1>
                <button
                    onClick={toggleReadOnly}>
                    {readOnly ? "Редактировать" : "Закрепить"}
                </button>
            </div>
            <form
                onSubmit={e => submit(e)}>
                <fieldset
                    disabled={readOnly}>
                    {fieldSetInputs}
                    <p>Comment</p>
                    <textarea cols="30" rows="10"
                        defaultValue={comment}
                        onChange={e => changeAttr('comment', e.target.value)} />
                </fieldset>
                <input className={`form-submit ${validateFormFlag ? 'submit-ready' : null}`} type="submit" value="Отправить" />
            </form>
        </div>
    )
}