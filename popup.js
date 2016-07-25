/**
 * Created by Wasim on 7/11/2016.
 */




var myURLStringArray;

//set content to Extension html

function setDOMInfo(info) {


    document.getElementById('name').textContent = info.person_name;

    document.getElementById('location').textContent = info.location;

    document.getElementById('profession').textContent = info.profession;

    document.getElementById('hidden_url').textContent=info.profile_url_encoded_string;

    var x = document.createElement("img");

    x.src = info.pic;

    x.setAttribute("id", "linkedin_image");

    x.setAttribute("width", 110);
    x.setAttribute("height", 110);
    x.setAttribute("alt", "No image");
    x.style.borderRadius = "50%";


    document.getElementById("image").appendChild(x);


}

//Send data to CRM

function send_data() {

    var session_id;

    var information = {};
    information.name = document.getElementById('name').textContent;

    information.location = document.getElementById('location').textContent;

    information.profession = document.getElementById('profession').textContent;
    information.pic = document.getElementById("linkedin_image").src;

           information.hidden_url=document.getElementById('hidden_url').textContent;





    var api_url = 'http://localhost/sugarcrm/service/v4/rest.php?method=login&input_type=JSON&response_type=JSON&rest_data={"user_auth":{"user_name":"admin","password":"e10adc3949ba59abbe56e057f20f883e","version":"1.0"},"application_name":"RestLogin"}';
    var user_name = "admin";    //SugarCRM username
    var password = "123456";    //SugarCRM password


    var xhr = new XMLHttpRequest();
    xhr.open("GET", api_url, true);

    xhr.onreadystatechange = function (response) {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var resp = JSON.parse(xhr.responseText);

            //document.cookie = "extension_data=" + resp.id;

            session_id = resp.id;
            console.log(session_id);

            var insert_contact = document.getElementById('contact');
            var insert_account = document.getElementById('account');
            var insert_leads = document.getElementById('lead');



            var select_leads_params = {

                "session": session_id,
                "module_name": "Leads",
                "query": "website='"+information.hidden_url+"'" ,
                "order_by": "",
                "offset": 0,
                "select_fields": ["website"],
                "link_name_to_fields_array": [{
                    "name": "email_addresses",
                    "value": ["email_address", "opt_out", "primary_address"]
                }],

                "deleted": 0,
                "favorites": false

            };
            var json_select_leads=JSON.stringify(select_leads_params);

            var fetching_url = "http://localhost/sugarcrm/service/v4/rest.php?method=get_entry_list&input_type=JSON&response_type=JSON&rest_data="+ json_select_leads;


            var http_fetched_leads = new XMLHttpRequest();
            http_fetched_leads.open("GET",fetching_url, true);

            http_fetched_leads.onreadystatechange = function () {
                if (http_fetched_leads.readyState == 4 && http_fetched_leads.status == 200) {
                    var response = JSON.parse(http_fetched_leads.responseText);

                    console.log(response);
                   myURLStringArray = response.entry_list.length;
                    console.log("entry list ",myURLStringArray);

                    if (insert_contact.checked) {

                        insertContact();
                    }
                    if (insert_account.checked) {

                        insertAccount();
                    }
                    console.log(myURLStringArray,insert_leads.checked);
                    if (insert_leads.checked && myURLStringArray==0) {

                        insertLeads();
                    }
                    else
                    {
                        alert("Already in Sugar database");
                        return false;
                    }


                }
            };

            http_fetched_leads.send('information=' + encodeURIComponent(json_select_leads));




        }
    };

    xhr.send();


