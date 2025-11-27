import { useState } from "react";
import CustonRoundedButton from "../assets/CustomRoundedButton";
import { useNavigate } from "react-router-dom";
import { validateUsername, validatePassword } from "../utils/loginValidation.js";
import { loginUser } from "../services/AuthService.js";


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleLogin = async () => {
        const error = { username: validateUsername(username), password: validatePassword(password) };
        setErrors(error);
        if (error.username === null && error.password === null) {
            try {
                const user = await loginUser({username:username, password:password});
                console.log("user:", user);

                if (user.success) {
                    navigate("/products", { state: { message: "Login successful" }, replace: true });
                } else {
                    alert(user.message);
                }
            } catch (error) {
                console.error(error);
                alert("Login failed");
            }
        }
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
                        <label
                            className="text">
                            Username</label>
                        <input
                            type="text"
                            name="username"
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
                        <label className="error-text" data-testid="username-error" name="username-error">{errors.username}</label>

                        <label
                            className="text">
                            Password</label>
                        <input
                            type="password"
                            name="password"
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
                        <label className="error-text" data-testid="password-error" name="password-error">{errors.password}</label>
                        <CustonRoundedButton text="Login" width="100%" height="5vh" isFilled={true} onClick={handleLogin}></CustonRoundedButton>
                    </div>
                    <div style={{
                        flex: "4",
                    }}></div>

                </div>


            </div >


        </>


    )
}
export default Login;