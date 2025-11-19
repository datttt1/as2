import { useState } from "react";
import CustonRoundedButton from "../components/CuttomRoundedButton";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginSuccessful = () => {
        navigate("/products");
    }

    return (
        <>
            <header
                style={{
                    backgroundColor: "black",
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
                        <CustonRoundedButton text="Log in" width="100%" height="5vh" isFilled={true} onClick={loginSuccessful}></CustonRoundedButton>

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