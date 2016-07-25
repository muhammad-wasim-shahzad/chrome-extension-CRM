/**
 * Created by Vizteck on 7/11/2016.
 */




chrome.runtime.onMessage.addListener(function (msg, sender) {
    // First, validate the message's structure
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        // Enable the page-action for the requesting tab
        chrome.pageAction.show(sender.tab.id);


    }


});


chrome.extension.sendRequest({greeting: "hello"}, function (response) {
    console.log(response.farewell);

    chrome.tabs.onUpdated.addListener(function (tab) {

        chrome.tabs.executeScript(tab.id, {
            file: "insert.js"

        });
    });

});

//chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//
//        if (request.from == "content") {
//
//
//
//                sendResponse({farewell: "goodbye"});
//
//
//        }
//    });




