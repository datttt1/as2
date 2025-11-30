import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustonRoundedButton from '../assets/CustomRoundedButton.jsx';
import { Combobox } from 'react-widgets';
import { validateProduct } from '../utils/productValidation.js';
import Header from '../assets/Header.jsx';
import { getAll } from '../services/CategoryService.js';
import { create, update } from '../services/ProductService.js';
import { useNavigate } from 'react-router-dom';


const ProductForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;
    const [form, setForm] = useState({
        id: product?.id || "",
        name: product?.name || "",
        price: product?.price || "",
        quantity: product?.quantity || "",
        description: product?.description || "",
        category: product?.category || null,
        categories: product?.categories || [],
    });
    const [errors, setErrors] = useState({});
    const handleSubmit = async () => {
        if (product.id) {
            try {
                    const res = await update(form);
                    navigate("/products", {
                        state: {
                            message: "Updated product successfully"
                        },
                        replace: true
                    })
            } catch (error) {
                const message = error.response.data.error;
                setErrors({ name: message });
            }
        } else {
            try {
                    const res = await create(form);
                    navigate("/products", {
                        state: {
                            message: "Created product successfully"
                        },
                        replace: true
                    })
                
            } catch (error) {
                const message = error.response.data.error;
                setErrors({ name: message });
            }

        }
    };

    return <>
        <Header />
        <main style={{
            width: "100vw",
            height: "94vh",
            display: "flex",
            backgroundColor: "lightgray",
            padding: "20px",
            boxSizing: "border-box",

        }}>
            <div style={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "30px",
                boxSizing: "border-box",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
            }}>
                <p style={{
                    fontSize: "35px",
                    marginTop: "10px",
                    marginLeft: "30px",
                    fontWeight: "bold",
                    marginBottom: "60px",
                }}>Product Form</p>

                <form style={{
                    width: "90%",
                    height: "70%",
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr 2fr ",
                    gap: "20px",
                    textAlign: "left",
                    fontSize: "20px",
                    paddingLeft: "30px",

                }}
                >   <label htmlFor="name">Product Name</label>
                    <input id="name" value={form.name} onChange={e => {
                        setForm({ ...form, name: e.target.value });
                    }} />
                    <p className='error-text'>{errors.name}</p>

                    <label htmlFor="price">Price</label>
                    <input id="price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                    <p className='error-text'>{errors.price}</p>

                    <label htmlFor="quantity">Quantity</label>
                    <input id="quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
                    <p className='error-text'>{errors.quantity}</p>

                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                        style={{ height: "15vh" }} />
                    <p className='error-text'>{errors.description}</p>
                    <label htmlFor="category">Category</label>
                    <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                    }}>
                        <Combobox data={form.categories}
                            dataKey="id"
                            textField="name"
                            value={form.category}
                            onChange={obj => {
                                setForm({ ...form, category: obj });
                            }}
                            placeholder='Category'
                            style={{
                                flex: 1,
                            }}
                            inputProps={{
                                'data-testid': 'category-input',
                                style: {
                                    width: "100%",
                                    height: "100%",
                                    color: "black",
                                    fontSize: "25px",
                                    padding: "10px",
                                    boxSizing: "border-box"
                                }
                            }}
                            popupProps={{
                                'data-test-id':'category-popup',
                                style: {
                                    border: "1px solid black",
                                    padding: "10px",
                                    boxSizing: "border-box",
                                    cursor: "pointer",
                                    maxHeight: "15vh",
                                    overflowY: "auto"
                                }
                            }}
                        ></Combobox>
                    </div>
                    <p className='error-text'>{errors.category}</p>
                </form>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "end",
                    gap: "20px",
                    flex: 1,
                }}>
                    <CustonRoundedButton text="Back" width={"15vw"} height={"7vh"} onClick={() => { window.history.back() }}> </CustonRoundedButton>
                    <button style={{
                        width: "15vw",
                        height: "7vh",
                        borderRadius: "10px",
                        fontSize: "24px",
                        border: "none",
                        backgroundColor: "black",
                        color: "white",
                        cursor: "pointer",
                    }}
                        data-testid="submit-button"
                        onClick={() => {
                            const error = validateProduct(form);
                            setErrors(error);
                            if (Object.keys(error).length === 0) {
                                console.log("No error in Product validation");
                                handleSubmit();
                            }
                        }}>
                        {product.id ? "Update" : "Create"}

                    </button>
                </div>
            </div>
        </main >


    </>
}
export default ProductForm;