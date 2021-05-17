import ReCAPTCHA from "react-google-recaptcha";
import React,{useRef,useState} from 'react'
import Salute from "./salute";


function Login() {

    const [validCaptch,setValidCaptch] = useState(null)

    const [userValid, setuserValid] = useState(false)
    
    const captcha = useRef(null)

    const [data,setData] = useState({
        email:'',
        password: '',
        repeatPassword: '',
    })


    const userData = {
        email:'example@gmail.com',
        password: '12345678',
        repeatPassword: '12345678',
    }

    
    const change = (prop,event) => {
        setData({
            ...data,[prop]:event.currentTarget.value.toString().split(" ").join("")
        })
        console.log(data)
    }

    const onChange = () => {
        if (captcha.current.getValue()) {
            console.log('El usuario no es un robot')
            setValidCaptch(true)
        }
      }
    const submit = (event) => {
          event.preventDefault();

         
          if (captcha.current.getValue()) {
                 console.log('el recaptcha ha sido verificado')
                  setuserValid(true);
                  setValidCaptch(true)
                if (JSON.stringify(data) === JSON.stringify(userData)) {
                    console.log('la validacion del usuario es correcta')
                    setuserValid(true)
                    setData(true)
                }
                else{
                    console.log('la validacion del usuario es incorrecta')
                    setuserValid(false)
                    setData(false)
                }
              }else{
                  console.log('verifica el captcha')
                  setValidCaptch(false)
                  setuserValid(false)
                  
              }
      }

    return (
        <>
        <div className="login">
            {!userValid &&
            <div className="log">
                <div className="log__title-container">
                    <div>
                         <h1 className="log__title">Login</h1>
                    </div>
                    <div>
                         <p>Email: example@gmail.com</p>
                         <p>Password: 12345678</p>
                    </div>

                </div>
                <form className="log__inputs" onSubmit={submit}>
                     <input value={data.email} onChange={(event)=>change('email',event)} className="log__inputs-info" type="email" placeholder="E-mail" />
                     <input value={data.password} onChange={(event)=>change('password',event)} className="log__inputs-info" type="password" placeholder="Password" />
                     <input value={data.repeatPassword} onChange={(event) => change('repeatPassword',event)} className="log__inputs-info" type="password" placeholder="Repeat Password"/>

                     {data === false &&
                        <div className="log__inputs-error">
                            <p className="log__inputs-error-txt">Tu correo o contraseña son incorrectos</p>
                         </div>
                    }

                    <div className="reCaptch">
                        <ReCAPTCHA
                            ref={captcha}
                 
                            onChange={onChange}
                            />
                    </div>
                    {validCaptch === false &&
                        <div className="log__inputs-error">
                            <p className="log__inputs-error-txt">Acepta el Re-Captcha</p>
                        </div>
                    }
                    <button className="log__inputs-btn">Start Session</button>
                </form>
            </div>
            }
        </div>
        {userValid &&
            <Salute />
        }
        </>
    )
}



export default Login

