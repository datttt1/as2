import Products from "../components/Products.jsx";
import Header from "../components/Header.jsx";
const DashboardPage = () => {
    return (
        <>
            <Header/>
            <main style={{
                display: "flex",
                backgroundColor: "lightgray",
                height: "94vh",
                width: "100vw",
                gap: "20px",
                padding: "20px",
                boxSizing: "border-box"
            }}>
                <Products/>
            </main>

        </>
    )
}
export default DashboardPage;