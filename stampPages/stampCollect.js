var obtained = false;
var stamps = JSON.parse(localStorage.getItem('stamps')) || [];
console.log(stamps);

//extracts the country name from the url at index 1
//important!! the url needs to contain the country name separated by 000 on both sides
var path = window.location.pathname;
var pathsplit = path.split('000');

var country = pathsplit[1];

for(var i = 0; i < stamps.length; i++) {
    if (stamps[i] == country) {
        console.log("oh noo");
        obtained = true;
    }
}

if(!obtained) {
    console.log(stamps);
    stamps.push(country);
    console.log(stamps);
    localStorage.setItem('stamps', JSON.stringify(stamps));
    console.log(localStorage.getItem('stamps'));
}


//get the country string with spaces
var countryText = country[0]; //will contain the properly formatted country name
var num = 0; //the last character that was cut from


for(var i = 1; i < country.length; i++) {
    if(country[i] == country[i].toUpperCase()) {
        countryText = countryText.concat(" ");   
    }
    countryText = countryText.concat(country[i]);
}

var image = document.createElement('img');
image.src = "../assets/Flags/" + country + ".png";
image.className = "stampAcquired";

var text = document.createElement('p');
text.innerHTML = "Congratulations! You got the " + countryText + " stamp!!!";
text.className = "stampAcquiredtxt";

var backButton = document.createElement('button');
backButton.className = "backButton";
backButton.innerHTML = "Return to the Passport";
backButton.addEventListener('click', function returnToPassport() {
                                    window.location.href = "../passport.html";
                                });

document.body.appendChild(image);
document.body.appendChild(text);
document.body.appendChild(backButton);