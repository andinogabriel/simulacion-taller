import { useState } from 'react';
import { useForm, SubmitHandler  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Card, CardContent, Paper, Grid } from '@mui/material';
import { TableSimu } from './components/TableSimu';
import { FormInputText } from './components/inputs/FormInputText';
import { processMoran } from './utils/moranProcess';
import { SimuTable } from './components/table/SimuTable';

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

  const [population, setPopulation] = useState([
    ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ]);
  
  const { handleSubmit, control } = useForm({ resolver: yupResolver(validationSchema)});

  const onSubmit: SubmitHandler<Inputs> = ({simulations}) => {
    console.log(simulations);
    setPopulation(processMoran(simulations));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={6} sm={2}>
          <FormInputText
            name="simulations"
            label="Cantidad de simulaciones"
            type="number"
            variant="outlined"
            control={control}
          />

        </Grid>
      </form>
      <Box mt={5}>
        <Paper elevation={7}>
        <Card className="card-root" variant="outlined" >
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
