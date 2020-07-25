import React, { useState, useEffect } from 'react'
import './index.css'
import api from '../../services/api'
import Lateral from '../../components/barra_lateral'

export default function Todolist(props) {
    const [but, setBut] = useState(false)
    const [form, setForm] = useState({ text: '' })
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')))
    const atualiza = async () => {
        //Função para atualizar os dados com Banco
        const dado = await api("POST", "/users", { id: data._id })
        if (dado) {
            localStorage.setItem("data", JSON.stringify(dado))
        }
    }
    useEffect(() => {
        //atualuzar quando iniciar a pagina
        atualiza()
    })

    const handleChange = (e) => {
        setForm({ text: e.target.value })
        atualiza()
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setBut(true)
        const func = async () => {
            try {
                await api('POST', '/todo', { id: data._id, func: "add", todo: { name: form.text, status: 1 } })
            } catch (error) {
                console.error(error)
            }
        }
        func()
        setForm({ text: '' })
        await atualiza()
        setData(JSON.parse(localStorage.getItem("data")))
        setBut(false)

    }
    const handleDelete = async (e) => {
        const num = e.target.closest('[num]').getAttribute('num');
        try {
            await api('POST', '/todo', { id: data._id, todo: data.todo.filter((elem,index)=>{if (index != num) return elem}), func: "change" })
        } catch (error) {
            console.error(error)
        }
        await atualiza()
        setData(JSON.parse(localStorage.getItem('data')))
    }
    const handleStatus = async(e) => {
        const num = e.target.closest('[num]').getAttribute('num');
        const change = async (stt) => {
            try {
                await api('POST', '/todo', { func:"change",id: data._id, todo: data.todo.map((elem, index) => { if (index == num) { elem.status = stt; return elem } else return elem }) })

            } catch (error) {
                console.error(error)
            }
        }

        if (e.target.closest('[num]').getAttribute('status') == 1) {
            change(0);
        } else {
            change(1);
        }

        await atualiza();
        setData(JSON.parse(localStorage.getItem("data")))
    }

    return (
        <div className="container_todo">
            <Lateral data={data} history={props.history} />
            <div className="direita_todo">
                <h2>Lista de Tarefas</h2>
                <div className="todos">
                    {data.todo.map((elem, i) => {
                        if (elem.status === 1) return <div num={i} status={elem.status}><button onClick={handleStatus} value="marcar"></button>{elem.name}<button onClick={handleDelete} value="remover">remover</button></div>
                        else return <div num={i} status={elem.status} ><button onClick={handleStatus} value="desmarcar"></button>{elem.name}</div>
                    })}

                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="todo" id="todo" value={form.text} onChange={handleChange} required placeholder="Escreva sua tarefa aqui " />
                    <input type="submit" value="Salvar" disabled={but} />
                </form>

            </div>
        </div>
    )
}
