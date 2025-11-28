import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CustonRoundedButton from '../assets/CustomRoundedButton.jsx';
import Header from "../assets/Header.jsx";
import { getAll as getAllProducts } from "../services/ProductService.js";
import { getAll as getAllCategories } from "../services/CategoryService.js";
import { deletee as deleteProduct } from "../services/ProductService.js";

const ProductList = () => {

    const navigate = useNavigate();
    const [hoverId, setHoverId] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const [flash, setFlash] = useState(location.state?.message || "");

    useEffect(() => {
    if (location.state?.message) {
        // Hiện popup
        setFlash(location.state.message);
        // Clear state để back không bị hiện lại
        navigate(".", { replace: true, state: {} });
    }
}, [location.state]);
    useEffect(() => {
        if (flash) {
            setTimeout(() => setFlash(""), 4000); // tự tắt sau 2 giây
        }
    }, [flash]);


    const handleProductForm = (product) => {
        if (product) {
            navigate(`/products/form`, { state: { product: { ...product, categories: categories } } });

        }
        else {
            navigate(`/products/form`, { state: { product: { categories: categories } } });
        }
    }
    const handleProductDetail = (product) => {
        navigate(`/products/detail`, { state: { product } });
    }

    const handleDeletePoduct = async (id) => {
        try {
            const resDelete = await deleteProduct(id);
            setProducts(prev => prev.filter(product => product.id !== id));
            setFlash("Deleted product successfully");

        } catch (error) {
            console.log("Delete product failed", error);
        }
    }

    useEffect(() => {
        // fetch products and categories
        const fetchProductsCategories = async () => {
            try {
                const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);
                setProducts(products);
                setCategories(categories);
            } catch (error) {
                console.log("Fetch products and categories failed", error);
            }
        };
        fetchProductsCategories();
        console.log("fetch Products");
    }, []);

    return (
        <>
            <Header />
            <div style={{
                display: "flex",
                backgroundColor: "lightgray",
                height: "94vh",
                width: "100vw",
                gap: "20px",
                padding: "20px",
                boxSizing: "border-box"
            }}>
                <div style={{
                    width: "100%",
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
                    {flash && (
                        <label role="alert" style={{
                            color: "green",
                            fontSize:"30",
                            
                        }}
                        data-testid="message">
                            {flash}
                        </label>
                    )}
                    <div style={{
                        overflowY: "auto",
                        maxHeight: "60vh",
                        width: "100%",

                    }}>
                        <table style={{
                            width: "100%",
                            borderCollapse: "seperate",
                            borderSpacing: 0,

                        }}
                            data-testid="product-table">
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
                                                data-testid={`row-${product.id}`}
                                                style={{
                                                    backgroundColor: product.id === hoverId ? "lightgray" : "transparent",
                                                    height: "50px",
                                                }}
                                                className='row-border'
                                                onClick={() => {
                                                    handleProductDetail(product);
                                                }}>

                                                <td style={{
                                                    borderTopLeftRadius: "5px",
                                                    borderBottomLeftRadius: "5px",
                                                }}>{product.id}</td>
                                                <td data-testid="product-name">{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.category.name}</td>

                                                <td style={{
                                                    borderTopRightRadius: "5px",
                                                    borderBottomRightRadius: "5px",
                                                }}>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        justifyContent: "flex-end",
                                                        gap: "20px",
                                                        boxSizing: "border-box",
                                                        paddingRight: "20px",
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
                                                            data-testid={`edit-button-${product.id}`}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleProductForm(product);
                                                            }}
                                                            aria-label="edit"
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
                                                            data-testid={`delete-button-${product.id}`}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeletePoduct(product.id);

                                                            }}
                                                            aria-label="delete"
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
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "20px",
                    }}>
                        <CustonRoundedButton text="+ New product"
                            onClick={() => { handleProductForm() }}
                            width="15%"
                            height="6vh"
                            isFilled={true}></CustonRoundedButton>
                    </div>

                </div>
            </div>
        </>


    )
}
export default ProductList;