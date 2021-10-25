export const probabilityMatrix = [
    [0.00, 0.14, 0.05, 0.20, 0.02, 0.11, 0.01, 0.15, 0.02, 0.30], 
    [0.12, 0.00, 0.24, 0.17, 0.04, 0.09, 0.04, 0.09, 0.02, 0.19], 
    [0.20, 0.11, 0.00, 0.03, 0.02, 0.21, 0.30, 0.05, 0.04, 0.04], 
    [0.18, 0.13, 0.10, 0.00, 0.09, 0.08, 0.04, 0.09, 0.21, 0.08], 
    [0.29, 0.03, 0.22, 0.13, 0.00, 0.03, 0.09, 0.08, 0.04, 0.09], 
    [0.05, 0.15, 0.09, 0.23, 0.22, 0.00, 0.03, 0.16, 0.05, 0.02], 
    [0.13, 0.25, 0.08, 0.07, 0.03, 0.03, 0.00, 0.15, 0.25, 0.01], 
    [0.05, 0.25, 0,17, 0.11, 0.12, 0.01, 0.06, 0.00, 0.07, 0.16], 
    [0.24, 0.11, 0.01, 0.05, 0.12, 0.01, 0.02, 0.14, 0.00, 0.30], 
    [0.15, 0.07, 0.02, 0.09, 0.20, 0.05, 0.20, 0.12, 0.10, 0.00]
];

const updatePopulation = (column: number, columnRep: number, array: string[]) => {
    let newArray = [...array];
    if(newArray[columnRep] === 'R') newArray[column] = 'R'
    else newArray[column] = 'M';
    return newArray;
};

//Aca arranca el flow diagram XD
export const processMoran = (iteraciones: number, setFirstMutant: Function): {matrix: string[][], numSimulations: number} => {
    let matrixPopulation = [
        ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
    ];
    const repSelect = Math.floor(Math.random() * 10);
    setFirstMutant(repSelect + 1);
    matrixPopulation[0][repSelect] = 'M';
    //Iteraciones del proceso de moran
    const reMinimo =0.01;
    const reMaximo =0.99;
    const reRange = reMaximo - reMinimo;
    for (let index = 1; index < iteraciones; index++) {
        const seleccionReproductor =   Math.floor(Math.random() * 10);
        const deathProb = Math.random() * reRange + reMinimo;
        let acumulator = 0;
        let j = -1;
        while(acumulator < deathProb) {
            j++;
            acumulator = acumulator + probabilityMatrix[seleccionReproductor][j];
        }
        const newArray = updatePopulation(j, seleccionReproductor, matrixPopulation[index-1]);
        matrixPopulation[index] = newArray;
        if(matrixPopulation[index].every((value) => value === matrixPopulation[index][0])) {
            return {'matrix': matrixPopulation, 'numSimulations': index+1};
        }
    }
    return {'matrix': matrixPopulation, 'numSimulations': iteraciones};
};

