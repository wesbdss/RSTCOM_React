import React from 'react'
import './barra_lateral.css'

const requestUrl = process.env.REACT_APP_REQUEST_URL || 'http://localhost:3333'

export default function barra_lateral(props) {
    const handleClick = (e) => {
        e.preventDefault()
        if(e.target.value === '/'){
            localStorage.removeItem('data')
        }
        props.history.push(e.target.value)
        // window.location.href =window.location.origin+ 
    }
    return (
        <div className="esquerda_bar">
            <div className="topButton_bar">
                <button className="exit" style={{ fontStyle: "italic" }} onClick={handleClick} value='/'>Sair</button>
            </div>
            <div className="elem1_bar">
                <div>
                    <img src={requestUrl+'/photo/'+props.data.photo} alt={props.data.photo} />
                </div>
                <div className="elem2_bar">
                    <div>{props.data.name}</div>
                    <div style={{ fontStyle: "italic" }}>{props.data.email}</div>
                </div>
            </div>
            <hr />
            <div className="options_bar">
                <button onClick={handleClick} value='/perfil'>Dados Pessoais</button>
                <button onClick={handleClick} value='/todolist'>TodoList</button>

            </div>
        </div>
    )
}
