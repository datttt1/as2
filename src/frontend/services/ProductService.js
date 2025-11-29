import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/product`;

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

export const getById = async(id) => {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data
}

export const getByName = async(name) => {
    const response = await axios.get(`${API_URL}/getbyname/${name}`);
    return response.data;
}
export const getAll = async() =>{
    const response = await axios.get(`${API_URL}`);
    return response.data;
}
