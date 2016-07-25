/**
 * Created by Vizteck on 7/11/2016.
 */



chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});


chrome.runtime.onMessage.addListener(function (msg, sender, response) {



    if(msg.subject=="cookie")
    {

        var dom_element = document.getElementById("headline-container");
        var div = document.createElement('div');
        var label = document.createElement('span');
        label.textContent = " Already in Sugar CRM";
        label.style.background = "red";
        label.style.color = "white";

        div.appendChild(label);


        dom_element.parentNode.insertBefore(div, dom_element);

    } else if (msg.entry == 1 || msg.entry == 2 || msg.entry == 3) {


    }

    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {


        var login = document.getElementsByTagName("legend").length;


        //Not login
        if (login == 0) {

            var img_src = document.getElementsByClassName('image photo lazy-loaded');


            var domInfo = {

                person_name: document.getElementById('name').innerHTML,

                location: document.getElementsByClassName('locality')[0].innerHTML,

                profession: document.getElementsByClassName('descriptor')[1].innerHTML,

                pic: img_src[0].src,


            };
            response(domInfo);
        }
        // For login
        else {

            var skills =[];

            var skill= document.getElementsByClassName('endorse-item-name-text');

            skill = [].slice.call(skill); //I have converted the HTML Collection an array
            skill.forEach(function(array) {
                skills.push(array.innerHTML);

            });

            console.log("skill out of loop",skills);



            var profile_url = document.getElementsByClassName('view-public-profile')[0];

            profile_url_string = encodeURIComponent(profile_url);

            var img_src_login = document.querySelectorAll('a#control_gen_3 img');

            var domInfologin = {

                person_name: document.getElementsByClassName('full-name')[0].innerHTML,

                profile_url_encoded_string: profile_url_string,
                skills:skills,

                location: document.querySelectorAll('[name=location]')[0].innerHTML,

                profession: document.querySelectorAll('[name=industry]')[0].innerHTML,

                pic: img_src_login[0].src,




            };
            response(domInfologin);
        }

    }


});

