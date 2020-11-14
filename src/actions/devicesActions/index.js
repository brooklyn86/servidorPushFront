import api from '../../services/api';
import {criptografarBearer,descriptografarBearer} from "../../services/crypty";
const USERTOKEN = localStorage.getItem('token');

export async function createDevice(name){
    const tokenDescriptografado = await descriptografarBearer(USERTOKEN)
    const response = await api.post("/create/device",{name:name},{headers: { Authorization: 'Bearer '+tokenDescriptografado}});
    if(response.status == 200){
        return response.data;
    }else{
        return false;
    }
}

export async function getDeviceData(key){
    const tokenDescriptografado = await descriptografarBearer(USERTOKEN)
    const response = await api.post("devices",{key:key},{headers: { Authorization: 'Bearer '+tokenDescriptografado}});
    if(response.status == 200){
        return response.data;
    }else{
        return false;
    }
}
