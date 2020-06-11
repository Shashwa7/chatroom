//responsoible for the UI
// render chat templates to the DOM
// clear the list of chats (when the room changes)

class ChatUI {
    constructor(chatList) {
        this.chatList = chatList;
    }

    clear(){
        //clearing mssg list from window while swtiching b/w rooms
        this.chatList.innerHTML = '';
    }

    render(chatData) {

        //formatting dates in much readleble format using date fns lib.(releative date format like: 1m/1hr/1day ago)
        const mssgTime = dateFns.distanceInWordsToNow(
            chatData.created_at.toDate(),
            { addSuffix: true } //add 'ago' as suffix
        );

        //single chat obj
        const chat = `
            <li class="list-group-item">
                <span class='username'>${chatData.username}</span>
                <span class='message'>${chatData.message}</span>
                <div class='time'>${mssgTime}</div>
            </li>
        `;

        this.chatList.innerHTML += chat;
    }; //call this method in app.js
}