import api from '../../services/api';
import {criptografarBearer,descriptografarBearer} from "../../services/crypty";
const USERTOKEN = localStorage.getItem('token');

export async function sendNotification(params){
    const tokenDescriptografado = await descriptografarBearer(USERTOKEN)
    const response = await api.post("create/notification/device",{params},{headers: { Authorization: 'Bearer '+tokenDescriptografado}});
    if(response.status == 200){
        return response.data;
    }else{
        return false;
    }
}
export async function sendFileUploadData(params){
    const tokenDescriptografado = await descriptografarBearer(USERTOKEN)
    const formData = new FormData();
    formData.append('file',params[0])
    const response = await api.post("upload",formData, { headers: { 'Content-Type': 'multipart/form-data boundary='+ Math.random().toString().substr(2) } });
    if(response.status == 200){
        return response.data;
    }else{
        return false;
    }
}