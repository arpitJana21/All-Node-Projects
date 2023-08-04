// Strictly Typed
/**
string
boolean
number
symbol
undefined
null
*/
let a: number = 10;
let b: string = 'Arpit';
let c: boolean = true;
let d: undefined = undefined;
let e: null = null;

/**
Arrays
Object
*/

let arrN: number[] = [1, 2, 3, 5, 7];
let arrS: string[] = ['Arpit', 'Prosenjit', 'Sourav', 'Animesh'];
let arrA: any[] = [1, 5, true, 'Arpit'];

/**
Tupils
Enums
*/

let tup: [number, boolean, number] = [1, false, 3];
enum Roles {
    admin = 'Have Full Access',
    user = 'Can buy Products',
    seller = 'Can sell Products',
}

let i: number | string = 10;
i = 'str';
i = 100;

type Gender = 'Male' | 'Female' | 'Trans';

function IsMarriagable(gender: Gender, age: number): boolean {
    if (gender === 'Male' && age >= 21) {
        return true;
    } else if (gender === 'Female' && age >= 18) {
        return true;
    } else {
        return false;
    }
}

IsMarriagable('Male', 25);

/**
Object IN TS
*/
type ObjType = {
    admin: string;
    user: string;
    seller?: string | number;
};

const Obj: ObjType = {
    admin: 'Arpit',
    user: 'Prosenjit',
};

/**
Interfaces in TS
*/

interface ObjTypeI {
    admin: string;
    user: string;
    seller?: string | number;
}

const ObjI: ObjTypeI = {
    admin: 'Arpit',
    user: 'Prosenjit',
};
