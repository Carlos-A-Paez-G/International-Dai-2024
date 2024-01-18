var obtained = false;
var stamps = JSON.parse(localStorage.getItem('stamps')) || [];
console.log(stamps);

//extracts the country name from the url at index 1
//important!! the url needs to contain the country name separated by 000 on both sides
var path = window.location.pathname;
var pathsplit = path.split('000');

for(var i = 0; i < stamps.length; i++) {
    if (stamps[i] = pathsplit[1]) {
        obtained = true;
    }
}

if(!obtained) {
    stamps.push(pathsplit[1]);
    localStorage.setItem('stamps', JSON.stringify(stamps));
    console.log(localStorage.getItem('stamps'));
}