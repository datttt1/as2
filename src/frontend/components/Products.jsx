import { useState } from 'react';
import { FaEdit,FaTrash} from 'react-icons/fa';

const products = [
    { id: 1, name: "product 1", price: 100, quantity: 10, category: "category 1" },
    { id: 2, name: "product 2", price: 200, quantity: 20, category: "category 2" },
    { id: 3, name: "product 3", price: 300, quantity: 30, category: "category 1" },
    { id: 4, name: "product 4", price: 400, quantity: 40, category: "category 2" },
    { id: 5, name: "product 5", price: 500, quantity: 50, category: "category 3" },
    { id: 6, name: "product 6", price: 600, quantity: 60, category: "category 1" },
    { id: 7, name: "product 7", price: 700, quantity: 70, category: "category 2" },
    { id: 8, name: "product 8", price: 800, quantity: 80, category: "category 3" },
    { id: 9, name: "product 9", price: 900, quantity: 90, category: "category 1" },
    { id: 10, name: "product 10", price: 1000, quantity: 100, category: "category 2" },


];

const Products = () => {
    const [hoverId, setHoverId] = useState(null);
    return (
        <div style={{
            width: "85vw",
            height: "100%",
            backgroundColor: "white",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            alignItems: "start",
            boxSizing: "border-box",


        }}>
            <p style={{
                fontSize: "35px",
                marginTop: "10px",
                marginLeft: "30px",
                fontWeight: "bold",
                marginBottom: "40px",
            }}>
                Products</p>
            <div style={{
                overflowY: "auto",
                maxHeight: "60vh",
                width: "100%",

            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "seperate",
                    borderSpacing: 0,

                }}>
                    <thead style={{
                        fontSize: "28px",
                        height: "55px",
                        fontWeight: "bold",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        backgroundColor: "gray",
                        color: "white",
                    }}>
                        <tr>
                            <th style={{
                                borderTopLeftRadius: "5px",
                                borderBottomLeftRadius: "5px",
                            }}>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th style={{
                                borderBottomRightRadius: "5px",
                                borderTopRightRadius: "5px",
                            }}></th>
                        </tr>
                    </thead>
                    <tbody style={{
                        fontSize: "24px",
                    }}>
                        {
                            products.map((product) => {
                                return (
                                    <tr key={product.id}
                                        onMouseEnter={() => setHoverId(product.id)}
                                        onMouseLeave={() => setHoverId(null)}
                                        style = {{
                                            backgroundColor: product.id === hoverId ? "lightgray" : "transparent",
                                            height: "50px",
                                        }}
                                        className='row-border'>
                                
                                        <td style={{
                                            borderTopLeftRadius: "5px",
                                            borderBottomLeftRadius: "5px",
                                        }}>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.category}</td>

                                        <td style={{
                                            borderTopRightRadius: "5px",
                                            borderBottomRightRadius: "5px",

                                        }}>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                                gap: "10px",
                                            }}>
                                                <button style={{
                                                    width: "35px",
                                                    height: "35px",
                                                    borderRadius: "5px",
                                                    border: "none",
                                                    padding: 0,
                                                    cursor: "pointer",
                                                    backgroundColor: "transparent",

                                                }}
                                                >
                                                    <FaEdit style={{
                                                        fontSize: "35px",
                                                        color: hoverId === product.id ? "black" : "transparent"
                                                    }} />
                                                </button>
                                                <button style={{
                                                    width: "35px",
                                                    height: "35px",
                                                    borderRadius: "5px",
                                                    border: "none",
                                                    padding: 0,
                                                    cursor: "pointer",
                                                    backgroundColor: "transparent",


                                                }}
                                                >
                                                    <FaTrash style={{
                                                        fontSize: "35px",
                                                        color: hoverId === product.id ? "red" : "transparent"
                                                    }} />
                                                </button>
                                            </div>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>


        </div>
    )
}
export default Products;