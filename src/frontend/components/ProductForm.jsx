import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustonRoundedButton from './CuttomRoundedButton';
import { Combobox } from 'react-widgets';
import { validateProduct } from '../utils/productValidation.js';
import Header from './Header.jsx';

export const c = [
    { id: 1, name: "category 1" },
    { id: 2, name: "category 2" },
    { id: 3, name: "category 3" },
    { id: 4, name: "category 4" },
    { id: 5, name: "category 5" },
    { id: 6, name: "category 6" },
    { id: 7, name: "category 7" },

]
const ProductForm = () => {
    const location = useLocation();
    const product = location.state?.product;
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        name: product?.name || "",
        price: product?.price || "",
        quantity: product?.quantity || "",
        description: product?.description || "",
        category: product?.category || null,
        categories: null,
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        if (product) {
            // update product
        } else {
            // add new product
        }
        window.history.back();
    };
    useEffect(() => {
        // fetch Categories 
        setCategories(c);
        setForm({...form, categories: c});
    }, [])

    return <>
        <Header/>
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

                <form onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
                    style={{
                        width: "90%",
                        height: "70%",
                        display: "grid",
                        gridTemplateColumns: "1fr 3fr 2fr ",
                        gap: "20px",
                        textAlign: "left",
                        fontSize: "20px",
                        paddingLeft: "30px",

                    }}
                >   <p>Product Name: </p>
                    <input value={form.name} onChange={e => {
                        setForm({ ...form, name: e.target.value});
                    }} />
                    <p className='error-text'>{errors.name}</p>

                    <p>Price: </p>
                    <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                    <p className='error-text'>{errors.price}</p>

                    <p>Quantity: </p>
                    <input value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
                    <p className='error-text'>{errors.quantity}</p>
                    <p>Description: </p>
                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} 
                            style={{height: "15vh"}}/>
                    <p className='error-text'>{errors.description}</p>
                    <p>Category: </p>
                    <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                    }}>
                        <Combobox data={categories}
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
                    <button type="submit"
                        style={{
                            width: "15vw",
                            height: "7vh",
                            borderRadius: "10px",
                            fontSize: "24px",
                            border: "none",
                            backgroundColor: "black",
                            color: "white",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            const error = validateProduct(form);
                            setErrors(error);
                            if (Object.keys(error).length === 0) {
                                handleSubmit();
                            }
                        }}>
                        {product ? "Update" : "Add"}

                    </button>
                </div>
            </div>
        </main>


    </>
}
export default ProductForm;