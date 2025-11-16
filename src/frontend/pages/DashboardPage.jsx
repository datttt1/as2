import { Link } from "react-router-dom";
import LeftMenu from "../components/LeftMenu.jsx";
import Products from "../components/Products.jsx";
const DashboardPage = () => {
    return (
        <>
            <header
                style={{
                    backgroundColor: "black",
                    height: "6vh",
                }}>

            </header>
            <main style={{
                display: "flex",
                backgroundColor: "lightgray",
                height: "94vh",
                width: "100vw",
                gap: "20px",
                padding: "20px",
                boxSizing: "border-box"
            }}>
                <LeftMenu/>
                <Products/>
            </main>

        </>
    )
}
export default DashboardPage;