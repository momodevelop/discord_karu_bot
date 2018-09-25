import { fetch }  from './gJsonQueryFunc';
import { readFileSync } from 'fs';

/*
Sample msg format:
"coc": [{
    "id": "help",
    "text": "Special CoC commands are: ```sui, coc resist <active> vs <passive>```"
}]
*/
export class cMsg
{
    protected m_Messages:any = null;
    protected m_LabelColumnName:string;
    protected m_MsgColumnName:string;
    constructor( filename:string, label_column_name:string, msg_column_name:string ) {
        try {
            this.m_Messages = JSON.parse(readFileSync(filename, "utf8"));
            this.m_LabelColumnName = label_column_name;
            this.m_MsgColumnName = msg_column_name;
        } catch(e) {
            throw Error("[cMsgSystem] Failed to initialize with filename: " + filename + "\n" + e );
        }
    }

    public GetJSONMessage(table:string, key:string) :string{
        let result = fetch(this.m_Messages, table, this.m_MsgColumnName, this.m_LabelColumnName + "=" + key);
        if (result && result.length > 0) {
            return result[0];
        }
        else {
            return "";
        }
    }

    public GetRandomJSONMessage(table:string) : string {
        let result:any = fetch(this.m_Messages, table, this.m_MsgColumnName);
        if ( result && result.length != 0 ) {
            let rand:number = Math.floor(Math.random() * result.length);
            return result[rand];
        }

        return "";
    }
}
