//responsible for combining ui.js and chat.js in order to run our application

//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const room  = document.querySelector('.chat-rooms');

//add new chat
newChatForm.addEventListener('submit', e =>{
    e.preventDefault();

    const message = newChatForm.message.value.trim();
    //.messages is a input form id.
   
    //this returns a promise as addChat() is a async fnc
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));

    
    //auto scroll on new mssg added to chat window
    window.setInterval(function() {
    let chatwindow = document.querySelector('.chat-window');
    chatwindow.scrollTop = chatwindow.scrollHeight;
    }, 1000);
    

});

//update username
newNameForm.addEventListener('submit', e  => {
    e.preventDefault();

    //update name vis chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateUserName(newName);

    //reset the form
    newNameForm.reset();

    //show then hide the update mssg
    updateMssg.innerText = `Your name is updated to ${newName}`;
    setTimeout(() => {
        updateMssg.innerText = ``;
    }, 3000);
    //here we are resetting the mssg to an empty string
})

//check local storage for a name
const username = localStorage.username ? localStorage.username : 'anonymous';

//update the chat room
room.addEventListener('click', e => {
    
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();

        //update room
        chatroom.updateChatRoom(e.target.getAttribute('id'));
        //now the old room real time listener is unsub
        //but we have to reinvoke real time listnere for the new room

        chatroom.getChats(chat => chatUI.render(chat));
        //here chat is a document data and then we are passing this document to render func to display on the window

        //while swtiching b/w rooms it will take certain time to update the chat log from DB respective to the current room
    }


});

//class instances
const chatUI = new ChatUI(chatList);
const chatroom  = new Chatroom('general', username);


//get chats and render(callback fnc)
chatroom.getChats(chatData => {
   chatUI.render(chatData); 
   //firing this fnc we are getting single doc obj and using it as a parameter for render(doc);
})

