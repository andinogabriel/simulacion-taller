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

export let arrayPopulation =  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R"];

export const moranFunction = (row: number, probability: number) => {
    let closerProbability = 0.99;
    let column = -1;
    let absolutProb: number;
    probabilityMatrix[row].forEach((cell: number, index: number) => {
        absolutProb = Math.abs(probability - cell);
        if(absolutProb < closerProbability) {
            closerProbability = absolutProb;
            column = index;
        }
    });
 
    return  column;
};

const updatePopulation = (column: number, columnRep: number) => {
    if(arrayPopulation[columnRep] === "R") arrayPopulation[column] = "R"
    else arrayPopulation[column] = "M";
};

export const processMoran = (iteraciones: number, setPopulation: Function, population: string[][]) => {
    console.log(iteraciones);
    const min = 0;
    const max = 9;
    const range = max - min;
    const repSelect = Math.trunc(Math.random() * range);
    arrayPopulation[repSelect] = "M";

    //Iteraciones del proceso de moran
    const reMinimo =0.01;
    const reMaximo =0.99;
    const reRange = reMaximo - reMinimo;

    for (let index = 0; index < iteraciones; index++) {
        
        const seleccionReproductor =   Math.trunc((Math.random() * range));
        const deathProb = Math.random() * reRange + reMinimo;

        const column = moranFunction(seleccionReproductor, deathProb);
        updatePopulation(column, repSelect);
        setPopulation((_oldMatrix: string[]) => [..._oldMatrix, arrayPopulation]);
        //Guardar el array anterior e igualarlo al arrayPopulation...
        //arrayPopulation =  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R"];
    }
};

