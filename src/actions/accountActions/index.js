import api from '../../services/api';
import {criptografarBearer,descriptografarBearer} from "../../services/crypty";
const USERTOKEN = localStorage.getItem('token');

export async function login(email, password){
    const response = await api.post("/login",{email,password});
    if(response.status == 200){
      const token = criptografarBearer(response.data.success.token);
      localStorage.setItem('token', token)
      return true;
    }else{
      return false;

    }
}

export async function getUserData(){
    const tokenDescriptografado = await descriptografarBearer(localStorage.getItem('token'))
    const response = await api.get("/details", {headers: { Authorization: 'Bearer '+tokenDescriptografado}});
    if(response.status == 200){
        return response.data;
    }else{
        return false;
    }
}
export async function getUsersData(){
    const tokenDescriptografado = await descriptografarBearer(localStorage.getItem('token'))
    const response = await api.get("/users", {headers: { Authorization: 'Bearer '+tokenDescriptografado}});
    if(response.status == 200){
        return response.data;
    }else{
        return false;
    }
}

export async function registerUser(dados){
    const formData = new FormData();
    formData.append('name',dados.name)
    formData.append('email',dados.email)
    formData.append('password',dados.password)
    formData.append('c_password',dados.c_password)

    const response = await api.post("/register",formData, {});
    if(response.status == 200){
        const token = criptografarBearer(response.data.success.token);
        localStorage.setItem('token', token)
    }else{
        return false;
    }
}