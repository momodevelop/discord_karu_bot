/************************************************************************************
@name: momo-helpers
@author: Gerald 'Momo' Wong

Useful helper functions

*************************************************************************************/
// Creates an Error
export class MomoError extends Error {
    public code:number;
    constructor(code:number, msg:string){
        super(msg);
        this.code = code;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, MomoError.prototype);
    }
}

export function make_error(class_type: typeof MomoError, code: number, function_name: string, message: string) {
    return new class_type(code, '[' + function_name + '] ' + message);
}
export function is_valid(object: object) {
    return object !== null && object !== undefined;
}
export function is_has_words(str: string, words: string[]) {
    for (let i = 0; i < words.length; ++i) {
        if (str.match(new RegExp("\\b" + words[i] + "\\b")) !== null) {
            return true;
        }
    }
    return false;
}
// Attempt to pop args from cmds.
// if all 'popper' matches, 'poppee' will be popped and return true.
// else, 'poppee' will remain the same and return false (i.e. 'popper' don't match the top of 'poppee)
export function pop_if_match(poppee: string[], popper: string[]) {
    let result = true;
    for (let i = 0; i < popper.length; ++i) {
        if (popper[i] != poppee[i]) {
            return false;
        }
    }
    poppee.splice(0, popper.length);
    return true;
}
// print_error_func can take in a str
type CallbackType = ()=>void;
export function cond(func: boolean, success_func?: CallbackType, fail_func?: CallbackType) {
    if (func === false) {
        if (fail_func) {
            fail_func();
        }
    }
    else {
        if (success_func) {
            success_func();
        }
    }
    return func;
}

// takes in mins and returns an array of 2 numbers in [hour,min] format
export function mins_to_hrs(input:number) : number[] {
    let hours:number = Math.floor(input / 60);
    let mins:number = Math.round(input % 60);

    return [hours, mins];
}

// takes in time in hours and mins and returns minutes
// not that it takes in negative values and minute over 60
// (not sure what the side effect will be)
export function hrs_to_mins(hrs:number, mins:number) : number {
    return mins + hrs * 60;
}

// ratios time
// Takes in an hour and minute variable and an array of ratios
// Returns an array of time
// TODO: maybe take in a mode for formatting?
// 0) [seconds]
// 1) [hour, seconds]
export function ratio_time(hr:number, min:number, ratios:number[]) : number[] {
    // check if variables are valid
    if (min < 0 || hr < 0 || min >= 60 || ratios.length == 0 ) {
        return [];
    }


    let ratio_total:number = 0;
    for( let i = 0; i < ratios.length; ++i ) {
        if ( ratios[i] <= 0 ) {
            return [];
        }
        ratio_total += ratios[i];
    }

    let mins_per_ratio:number = hrs_to_mins(hr,min) / ratio_total;

    let return_value:number[] = [];
    for( let i = 0; i < ratios.length; ++i ) {
        return_value.push(mins_per_ratio * ratios[i]);
    }


    return return_value;

}

// combines an array of strings.
export function CombineStrings(args:string[], sperator:string, start?:number, end?:number) : string {
    if (start == null) {
        start = 0;
    }
    if ( end == null ){
        end = args.length;
    }
    let result:string = "";
    for (let i = start; i < end; ++i) {
        result += args[i];
        if ( i != end - 1){
            result += sperator;
        }
    }
    return result;
}

export function DiceRoll(amt : number, sides : number)
{
  var result = [];
   for (var i = 0; i < amt; ++i ) {
        result.push(Math.floor(Math.random() * sides + 1));
    }
    return result;
}
