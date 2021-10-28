import { Line } from 'react-chartjs-2';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

interface typeMatrix {
    matrix: string[][];
}

export const MultiAxisLine = ({matrix}: typeMatrix) => {

    const arrayLabel = matrix.map((_el, i) => (i+1).toString());
    const residentsArray = matrix.map(el => el.filter(e => e === 'R').length).flat();
    const mutantsArray = matrix.map(el => el.filter(e => e === 'M').length).flat();

    const data = {
    labels: arrayLabel,
    datasets: [
        {
            label: 'Residentes',
            data: residentsArray,
            fill: false,
            backgroundColor: 'rgb(0,191,255)',
            borderColor: 'rgba(107, 185, 240, 1)',
        },
        {
            label: 'Mutantes',
            data: mutantsArray,
            fill: false,
            backgroundColor: 'rgb(0,255,0)',
            borderColor: 'rgba(0, 230, 64, 1)',
        },
    ],
    };

    return (
        <>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h4"
                    variant="h5"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
                Estadística de la simulaciones.
            </Typography>
            </Container>
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 1,
                    py: [3, 6],
                }}
            >
                <Grid container spacing={2} justifyContent="space-evenly">
                    <Line data={data} options={options} />
                </Grid>
            </Container>
        </>
    );
};
