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

// fetches data from the JSON
// data: data containing the JSON object
// table_name: name of the table to get the values from.
// key: name of the key to get the values from. Can be null.
// filter: an array of filters in the form of ["key = value & key != value | ].
//         If null or undefined is provided, will return every entry.
// return: an array of possible values of the table's column if it is found. Else null.
export function fetch(data: object, table_name: string, key?: string, filters?: string) : string[] {
	if ( !filters ) { filters = "" }
	if ( !key ) { key = ""; }

	let query : string = table_name + '[*';

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

	if ( key.length != 0 ) {
		query += "." + key;
	}

	//console.log(query);

	let helpers = {
		contains: function (input:string, arg:string) {
			//console.log(input + ": " + arg + ": " + input.includes(arg));
	  		return input.match(new RegExp(arg, 'i')) != null;
		}
	}

	let results = jp(query, {
			data:data,
			locals:helpers
	}).value;

	return results;
}