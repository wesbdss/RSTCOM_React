import React, { useState ,useEffect} from 'react'
import './index.css'
import Lateral from '../../components/barra_lateral'
import api_img from '../../services/api_img.js'
import api from '../../services/api.js'

export default function Perfil(props) {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')))
    //variaveis para limpar os campos
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [pass,setPass] = useState('')
    const [conf,setConf] = useState('')

    const [img, setImg] = useState('')//msotrar path da imagem
    const [img1, setImg1] = useState('') //salvar o dados decorrente da imagem
    const [but,setBut] = useState(false);

    const atualiza = async () => {
        //Função para atualizar os dados com Banco
        const dado = await api("POST", "/users", { id: data._id })
        if (dado) {
            localStorage.setItem("data", JSON.stringify(dado))
        }
    }
    useEffect( () => {
        //Função para atualizar os dados com Banco
        atualiza()
        // console.log(localStorage.getItem('data'))
    })

    const handleSubmit = async (e) => {
        setBut(true)
        //Submit funciona com foto ou sem foto
        e.preventDefault()
        const fu1 = async () => {

            if (pass !== conf) {
                alert("As senhas não são iguais!")
                return
            }

            if(img1) {
                const formData = new FormData()
                formData.append('photo', img1)
                formData.append('id', data._id)
                formData.append('email', email)
                formData.append('name', name)
                formData.append('pass', pass)
                try {
                    const result = await api_img('POST', '/profile', formData)
                    console.log(result)
                    setData(result)
                    localStorage.setItem('data', JSON.stringify(data))
                } catch (error) {
                    console.error(error)
                }
            }else{

                try {
                    const result = await api('POST', '/update', {email:email,name:name,pass:pass,id: data._id})
                    console.log(result)
                    setData(result)
                    localStorage.setItem('data', JSON.stringify(data))
                } catch (error) {
                    console.error(error)
                }
            }
        }

        fu1();
        setName('')
        setEmail('')
        setPass('')
        setConf('')
        await atualiza()
        setBut(false)

    }

    const handleChange = (e) => {
        setImg(e.target.value)
        setImg1(e.target.files[0])
    }
    const handleChange1 = (e) =>{
        setName(e.target.value)
    }
    const handleChange2 = (e) =>{
        setEmail(e.target.value)
    }
    const handleChange3 = (e) =>{
        setPass(e.target.value)
    }
    const handleChange4 = (e) =>{
        setConf(e.target.value)
    }
    
    return (
        <div className="container_perfil">
            <Lateral data={data} history= {props.history}/>
            <div className="direita_perfil">
                <div className="outcontainerimage">
                    <div className="containerimage" style={{ backgroundImage: "url(http://localhost:3333/photo/padrao.png)" }} onChange={handleChange}>
                        <input className='inputfile' type="file" name="photo" id="photo" placeholder="Insira Foto" accept="image/png,image/jpeg,image/jpg" />
                    </div>
                    <div>Mude seu avatar</div>
                    <div>Selecionado: {img || "nenhum"}</div>
                    <hr/>
                </div>
               

                <form onSubmit={handleSubmit} >
                    <input type="text" name="name" id="name" placeholder="Nome" value={name} onChange={handleChange1}  required />
                    <input type="email" name="email" id="email" placeholder="E-mail" value={email} onChange={handleChange2}  required />
                    <input type="password" name="pass" id="pass" placeholder="Senha" value={pass} onChange={handleChange3}  required />
                    <input type="password" name="confirma" id="confirma" placeholder="Confirmar Senha" value={conf} onChange={handleChange4} required />
                    <input type="submit" value="submit" disabled={but}/>
                </form>
            </div>
        </div>
    )
}
