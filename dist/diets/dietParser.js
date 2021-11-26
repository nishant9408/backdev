"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dietParser = void 0;
const fs = require("fs");
const path = require("path");
const util = require("util");
const dietParser = (listOfFiles) => __awaiter(void 0, void 0, void 0, function* () {
    const readFile = util.promisify(fs.readFile);
    const pathes = listOfFiles.map(file => path.join(__dirname, `../../diets/${file}`));
    const filesData = yield Promise.all(pathes.map(p => readFile(p, { encoding: 'utf8' })));
    const rows = filesData
        .map(splitByRows)
        .map(removeLastBedElement)
        .map(generateRows)
        .join(',');
    return rows;
});
exports.dietParser = dietParser;
const splitByRows = (data) => data.split('"\n');
const removeLastBedElement = (data) => {
    data.pop();
    return data;
};
const parseIngredients = (ingredients) => ingredients
    .replace('"', '')
    .replace('!', ',')
    .split('\n')
    .map(i => `'${i.trim()}'`)
    .join(',');
const generateRows = (dataStr) => dataStr.map((r) => {
    const columns = r.split(',');
    const name = columns[1].replace('"', '').trim();
    const calories = columns[2];
    const proteins = columns[3];
    const fats = columns[4];
    const carbs = columns[5];
    const diet = columns[6];
    const ingredients = parseIngredients(columns[7]);
    return `('${name}', ${calories}, ${proteins}, ${fats}, ${carbs}, '${diet}', ARRAY [ ${ingredients} ])`;
});
//# sourceMappingURL=dietParser.js.map