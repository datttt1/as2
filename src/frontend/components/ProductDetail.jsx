import Header from "../assets/Header.jsx"
import { useLocation } from 'react-router-dom'

const ProductDetail = () => {
    const location = useLocation();
    const state = location.state;
    const product = state.product;

    return (
        <>
            <Header></Header>
            <div style={{
                width: "100vw",
                height: "94vh",
                backgroundColor: "lightgray",
                padding: "20px",
                boxSizing: "border-box"
            }}>
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    width: "100%",
                    height: "100%",
                    padding: "20px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}>
                    <p style={{
                        fontSize: "35px",
                        marginTop: "10px",
                        marginLeft: "30px",
                        fontWeight: "bold",
                        marginBottom: "40px",
                        textAlign: "left",
                    }}>Product Detail</p>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 3fr",
                        width: "100%",
                        height: "100%",
                        textAlign: "left",
                        fontSize: "22px",
                        paddingLeft: "50px",
                        boxSizing: "border-box",
                        gap: 0
                    }}>
                        <p>Name: </p>
                        <p className="data-text" data-testid="product-name">{product.name}</p>
                        <p>ID: </p>
                        <p className="data-text" data-testid="product-id">{product.id}</p>
                        <p>Price: </p>
                        <p className="data-text" data-testid="product-price">{product.price}</p>
                        <p>Quantity: </p>
                        <p className="data-text" data-testid="product-quantity">{product.quantity}</p>
                        <p>Description: </p>
                        <p data-testid="product-description">{product.description}</p>
                        <p>Category: </p>
                        <p className="data-text" data-testid="product-category">{product.category.name}</p>
                        <p>Category Description</p>
                        <p data-testid="category-description">{product.category.description}</p>


                    </div>

                </div>
            </div>
        </>
    )
}
export default ProductDetail