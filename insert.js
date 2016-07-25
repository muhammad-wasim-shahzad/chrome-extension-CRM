/**
 * Created by Vizteck on 7/19/2016.
 */



chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });


//alert("this is inser.js file");

//chrome.runtime.onMessage.addListener(function (msg) {
//    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
//
//
//    }
//});
//
//
//
//
//function backgroundFunction()
//{
//    return "hello from bacgkround";
//}
//
//
//
//var textnode = document.createTextNode("Water");
//newItem.appendChild(textnode);
//
//var list = document.getElementById("name-container");
//list.insertBefore(newItem, list.childNodes[0]);