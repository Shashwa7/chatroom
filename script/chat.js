//responsible for getting chats and data together
/*
    Responsibilites:
    0. add new chat documents to 'chatLog' collectio 
    1. Setting up a real-time listener to get new chats
    2. updating the username
    3. updating the room
 */

 class Chatroom{

    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chatLog');
        this.unsub; //not initializing here, initialized in unsub fnc
    }

    async addChat(message){
        
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
            //parsing our date obj into fb type date obj
        };

        //save/add the chat document to chatLog collection
        const response = await this.chats.add(chat);
        return response;
    }

    //realtime listener: this can't be async method cuz this func will be dynamic.
    getChats(callbackFnc){
    this.unsub =  this.chats
            .where('room','==', this.room)
            .orderBy('created_at')
            .onSnapshot(snap => {
                snap.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        //update the ui 
                        callbackFnc(change.doc.data());
                        //chage.doc.data() is a parameter for the callback func
                    }
                });
            }); //basically returns an unsub fnc
            //we're doing this cuz while switching from the current chatroom to the new one(updateChatroom()) we must unsubscribe the realtime listner attached with the older one.
         }
        updateUserName(username){
            this.username = username;
            //stroing name in local storage
            localStorage.setItem('username',username);
        }

        updateChatRoom(newRoom){
            this.room = newRoom;
            console.log("Room updated!");
            if(this.unsub){
                this.unsub();
            //we aren't directly calling unsub() cuz it is not intialised by the constructor: throws error
            //only calling when it is initalized by the getChats();
            //here we're basically insubscribing from the changes of the older room
            }
        }
}
 
 //where(field,condition,string), basically filters result as oper the parameter passed
 //orderBy('created_at'): this will arrange the output as per the timestamp of each mssg.(AESC order)
 //note:: initially orderBy(field) will throw an error of not assigned 'index', inorder to resolve this you must click on the error link that will direct you to a fb page where you can set up an index for your collection
