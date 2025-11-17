import axios from "axios";

const API_URL = "http://localhost:8080/api/product";

export const create = async(data) => {
    const response = await axios.post(`${API_URL}/create`,data);
    return response.data;
};


export const update = async(data) => {
    const response = await axios.put(`${API_URL}/update`,data);
    return response.data;
};

export const deletee = async(id) => {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
}
