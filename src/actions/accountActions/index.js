import api from '../../services/api';
import {criptografarBearer,descriptografarBearer} from "../../services/crypty";
const USERTOKEN = localStorage.getItem('token');

export async function login(email, password){
    const response = await api.post("/login",{email,password});
    console.log(response)
    if(response.status == 200){
      const token = criptografarBearer(response.data.success.token);
      localStorage.setItem('token', token)
      return true;
    }else{
      return false;

    }
}

export async function getUserData(){
    const tokenDescriptografado = await descriptografarBearer(USERTOKEN)
    const response = await api.get("/details", {headers: { Authorization: 'Bearer '+tokenDescriptografado}});
    if(response.status == 200){
        console.log(response)
        return response.data;
    }else{
        return false;

    }
}