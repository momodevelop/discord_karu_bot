import { Client, Message } from 'discord.js';

export class cDiscordBot {
	protected m_Msg: Message;
    protected m_Token : string = "";
    protected m_Bot : Client;

    // callbacks
    protected m_ReplyCB: (str: string) => void;
    constructor(token: string) {
        this.m_Token = token;
        this.m_Bot = new Client();
    }

    // helper functions only for discord
    public static WrapCss(str:string) : string {
    	return "```css\n"+str+"\n```";
    }

    public static WrapCode(str:string) : string {
    	return "```\n"+str+"\n```";
    }

    public SendReply(str : string) : void {
        if ( this.m_Msg != null) {
            this.m_Msg.channel.send(str);
        }
    }
    public SendPrivateReply(str : string) : void {
        if ( this.m_Msg != null) {
            this.m_Msg.author.send(str);
        }
    }

    // Callback setters
    public SetReplyCallback( callback:(msg:string)=>void ) {
        this.m_ReplyCB = callback;
    }

    public Run() : Promise<void>{
		return this.m_Bot.login(this.m_Token)
			.then((r: string) => {
				this.m_Bot.on('message', (msg: Message) => {
					// reject self
					if (msg.author.id === this.m_Bot.user.id) {
						return;
					}
					this.m_Msg = msg;
					this.m_ReplyCB(msg.content);
					return Promise.resolve();
				});
			});
    }
}
