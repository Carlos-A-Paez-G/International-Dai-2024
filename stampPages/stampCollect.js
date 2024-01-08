var obtained = false;
var stamps = JSON.parse(localStorage.getItem('stamps')) || [];
console.log(stamps);

for(var i = 0; i < stamps; i++) {
    if (stamps[i] = 'UAE') {
        obtained = true;
    }
}

if(!obtained) {
    stamps.push('UAE');
    localStorage.setItem('stamps', JSON.stringify(stamps));
    console.log(localStorage.getItem('stamps'));
}