/************************************************************************************
@name: momo-jsonpath-wrapper
@author: Gerald 'Momo' Wong

Simple wrapper around json-query for people who don't want to go through its syntax.
It works only for a JSON that's structured like a table (with columns as filters and rows as content)
Functions are pure and does not modify arguments in anyway.

The JSON schema that these functions work are ideally as follows:
{
	<table_name_1>:
	[
	{ <key_1_1>: "value", <key_1_2>: "value", ... }
	{ <key_1_1>: "value", <key_1_2>: "value", ... }
	{ <key_1_1>: "value", <key_1_2>: "value", ... }
	{ <key_1_1>: "value", <key_1_2>: "value", ... }
	{ <key_1_1>: "value", <key_1_2>: "value", ... }
	],

	<table_name_2>:
	[
	{ <key_2_1>: "value", <key_2_2>: "value", ... }
	{ <key_2_1>: "value", <key_2_2>: "value", ... }
	{ <key_2_1>: "value", <key_2_2>: "value", ... }
	{ <key_2_1>: "value", <key_2_2>: "value", ... }
	{ <key_2_1>: "value", <key_2_2>: "value", ... }
	]
}

*************************************************************************************/
const jp = require('json-query');
import { iObject } from './gJsonDBCommon';

// data: data containing the JSON object
// table_name: name of the table to get the keys from
// return: an array of keys of the table if it is found. Else null.
export function get_keys (data: object, table_name: string) : string[]{
	//let query = '$.' + table_name + '[0]'; // get just the first element
	let query :string = table_name + '[0]';
	let result_json : any = jp(query, {data:data}).value;
	let keys : string[] = [];

	if ( result_json instanceof Object ) {
		for(let k in result_json) {
			keys.push(k);
		}
	}

	return keys;
}

// Retrives the tables' names.
// data: data containing the JSON object.
// return: an array of table names if it is found. Else null.
export function get_tables(data: object) : string[]{
	let keys : string[] = [];
	for(var k in data) {
		keys.push(k);
	}

	if ( keys.length == 0 ) {
		return <string[]>[];
	}

	return keys;

}

// Retrives all possible values in a table.
// data: data containing the JSON object
// table_name: name of the table to get the values from.
// col_name: name of the column to get the values from.
// return: an array of possible values of the table's column if it is found. Else null.
export function get_values(data: object, table_name: string, key: string) : string[]{
	let query : string = table_name + '[*].' + key;
	let result_json = jp(query, {data:data}).value;

	if ( result_json.length === 0 ) {
		return <string[]>[];
	}

	let result : string[] = [];
	for ( let i = 0; i < result_json.length; ++i ) {
		if ( result.indexOf(result_json[i]) === -1 ) {
			result.push(result_json[i]);
		}
	}

	return result;
}

// Simple function that exposes jsonpath's query function
// PS don't need to write test case for this since it's just a wrapper
export function query(data: object, query: string): any {
	return jp.query(data, query);
}

// fetches data from the JSON
// data: data containing the JSON object
// table_name: name of the table to get the values from.
// keys: keys seperated by commas
// filter: an array of filters in the form of ["key = value & key != value | ].
//         If null or undefined is provided, will return every entry.
// return: an array of possible values of the table's column if it is found. Else null.
export function fetch(data: object, table_name: string, keys: string, filters?: string) : iObject[] {
	if ( !filters ) { filters = "" }

	//query = "skills:select(name, text)[*name:contains(regen)]";

	let query: string = table_name;



	query += '[*';

	// cater for:
	// key~value 1 & key ~ value & key ~ 'value' & key~'value'
	// /\w+(\s+)?(\~)(.*?)(?=(\s+)?(&|\||$))/gi
	const regexp:RegExp = /\w+(\s+)?(\~)(.*?)(?=(\s+)?(&|\||$))/gi;
	let tilt:string[]|null = filters.match(regexp);

	if (tilt != null) {
		//console.log("--filter start------------------")
		//  for every of the regex found...
		for (let i = 0; i < tilt.length; ++i ) {
			//console.log("specimen: " + tilt);

			// get tilt length
			let initial_length:number = tilt[i].length;

			// remove all spaces around the tilde
			tilt[i] = tilt[i].replace(/\s*(~)\s*/g, '~');
			//console.log("spaces removed: " + tilt);

			// remove qutations if any
			tilt[i] = tilt[i].replace(/('|")/g, '');
			//console.log("quotations removed: " + tilt);

			// replace '~' with ':contains(' and wrap around with ')'
			tilt[i] = tilt[i].replace('~', ':contains(') + ')';
			//console.log("replace ~ with contains(): " + tilt);

			//  get the start and end point of the regex
			let start_pt:number = filters.search(regexp);
			let end_pt:number = start_pt + initial_length;

			// replace with tilt[i]
			filters = filters.substr(0, start_pt) + tilt[i] + filters.substr(end_pt);
			//console.log("replace!: " + filters);
		}
		//console.log("--filter stop-------------------")
	}

	query += filters + ']';


	if (keys != "*") {
		query += ":select(" + keys + ")";
	}

	//console.log(query);
	//query = "skills[*name:contains(regen)]:select(text)";
	let helpers = {
		contains: function (input:string, arg:string) {
			//console.log(input + ": " + arg + ": " + input.includes(arg));
			return input.match(new RegExp(arg, 'i')) != null;
		},
		select: function (input:string) {
			if (Array.isArray(input)) {
				let keys = [].slice.call(arguments, 1)
				return input.map((item: any) => {
					return Object.keys(item).reduce((result: any, key: string) => {
						if (~keys.indexOf(key)) {
							result[key] = item[key]
						}
						return result;
					}, {})
				})
			}
		} 
	}

	let results = jp(query, {
			data:data,
			locals:helpers
	}).value;

	return results;
}


// QOL functions

// quick deep search for a key and returns its value(s) without filter
export function deep_find(data: any, return_key: string, search_key: string, search_value: string): iObject[]  {
    return fetch(data, "[**]", return_key, search_key + "=" + search_value);
}

// helper functions for searching things by alias.
export function deep_find_with_alias(alias_data: any, data: any, return_key: string, search_key: string, search_value: string): iObject[] {
    let target: string = search_value;
    if (alias_data[target]) {
        target = alias_data[target];
    }
    
    return deep_find(data, return_key, search_key, target);
}

// 1 if target is found
// 0 if target is not found
// -1 if alias already exist
// -2 if there is a target with same name as alias
export function add_alias(alias_data: any, data: any, alias: string, target: string, key: string): number{
     // <X> <seperator> <Y>

    // if alias exist, fail
    if (alias_data != null && alias_data[alias] != null) {
        return -1;
    }

    // if target does not exist, fail
	let result: iObject[] = fetch(data, "[**]", "text", key + "=" + target);
    if (result.length <= 0) {
        return 0;
    }

	// if there is a target with same name as alias, fail
	result = fetch(data, "[**]", "text", key + "=" + alias);
	if (result.length > 0) {
		return -2;
	}

    // add to the alias data
    alias_data[alias] = target;

    return 1;
}

// 1 if alias is found
// 0 if alias is not found
export function remove_alias(alias_data: any, alias: string): number {
    //sui, remove alias <alias>
    if (alias_data[alias] == null) {
        return 0;
    }
    delete alias_data[alias];
    return 1;
}

export function get_alias(alias_data: any, alias: string): string {
    return alias_data[alias];
}