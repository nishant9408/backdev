import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

export const dietParser = async (listOfFiles: string[]): Promise<string> => {
    const readFile = util.promisify(fs.readFile);
    const pathes = listOfFiles.map(file => path.join(__dirname, `../../diets/${file}`));

    const filesData = await Promise.all(pathes.map(p => readFile(p, { encoding: 'utf8' })));

    const rows = filesData
        .map(splitByRows)
        .map(removeLastBedElement)
        .map(generateRows)
        .join(',');

    return rows;
};

const splitByRows = (data: string): string[] => data.split('"\n');

const removeLastBedElement = (data: string[]): string[] => {
    data.pop();
    return data;
};

const parseIngredients = (ingredients: string): string => ingredients
        .replace('"', '')
        .replace('!', ',')
        .split('\n')
        .map(i => `'${i.trim()}'`)
        .join(',');

const generateRows = (dataStr): string[] => dataStr.map((r) => {
    const columns = r.split(',');
    const name = columns[1].replace('"', '').trim();
    const calories = columns[2];
    const proteins = columns[3];
    const fats = columns[4];
    const carbs = columns[5];
    const diet = columns[6];
    const ingredients = parseIngredients(columns[7]);
    return `('${ name }', ${ calories }, ${ proteins }, ${ fats }, ${ carbs }, '${ diet }', ARRAY [ ${ ingredients } ])`;
});
