import { useState, useEffect } from 'react';
import { useForm, SubmitHandler  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormInputText } from './components/inputs/FormInputText';
import { processMoran } from './utils/moranProcess';
import { SimuTable } from './components/table/SimuTable';
import { NavigationBar } from './components/navbar/NavigationBar';
import { StickyFooter } from './components/footer/StickyFooter';
import { MultiAxisLine } from './components/charts/MultiAxisLine';

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
  const [numSimulations, setNumSimulations] = useState(0);
  const [population, setPopulation] = useState([
    ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ]);
  const [populationLength, setPopulationLength] = useState(-1);
  
  const { handleSubmit, control, getValues } = useForm({defaultValues: {simulations: 1}, resolver: yupResolver(validationSchema)});

  //const watchSimulations = watch('simulations');
  const {simulations} = getValues();


  useEffect(() => {
  }, [simulations]);

 
  const onSubmit: SubmitHandler<Inputs> = ({simulations}) => {
    const {matrix, numSimulations} = processMoran(simulations, setFirstMutant);
    setPopulation(matrix);
    setNumSimulations(numSimulations);
    setPopulationLength(matrix.length);
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
                  <Typography variant="body1">
                    El primer mutante fue el {firstMutant}º residente.
                  </Typography>
                </Alert>
              </Box>
          }
          {
            numSimulations > 0 && numSimulations > 0 && !population[populationLength-1]?.includes('M') ?
              <Box textAlign="center" sx={{ fontWeight: 500 }} mt={1} mx={2}>
                <Alert variant="outlined" severity="success">
                  <Typography variant="body1">
                    {
                      numSimulations === Number(simulations) ?
                        `La humanidad se salvo en la ${numSimulations}º simulación.`
                        :
                        `La humanidad se salvo en la ${numSimulations}º simulación.
                        No es necesario realizar las ${simulations} simulaciones.`
                    }
                  </Typography>
                </Alert>
              </Box>
              :
              numSimulations > 0 && populationLength > 0 && !population[populationLength-1].includes('R') ?
               <Box textAlign="center" sx={{ fontWeight: 500 }} mt={1} mx={2}>
                 <Alert variant="outlined" severity="error">
                   <Typography variant="body1">
                   {
                    numSimulations === Number(simulations) ?
                      `Los mutantes exterminaron a todos los residentes en la ${numSimulations}º simulación.`
                    :
                      `Los mutantes exterminaron a todos los residentes en la ${numSimulations}º simulación.
                      No es necesario realizar las ${simulations} simulaciones.`
                    }
                    </Typography>
                  </Alert>
               </Box>
               : numSimulations > 0 &&
                <Box textAlign="center" sx={{ fontWeight: 500 }} mt={1} mx={2}>
                  <Alert variant="outlined" severity="error">
                    <Typography variant="body1">
                      La amenaza mutante sigue latente luego de {simulations} simulaciones.
                    </Typography>
                  </Alert>
                </Box>
          }
          <CardContent>
            <SimuTable matrix={population}/>
          </CardContent>
        </Card>
        </Paper>
        {
          population[0].includes('M') &&
            <MultiAxisLine matrix={population}/>
        }
      </Box>
      <StickyFooter/>
    </>
  );
}

export default App;
