import { useState } from "react";
import CustonRoundedButton from "../components/CuttomRoundedButton";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLogingIn, setIsLogingIn] = useState(true);

    const loginSuccessful = () => {
        navigate("/dashboard");
    }

    return (
        <>
        <header
            style={{
                backgroundColor:"black",
                width: "100vw",
                height: "6vh",
            }}></header>
        <div style={{
            width: "100vw",
            height: "94vh",
            display: "flex",
            flexDirection: "column"
        }}>
            
            <div style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flex: "4",
            }}>
                <p style={{
                    color: "black",
                    fontSize: "clamp(64px, 6vw, 128px)",
                    fontWeight: "bold"
                }}>Flogin</p>
            </div>


            <div style={{
                display: "flex",
                flexDirection: "row",
                flex: "6",
            }}>
                <div style={{
                    flex: "4",
                }}></div>
                <div style={{
                    display: "flex",
                    flex: "2",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "10px",
                }}>
                    {
                        !isLogingIn &&(
                            <>
                            <p className="text"
                                >Email</p>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                style={{
                                    width: "100%",
                                    height: "5vh",
                                    backgroundColor: "transparent",
                                    color: "black"
                                }}>
                            </input>
                            </>
                        )
                    }
                    <p
                        className="text">
                        Username</p>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        style={{
                            backgroundColor: "transparent",
                            width: "100%",
                            height: "5vh",
                            color: "black"
                        }}
                    ></input>
                    <p
                        className="text">
                        Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={{
                            backgroundColor: "transparent",
                            width: "100%",
                            height: "5vh",
                            color: "black",
                        }}>
                    </input>
                    {
                        isLogingIn ? (
                            <>
                                < div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}>
                                    <button style={{
                                        background: "none",
                                        border: "none",
                                        color: "black",
                                        padding: "0px",
                                        textDecorationLine: "underline",
                                    }}> 
                                        Forgot Password?
                                    </button>
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: "10px",
                                        marginTop: "10px",
                                    }}>
                                    <CustonRoundedButton text="Sign up" width="50%" height="5vh" isFilled={false} onClick={()=>{setIsLogingIn(false)}}></CustonRoundedButton>
                                    <CustonRoundedButton text="Log in" width="50%" height="5vh" isFilled={true} onClick={loginSuccessful}></CustonRoundedButton>
                                </div>
                            </>
                        ) : (
                            <>

                            <p className="text">Confirm Password</p>
                            <input
                                type="password"
                                value={confirmedPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                                placeholder="Confirmed Password"
                                style={{
                                    width: "100%",
                                    height: "5vh",
                                    backgroundColor: "transparent",
                                    color: "black"
                                }}>
                            </input>
                            
                            <div style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: "10px",
                                gap: "10px",
                            }}>
                                <CustonRoundedButton text="Back" width="50%" height="5vh" isFilled={false} onClick = {()=>{setIsLogingIn(true)}}></CustonRoundedButton>
                                <CustonRoundedButton text="Sign up" width="50%" height="5vh" isFilled={true}></CustonRoundedButton>

                            </div>

                            </>
                        )
                    }

                </div>

                <div style={{
                    flex: "4",
                }}></div>
            </div>


        </div >
        </>
        

    )
}
export default LoginPage;