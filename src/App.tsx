import { useState, useEffect } from 'react';
import { useForm, SubmitHandler  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, Box, Button, Card, CardContent, Paper, Grid, Typography } from '@mui/material';
import { FormInputText } from './components/inputs/FormInputText';
import { processMoran } from './utils/moranProcess';
import { SimuTable } from './components/table/SimuTable';
import { NavigationBar } from './components/navbar/NavigationBar';



const validationSchema = yup.object().shape({
  simulations: yup.number()
    .integer('El numero debe ser entero.')
    .positive('El numero debe ser positivo.')
    .typeError('Ingrese un numero valido.')
    .required('Ingrese un numero.')
});

type Inputs = {
  simulations: number;
};

function App() {

  const [firstMutant, setFirstMutant] = useState(null);
  const [residentSaves, setResidentSaves] = useState(-1);
  const [population, setPopulation] = useState([
    ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ]);
  
  const { handleSubmit, control, getValues } = useForm({defaultValues: {simulations: 1}, resolver: yupResolver(validationSchema)});

  //const watchSimulations = watch('simulations');
  const {simulations} = getValues();


  useEffect(() => {
  }, [simulations]);

  console.log(residentSaves);
  const onSubmit: SubmitHandler<Inputs> = ({simulations}) => {
    const {matrix, safeSimulation} = processMoran(simulations, setFirstMutant);
    setPopulation(matrix);
    setResidentSaves(safeSimulation);
  };

  return (
    <>
      <NavigationBar/>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop="20px"
      >
        <Grid item xs={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputText
              name="simulations"
              label="Cantidad de simulaciones"
              type="number"
              variant="outlined"
              control={control}
            />
            <Box textAlign="center">
              <Button variant="outlined" type="submit">Simular</Button>
            </Box>
          </form>
        </Grid>   
      </Grid>
      
      <Box mt={5}>
        <Paper elevation={10}>
        <Card className="card-root" variant="outlined" >
          {
            firstMutant && 
              <Box textAlign="center" sx={{ fontWeight: 500 }} mt={1} mx={2}>
                <Alert variant="outlined" severity="warning">
                  <Typography variant="body1">El primer mutante fue el {firstMutant}º residente.</Typography>
                </Alert>
              </Box>
          }
          {
            residentSaves > -1 && 
              <Box textAlign="center" sx={{ fontWeight: 500 }} mt={1} mx={2}>
                <Alert variant="outlined" severity="success">
                <Typography variant="body1">La humanidad se salvo en la {residentSaves}º simulación.</Typography>
                </Alert>
              </Box>
          }
          {
            residentSaves === -1 && simulations > 1 && 
              <Box textAlign="center" sx={{ fontWeight: 500 }} mt={1} mx={2}>
                <Alert variant="outlined" severity="error">
                <Typography variant="body1">La amenaza mutante sigue latente luego de {simulations} simulaciones.</Typography>
                </Alert>
              </Box>
          }

          <CardContent>
            <SimuTable matrix={population}/>
          </CardContent>
        </Card>
        </Paper>
      </Box>
    </>
  );
}

export default App;
