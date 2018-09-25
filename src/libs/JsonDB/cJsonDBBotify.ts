import { cJsonDB } from './cJsonDB';
import { CombineStrings, iObject } from './gJsonDBCommon';

export class cReturnObject<T> {
	public type: string; // the type of function that's called
	public results: T; // the results (if any)
	public params: any; // object containing any other extra information specific to the function
	public errorCode: eErrorCode;

	constructor(type: string, init_value: T) {
		this.type = type;
		this.results = init_value;
		this.params = {};
		this.errorCode = eErrorCode.FAIL;
	}
}

export enum eErrorCode {
    SUCCESS,
    FAIL,
    ALIAS_TARGET_NOT_FOUND,
    ALIAS_EXISTS,
	ALIAS_NOT_FOUND,
	ALIAS_TARGET_WITH_SAME_NAME_FOUND
}

export class cJsonDBBotify {
    private jsonDB: cJsonDB;

    constructor() {
        this.jsonDB = new cJsonDB;
    }

    public SetDataJson(path: string) {
        this.jsonDB.setDataJson(path)
    }

    public SetAliasJson(path: string) {
        this.jsonDB.setAliasJson(path);
    }

    // Searches for items with syntax almost like mySQL.
    // ie: select <keys seperated by commas> from <table_name> where <column_name><=|~|!=><id> <and|or> <column_name><=|~|!=><id> <and|or> ...etc...
    // ie: sui, find name from skills where name=maiden and class~alice
	// returns a cReturnObject
	public Select(from_seperator: string, where_seperator: string, args: string[]): cReturnObject<iObject[]> {
		let ret_value: cReturnObject<iObject[]> = new cReturnObject("select", []);

		let from_index: number = args.indexOf(from_seperator);
		if (from_index == -1 || from_index == args.length - 1) {
			return ret_value;
		}

		let where_index: number = args.indexOf(where_seperator); // can be -1

		// combine string of everything up till from_index
		let keys: string = CombineStrings(args, ",", 0, from_index);

		// table_name is right after from
		let table_name: string = CombineStrings(args, " ", from_index + 1, where_index);

		let filter: string = "";
		if (where_index != -1 || where_index == args.length - 1) {
			filter = CombineStrings(args, " ", where_index + 1);
		}
		ret_value.results = this.jsonDB.fetch(table_name, keys, filter);
        ret_value.errorCode = eErrorCode.SUCCESS;

        return ret_value;
    }

    public GetKeys(args: string[]): cReturnObject<string[]> {
        //args: <table_name>
        let ret_value: cReturnObject<string[]> = new cReturnObject("get_keys", []);
        if (args.length != 1) {
            return ret_value;
        }

        ret_value.results = this.jsonDB.getKeys(args[0]);
        ret_value.errorCode = eErrorCode.SUCCESS;
        ret_value.params.table = args[0];

        return ret_value;
    }

    // Doesn't actually have arguments
	public GetTables(): cReturnObject<string[]> {
		let ret_value: cReturnObject<string[]> = new cReturnObject("get_tables", []);
        ret_value.results = this.jsonDB.getTables();
        ret_value.errorCode = eErrorCode.SUCCESS;
        return ret_value;
    }

	public GetValues(seperator: string, args: string[]): cReturnObject<string[]> {
        // <key> <seperator> <table>
		let ret_value: cReturnObject<string[]> = new cReturnObject("get_values", []);
        if (args.length != 3 || args[1] != seperator) {
            return ret_value;
        }

        ret_value.results = this.jsonDB.getValues(args[2], args[0]);
        ret_value.errorCode = eErrorCode.SUCCESS;

        ret_value.params.table = args[2];
        ret_value.params.key = args[0];

        return ret_value;
    }


    // helper functions for searching things by alias.
	public DeepFindWithAlias(return_key: string, search_key: string, args: string[]): cReturnObject<iObject[]> {
		let ret_value: cReturnObject<iObject[]> = new cReturnObject("alias", []);
		if (args.length <= 0) {
			ret_value.errorCode = eErrorCode.FAIL;
			return ret_value;
		}


        let target: string = CombineStrings(args, " ");
        ret_value.params.target = target;
        ret_value.results = this.jsonDB.deepFindWithAlias(return_key, search_key, target);
        ret_value.errorCode = eErrorCode.SUCCESS;

        return ret_value;
    }

    // errorCode:
    // 1 if target is found
    // 0 if target is not found
    // -1 if alias already exist
	public AddAlias(seperator: string, key: string, args: string[]): cReturnObject<null> {
		let ret_value: cReturnObject<null> = new cReturnObject("add alias", null);

        let found: number = -1;
        for (let i = 0; i < args.length; ++i) {
            if (args[i] == seperator) {
                found = i;
                break;
            }
        }

        if (found == -1) {
            return ret_value;
        }

        //if alias is found
        let alias: string = CombineStrings(args, " ", 0, found);
        let target: string = CombineStrings(args, " ", found + 1);

        let result: number = this.jsonDB.addAlias(alias, target, key);
        switch (result) {
            case 1:
                ret_value.errorCode = eErrorCode.SUCCESS;
                break;
            case 0:
                ret_value.errorCode = eErrorCode.ALIAS_TARGET_NOT_FOUND
                break;
            case -1:
                ret_value.errorCode = eErrorCode.ALIAS_EXISTS;
				break;
			case -2:
				ret_value.errorCode = eErrorCode.ALIAS_TARGET_WITH_SAME_NAME_FOUND;
				break;

        }

        ret_value.params.alias = alias;
        ret_value.params.target = target;

        return ret_value;
    }

	public RemoveAlias(args: string[]): cReturnObject<null> {
        let ret_value: cReturnObject<null> = new cReturnObject("remove alias", null);
        if (args.length == 0) {
            return ret_value;
        }

        //if alias is found
        let alias: string = CombineStrings(args, " ");
        ret_value.params.alias = alias;
        let result: number = this.jsonDB.removeAlias(alias);
        switch (result) {
            case 1:
                ret_value.errorCode = eErrorCode.SUCCESS;
                break;
            case 0:
                ret_value.errorCode = eErrorCode.ALIAS_NOT_FOUND;
                break;
        }

        return ret_value;
    }

	public GetAlias(args: string[]): cReturnObject<string> {
		let ret_value: cReturnObject<string> = new cReturnObject("get alias", "");
		if (args.length == 0) {
			return ret_value;
		}

		let alias: string = CombineStrings(args, " ");
		let result: string = this.jsonDB.getAlias(alias);
		if (result == null) {
			ret_value.errorCode = eErrorCode.ALIAS_NOT_FOUND;
			return ret_value;
		}

		ret_value.results = (result);
		ret_value.params.alias = alias;
		ret_value.errorCode = eErrorCode.SUCCESS;

		return ret_value;
	}

}
