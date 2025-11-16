import {Link} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
const LeftMenu = () => {
    return (
        <nav
            style={{
                backgroundColor: "white",
                width: "15vw",
                height: "100%",
                borderRadius: "20px"
            }}>
            <p style={{
                color: "black",
                fontSize: "25px",
                fontWeight: "bold",
                height: "6vh",
                alignContent: "center",
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: "30px",
                marginBottom: "10px",

            }}>
                <FaHome style={{
                    marginRight: "15px",
                    fontSize: "35px",

                }}/>Home</p>
            <Link to="/products"
                style={{
                    color: "black",
                    fontSize: "22px",
                    height: "5vh",
                    alignContent: "center",
                    justifyContent: "flex-start",
                    display: "flex",
                    paddingLeft: "30px",
                }}>Products</Link>
        </nav>
    )
}
export default LeftMenu;