/**
 * Created by Vizteck on 7/11/2016.
 */



//
//chrome.runtime.onMessage.addListener(function (msg, sender) {
//    // First, validate the message's structure
//    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
//        // Enable the page-action for the requesting tab
//        chrome.pageAction.show(sender.tab.id);
//
//     function getTokenCheckRedundancy() {
//
//         console.log("background js is is working well");
//         return "returning from background";
//         var session_id;
//
//         var information = {};
//         information.name = document.getElementById('name').textContent;
//
//         information.location = document.getElementById('location').textContent;
//
//         information.profession = document.getElementById('profession').textContent;
//         information.pic = document.getElementById("linkedin_image").src;
//
//         information.hidden_url = document.getElementById('hidden_url').textContent;
//
//
//         var api_url = 'http://localhost/sugarcrm/service/v4/rest.php?method=login&input_type=JSON&response_type=JSON&rest_data={"user_auth":{"user_name":"admin","password":"e10adc3949ba59abbe56e057f20f883e","version":"1.0"},"application_name":"RestLogin"}';
//         var user_name = "admin";    //SugarCRM username
//         var password = "123456";    //SugarCRM password
//
//
//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", api_url, true);
//
//         xhr.onreadystatechange = function (response) {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//
//                 var resp = JSON.parse(xhr.responseText);
//
//                 //document.cookie = "extension_data=" + resp.id;
//
//                 session_id = resp.id;
//                 console.log(session_id);
//
//                 var insert_contact = document.getElementById('contact');
//                 var insert_account = document.getElementById('account');
//                 var insert_leads = document.getElementById('lead');
//
//
//                 var select_leads_params = {
//
//                     "session": session_id,
//                     "module_name": "Leads",
//                     "query": "website='" + information.hidden_url + "'",
//                     "order_by": "",
//                     "offset": 0,
//                     "select_fields": ["website"],
//                     "link_name_to_fields_array": [{
//                         "name": "email_addresses",
//                         "value": ["email_address", "opt_out", "primary_address"]
//                     }],
//
//                     "deleted": 0,
//                     "favorites": false
//
//                 };
//                 var json_select_leads = JSON.stringify(select_leads_params);
//
//                 var fetching_url = "http://localhost/sugarcrm/service/v4/rest.php?method=get_entry_list&input_type=JSON&response_type=JSON&rest_data=" + json_select_leads;
//
//
//                 var http_fetched_leads = new XMLHttpRequest();
//                 http_fetched_leads.open("GET", fetching_url, true);
//
//                 http_fetched_leads.onreadystatechange = function () {
//                     if (http_fetched_leads.readyState == 4 && http_fetched_leads.status == 200) {
//                         var response = JSON.parse(http_fetched_leads.responseText);
//
//                         console.log(response);
//                         myURLStringArray = response.entry_list.length;
//                         console.log("entry list ", myURLStringArray);
//
//                         if (insert_contact.checked) {
//
//                             insertContact();
//                         }
//                         if (insert_account.checked) {
//
//                             insertAccount();
//                         }
//                         console.log(myURLStringArray, insert_leads.checked);
//                         if (insert_leads.checked && myURLStringArray == 0) {
//
//                             insertLeads();
//                         }
//                         else {
//                             alert("Already in Sugar database");
//                             return false;
//                         }
//
//
//                     }
//                 };
//
//                 http_fetched_leads.send('information=' + encodeURIComponent(json_select_leads));
//
//
//             }
//         };
//
//         xhr.send();
//
//
//     }














//    }
//
//
//
//
//
//});



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if (request.from == "content") {


                chrome.tabs.onUpdated.addListener(function (tab) {

                    chrome.tabs.executeScript(tab.id, {
                        file: "insert.js"

                    });
                });
                sendResponse({farewell: "goodbye"});

           
        }
    });




