import React, {useEffect, useState, useContext, useCallback} from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {getUserData} from "../../../../actions/accountActions";
import {getDeviceData} from "../../../../actions/devicesActions";
import {useHistory, useParams} from "react-router";
import {sendFileUploadData, sendNotification} from "../../../../actions/notificationActions";
import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import {asUploadButton} from "@rpldy/upload-button";
function BasicForm() {
  const {key} = useParams();
  const history = useHistory()
  const [isAlertVisible, setAlertVisible] = useState(true);
  const [device, setDevice] = useState({});
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dados, setDados] = useState([]);
  const [params, setParams] = useState([]);

    const [loading, setLoading] = useState(0);

    useEffect(async () => {
        const response = await getDeviceData(key);
        if(response.error){

        }else{
            console.log(response)
            setDevice(response.devices);
            setDados(response.dados);
            setParams([{key:'key', value:response.devices.key}, {key:'secret', value:response.devices.secret}])
        }
    },[key]);
    const  currencies = [
        'Texto',
        'File'
    ]

    function addParms(){
        let newParams = {key:name,value:value};
        params.push(newParams);
        setParams(params);
        setName('')
        setValue('')
        setType('Texto')

    }

   async function handleSendNotification(){
      const  response = await sendNotification(params);
      if(response){
          window.location.reload();
      }
    }

 async function  sendFileUpload(value){
        setLoading(1)
        const response = await sendFileUploadData(value);
        if(response.error){
            setLoading(0)
            alert('Falha ao Realizar o Upload')
        }else{
            setLoading(0)
            alert('Realizado o Upload')
            setValue(response.image)
        }
 }
    return (
        <Card>
          <CardHeader title={`Enviar Notificação ${device.name}`}/>
          <Divider />
          <CardContent>
              <form >
                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                      <TextField id="outlined-basic" label="Nome do Parametro" value={name}  onChange={(e) => setName(e.target.value)} variant="outlined"  style={{width:'100%'}}/>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                      { loading == 1 ? <h3>Efetuado Upload </h3> : <h3></h3>}
                      {type == 'File' ?

                              <input type="file" style={{ cursor: "pointer", backgroundColor:"#f50057", height:55, borderRadius:10, color:"white", alignItems:"center", padding:15 }} onChange={(event) => sendFileUpload(event.target.files)} />

                              :  <TextField id="outlined-basic"  label="Valor do parametro" value={value}  onChange={(e) => setValue(e.target.value)} variant="outlined" style={{width:'100%'}}/>

                      }
                  </Grid>
                    <Grid
                        item
                        md={4}
                        xs={12}
                    >
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Tipo do Parametro"
                            value={type}
                            SelectProps={{
                                native: true,
                            }}
                            onChange={(e) => setType(e.target.value)}
                            style={{width:'100%'}}
                            helperText="Por favor selecione o tipo do parametro"
                        >
                            {currencies.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <h3>Lista de parametros</h3>
                    <Grid
                        container
                        spacing={2}
                    >
                    {

                        params.map((item,count) => (
                            item.key != 'key' && item.key != 'secret' &&
                                    <React.Fragment  key={count}>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                            key={item}
                                        >
                                            <TextField id="outlined-basic" label="Nome do Parametro" value={item.key} disabled={true}  variant="outlined"  style={{width:'100%'}}/>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField id="outlined-basic" label="Valor do parametro" value={item.value} disabled={true}  variant="outlined"  style={{width:'100%'}}/>
                                        </Grid>
                                    </React.Fragment>

                    ) )}
                    </Grid>
                </Box>
                <Box mt={2}>

                </Box>
                <Box mt={2}>
                  <Button
                    color="secondary"
                    fullWidth
                    size="large"
                    onClick={addParms}
                    variant="contained"
                  >
                    Adiconar a lista
                  </Button>
                    <Button
                        color="primary"
                        fullWidth
                        size="large"
                        onClick={handleSendNotification}

                        variant="contained"
                    >
                        Enviar
                    </Button>
                </Box>
              </form>

          </CardContent>
        </Card>
  );
}

export default BasicForm;
