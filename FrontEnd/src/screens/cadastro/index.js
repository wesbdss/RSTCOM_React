import React, { useState } from 'react'
import './index.css'
import api from '../../services/api'

export default function Cadastro({ history }) {
    const [but, setBut] = useState(false);
    const handlesubmit = async (event) => {
        event.preventDefault();
        setBut(true)
        if (event.target.password.value !== event.target.confirma.value) {
            alert("As senhas não coincidem!")
            return
        }
        try {
            const resposta = await api('post', '/register', {
                email: event.target.email.value,
                pass: event.target.password.value,
                name: event.target.name.value,
                todo: [{ name: "Você é o cara!", status: 1 }],
                photo: "logo-rstcom-ok-.png"

            })

            if (resposta.erro === "erro") {
                alert("Email em uso");
                setBut(false)
                return
            }

        } catch (e) {
            console.error(e)
            if (e === 'TypeError: Failed to fetch') {
                alert("Servidor Desconectado")
            } else {
                alert('Usuário Criado')
                history.push('/login')
            }
        }
        setBut(false)

    }
    return (
        <div className="container_cad">
            <div className="esquerda_cad">
                <center>
                    <img src="logo-rstcom-ok-.png" alt="" />
                </center>

            </div>
            <div className="direita_cad">
                <div>Faça seu cadastro</div>
                <form onSubmit={handlesubmit}>
                    <input type="text" name="name" id="name" placeholder="Nome" required />
                    <input type="email" name="email" id="email" placeholder="E-Mail" required />
                    <input type="password" name="password" id="password" placeholder="Senha" required />
                    <input type="password" name="confirma" id="confirma" placeholder="Confirmar Senha" required />
                    <input type="submit" value="CADASTRAR" disabled={but} />
                </form>

                    <a href="/login" >Já possui conta? Cliqui aqui</a>

            </div>

        </div>
    )
}
