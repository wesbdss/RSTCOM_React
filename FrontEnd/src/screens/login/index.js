import React, {useState} from 'react'
import './index.css'
import api from '../../services/api'



export default function Login({ history }) {

    const [but,setBut] = useState(false);

    const handlesubmit = async (event) => {
        event.preventDefault();
        setBut(true)
        try {
            const resposta = await api('post', '/login', {
                email: event.target.email.value,
                pass: event.target.password.value
            })
            localStorage.setItem('data', JSON.stringify(resposta))
            history.push('/perfil')



        } catch (e) {
            console.error(e)
            localStorage.setItem('data', null)
            // alert("Credenciais Incorretas")
            
        }
        setBut(false)
    }
    return (
        <div className="container_login">
            <div className="esquerda_login">
                <center>
                    <img src="logo-rstcom-ok-.png" alt="" />
                </center>

            </div>
            <div className="direita_login">
                <div>Faça seu login</div>
                <form onSubmit={handlesubmit}>
                    <input type="email" name="email" id="email" placeholder="E-Mail" required/>
                    <input type="password" name="password" id="password" placeholder="Senha" required />
                    <input type="submit" value="Entrar" disabled={but} />
                </form>
                <a rel="stylesheet" href="/cadastro" >Não possui cadastro? Clique aqui!</a>


            </div>
        </div>
    )
}
