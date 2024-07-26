import {
    __,
    allPass,
    andThen,
    assoc,
    concat,
    gt,
    ifElse,
    length,
    lt,
    mathMod,
    otherwise,
    partial,
    pipe,
    prop,
    tap,
    test,
} from 'ramda';
import Api from '../tools/api';

const api = new Api();

const NUMBERS_URL = 'https://api.tech/numbers/base';
const ANIMALS_URL = 'https://animals.tech/';

const fromDecimalToBinary = pipe(assoc('number', __, { from: 10, to: 2 }), api.get(NUMBERS_URL));
const getResult = pipe(prop('result'), String);
const thenGetResult = andThen(getResult);
const thenLength = andThen(length);
const squaring = (n) => n ** 2;
const thenSquaring = andThen(pipe(Number, squaring));
const thenMod = andThen(mathMod(__, 3));
const thenConcatToAnimalsUrl = andThen(concat(ANIMALS_URL));
const thenGetAnimal = andThen(api.get(__, {}));
const thenToString = andThen(String);

const stringToNumber = pipe(Number, Math.round);

const lengthGreaterThenTwo = pipe(length, gt(__, 2));
const lengthLessThenTen = pipe(length, lt(__, 10));
const testForNumbersOnly = test(/^\d+\.?\d+$/);

const validate = allPass([lengthGreaterThenTwo, lengthLessThenTen, testForNumbersOnly]);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const log = tap(writeLog);
    const thenLog = andThen(log);

    const validationError = partial(handleError, ['ValidationError']);
    const thenSuccess = andThen(handleSuccess);

    const startProcess = pipe(
        stringToNumber,
        fromDecimalToBinary,
        thenGetResult,
        thenLog,
        thenLength,
        thenLog,
        thenSquaring,
        thenLog,
        thenMod,
        thenLog,
        thenToString,
        thenConcatToAnimalsUrl,
        thenGetAnimal,
        thenGetResult,
        thenSuccess,
        otherwise(handleError)
    );

    const runWithCondition = ifElse(validate, startProcess, validationError);
    const logThenRun = pipe(log, runWithCondition);

    logThenRun(value);
};

export default processSequence;
