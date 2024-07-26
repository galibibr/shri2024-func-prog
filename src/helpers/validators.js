import {
    __,
    allPass,
    any,
    complement,
    countBy,
    dissoc,
    equals,
    gte,
    identity,
    pipe,
    prop,
    propEq,
    values,
} from 'ramda';

const getGreen = prop('green');
const getRed = prop('red');
const getColor = prop(__);

const isGreaterThenTwo = gte(__, 2);
const isGreaterThenThree = gte(__, 3);
const isEqualsOne = equals(__, 1);
const isEqualFour = equals(__, 4);

const isRedStar = propEq('star', 'red');
const isGreenSquare = propEq('square', 'green');
const isWhiteCircle = propEq('circle', 'white');
const isWhiteTriangle = propEq('triangle', 'white');
const isBlueCircle = propEq('circle', 'blue');
const isOrangeSquare = propEq('square', 'orange');
const isGreenTriangle = propEq('triangle', 'green');
const isWhiteStar = propEq('star', 'white');
const isWhiteSquare = propEq('suare', 'white');
const isNotRedStar = complement(isRedStar);
const isNotWhiteStar = complement(isWhiteStar);
const isNotWhiteSquare = complement(isWhiteSquare);
const isNotWhiteTriangle = complement(isWhiteTriangle);

const colorsCount = pipe(values, countBy(identity));
const withoutWhite = dissoc('white');
const colorCountWithoutWhite = pipe(colorsCount, withoutWhite);
const countOfGreen = pipe(colorsCount, getGreen);
const countOfRed = pipe(colorsCount, getRed);

const anyGreaterThenThree = pipe(values, any(isGreaterThenThree));
const isGreenEqualsTwo = pipe(countOfGreen, isGreaterThenTwo);
const isRedEqualsOne = pipe(countOfRed, isEqualsOne);

const isTriangleEqualsSquare = ({ triangle, square }) => triangle === square;
const isRedEqualsBlue = ({ red, blue }) => red === blue;
const allTheSameColor = (color) => pipe(colorsCount, getColor(color), isEqualFour);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteCircle, isWhiteTriangle]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(countOfGreen, isGreaterThenTwo);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = pipe(colorsCount, isRedEqualsBlue);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isBlueCircle, isRedStar, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = pipe(colorCountWithoutWhite, anyGreaterThenThree);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isGreenTriangle, isGreenEqualsTwo, isRedEqualsOne]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allTheSameColor('orange');

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allTheSameColor('green');

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
    isTriangleEqualsSquare,
    isNotWhiteTriangle,
    isNotWhiteSquare,
]);
