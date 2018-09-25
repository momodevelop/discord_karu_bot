/************************************************************************************
@name: cJsonDB
@author: Gerald 'Momo' Wong

Simple wrapper around json-query for people who don't want to go through its syntax.
It works only for a JSON that's structured like a table (with columns as filters and rows as content)
Functions are pure and does not modify arguments in anyway.

The JSON schema that thesepublics work are ideally as follows:
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
import { fetch as _fetch, get_alias, get_keys, get_tables, get_values, query as _query, deep_find, deep_find_with_alias, add_alias, remove_alias } from './gJsonQueryFunc'
import { readFileSync, writeFileSync } from 'jsonfile';
import { iObject } from './gJsonDBCommon';

export class cJsonDB {
    protected dataJson: any;
    protected aliasJson: any;

    protected dataJsonPath: string;
    protected aliasJsonPath: string;

    constructor() {
        this.dataJson = this.aliasJson = null;
    }

    public setDataJson(dataJsonPath: string) {
        this.dataJson = readFileSync(dataJsonPath);
        this.dataJsonPath = dataJsonPath;
        // TODO: check validity??
    }

    public setAliasJson(aliasJsonPath: string) {
        this.aliasJson = readFileSync(aliasJsonPath);
        this.aliasJsonPath = aliasJsonPath;
    }
    // this.dataJson: this.dataJson containing the JSON object
    // table_name: name of the table to get the keys from
    // return: an array of keys of the table if it is found. Else null.
    public getKeys(table_name: string): string[] {
        return get_keys(this.dataJson, table_name);
    }

    // Retrives the tables' names.
    // this.dataJson: this.dataJson containing the JSON object.
    // return: an array of table names if it is found. Else null.
    public getTables(): string[] {
        return get_tables(this.dataJson);
    }

    // Retrives all possible values in a table.
    // this.dataJson: this.dataJson containing the JSON object
    // table_name: name of the table to get the values from.
    // col_name: name of the column to get the values from.
    // return: an array of possible values of the table's column if it is found. Else null.
    public getValues(table_name: string, key: string): string[] {
        return get_values(this.dataJson, table_name, key);
    }

    // Simplepublic that exposes jsonpath's querypublic
    // PS don't need to write test case for this since it's just a wrapper
    public query(query_string: string) {
        return _query(this.dataJson, query_string);
    }

    // Fetches data from the JSON
    // data: data containing the JSON object
    // table_name: name of the table to get the values from.
    // key: name of the key to get the values from. Can be null.
    // filter: an array of filters in the form of ["key = value & key != value | ].
    //         If null or undefined is provided, will return every entry.
    // return: an array of possible values of the table's column if it is found. Else null.
	public fetch(table_name: string, key: string, filters?: string): iObject[] {
        return _fetch(this.dataJson, table_name, key, filters);
    }

    // quick deep search for a key and returns its value(s) without filter
	public deepFind(return_key: string, search_key: string, search_value: string): iObject[] {
        return deep_find(this.dataJson, "[**]", return_key, search_key + "=" + search_value);
    }

	public deepFindWithAlias(return_key: string, search_key: string, search_value: string): iObject[] {
        return deep_find_with_alias(this.aliasJson, this.dataJson, return_key, search_key, search_value);
    }

    // 1 if target is found
    // 0 if target is not found
	// -1 if alias already exist
	public addAlias(alias: string, target: string, key: string): number {
        let ret_value: number = add_alias(this.aliasJson, this.dataJson, alias, target, key);
        writeFileSync(this.aliasJsonPath, this.aliasJson, { spaces: 4, EOL: '\r\n' });

        return ret_value;
    }

    // 1 if alias is found
    // 0 if alias is not found
    public removeAlias(alias: string): number {
        let ret_value: number = remove_alias(this.aliasJson, alias);
        writeFileSync(this.aliasJsonPath, this.aliasJson, { spaces: 4, EOL: '\r\n' });
        return ret_value;
    }

    public getAlias(alias: string): string {
        return get_alias(this.aliasJson, alias);
    }
}