// For Contacts Insertion

    function insertContact() {


        var insertion_data = {
            session: session_id,

            module: 'Contacts',

            "name_value_list": [
                {
                    name: 'first_name',
                    value: information.name
                },
                {
                    name: 'status',
                    value: 'New'
                },

                {
                    name: 'primary_address_country',
                    value: information.location
                },
                {
                    name: 'department',
                    value: information.profession
                },
                {
                    name: 'profile_url_c',
                    value: hidden_url
                }


            ]


        };

        var json_contact_array = JSON.stringify(insertion_data);
        console.log(typeof(json_contact_array));
        var contact_url = "http://localhost/sugarcrm/service/v4/rest.php?method=set_entry&input_type=JSON&response_type=JSON&rest_data=" + json_contact_array;
        var xhttp_contact = new XMLHttpRequest();
        xhttp_contact.open("GET", contact_url, true);
        xhttp_contact.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


        xhttp_contact.onreadystatechange = function () {
            if (xhttp_contact.readyState == 4 && xhttp_contact.status == 200) {

                var response = JSON.parse(xhttp_contact.responseText);

                console.log('response', xhttp_contact.responseText);
            }
        };

        xhttp_contact.send('information=' + encodeURIComponent(json_contact_array));
    }

//For Account Insertion

    function insertAccount() {


        var insertion_data = {
            session: session_id,

            module: 'Accounts',

            "name_value_list": [
                {
                    name: 'name',
                    value: information.name
                },
                {
                    name: 'status',
                    value: 'New'
                },

                {
                    name: 'country_c',
                    value: information.location
                },
                {
                    name: 'profession_c',
                    value: information.profession
                },
                {
                    name: 'profile_url_c',
                    value: hidden_url
                }


            ]


        };

        var json_contact_array = JSON.stringify(insertion_data);
        console.log(typeof(json_contact_array));
        var contact_url = "http://localhost/sugarcrm/service/v4/rest.php?method=set_entry&input_type=JSON&response_type=JSON&rest_data=" + json_contact_array;
        var xhttp_account = new XMLHttpRequest();
        xhttp_account.open("GET", contact_url, true);
        xhttp_account.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


        xhttp_account.onreadystatechange = function () {
            if (xhttp_account.readyState == 4 && xhttp_account.status == 200) {
                console.log(xhttp_account.responseText);
                var response = JSON.parse(xhttp_account.responseText);

                console.log('response', xhttp_account.responseText);
            }
        };

        xhttp_account.send('information=' + encodeURIComponent(json_contact_array));
    }

//FOR lead insertion

    function insertLeads() {



alert("goind to lead function");
        return false;

        var insertion_data = {
            session: session_id,

            module: 'Leads',

            "name_value_list": [
                {
                    name: 'first_name',
                    value: information.name
                },
                {
                    name: 'status',
                    value: 'New'
                },

                {
                    name: 'primary_address_country',
                    value: information.location
                },
                {
                    name: 'department',
                    value: information.profession
                },
                {
                    name: 'website',
                    value: information.hidden_url
                }


            ]


        };

        var json_contact_array = JSON.stringify(insertion_data);
        console.log(typeof(json_contact_array));
        var contact_url = "http://localhost/sugarcrm/service/v4/rest.php?method=set_entry&input_type=JSON&response_type=JSON&rest_data=" + json_contact_array;
        var xhttp_leads = new XMLHttpRequest();
        xhttp_leads.open("GET", contact_url, true);
        xhttp_leads.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


        xhttp_leads.onreadystatechange = function () {
            if (xhttp_leads.readyState == 4 && xhttp_leads.status == 200) {
                console.log(xhttp_leads.responseText);
                var response = JSON.parse(xhttp_leads.responseText);
                console.log('response', xhttp_leads.responseText);
            }
        };

        xhttp_leads.send('information=' + encodeURIComponent(json_contact_array));


    }


}


window.addEventListener('DOMContentLoaded', function () {

    var send = document.getElementById('send');

    //Check Box Validity
    var account_checkbox = document.getElementById('account');
    var contact_checkbox = document.getElementById('contact');
    var lead_checkbox = document.getElementById('lead');

    send.addEventListener('click', function () {
        if (account_checkbox.checked || contact_checkbox.checked || lead_checkbox.checked) {
            send_data();
        }
        else {
            alert("Please check at least one module");
        }
    });


    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {

        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'DOMInfo'},

            setDOMInfo);
    });
});



