//ASSET LINKS
var _container = document.getElementById("container");

var cover_img = 'assets/Cover.png';
var page_img = ['assets/Page.png', 'assets/Page50.png', 'assets/Page100.png'];
var back_img = 'assets/backCover.png';
var next_img = 'assets/UI/next1.png';
var prev_img = 'assets/UI/prev1.png';
var quit_img = 'assets/UI/close1.png';
var close_img = 'assets/UI/close1.png';

//total number of pages in the passport (not counting cover and back cover)
var totalPages = 3; 

//STAMPS
//Create empty stamp array the first time you open the app
var stamps;
        if(!localStorage) {
            localStorage.setItem('stamps', '[]');
        } else {
            stamps = JSON.parse(localStorage.getItem('stamps')) || [];
        }
        console.log(stamps);

//Stamp asset URLs
var stampImages = {
    Algeria: 'assets/Flags/Algeria.png',
    Australia: 'assets/Flags/Australia.png',
    Bangladesh: 'assets/Flags/Bangladesh.png',
    Brazil: 'assets/Flags/Brazil.png',
    Canada: 'assets/Flags/Canada.png',
    Croatia: 'assets/Flags/Croatia.png',
    CyprusAndGreece: 'assets/Flags/CyprusGreece.png',
    UAE: 'assets/Flags/UAE.png',
};


//Utility
document.addEventListener('keydown', function() {
    if(event.key == 'k') {
        localStorage.clear();
        console.log('Local storage cleared');
    }
});

class page {
    constructor(_k) {
        this.k = _k;
        this.stamp = 0;
        this.skin = 0;
    }

    displayStamp() {
        console.log(this.stamp);
        if(this.stamp) {
            var pageStamp = document.createElement("img");
            pageStamp.className = "stamp";
            pageStamp.src = stampImages[this.stamp];
            document.body.appendChild(pageStamp);
        }
    }

    display() {
        var background = document.createElement("img");
        background.className = "page";

        switch(this.k) {
            case 1: //cover
                background.src = cover_img;
                break;
            
            case 2: //pages
                background.src = page_img[this.skin];
                break;
            
            case 3: //back cover
                background.src = back_img;
                break;
        }
        // p.appendChild(background);
        document.body.appendChild(background);
        this.displayStamp();
    }
}


class passport {
    constructor() {
       this.pages = [];
       this.pages[0] = new page(1);
        for(var i = 1; i < totalPages+1; i++) {
            this.pages[i] = new page(2);
        }
       this.pages[totalPages+1] = new page(3);
       this.activePage = 0;

        //goes through as many pages as there are stamps, adding stamps in order
       for(var i = 1; i < this.pages.length-1 && i < stamps.length+1; i++) {
            this.pages[i].stamp = stamps[i-1];
            console.log(this.pages[i].stamp);
        }

       ///////////UI
        this.nextPageButton = document.createElement("img");
        this.nextPageButton.id = "next-page";
        this.nextPageButton.className = "UI-button page-advance";
        this.nextPageButton.src = next_img;
        this.nextPageButton.addEventListener('click', () => this.pageTurn(true));

        this.prevPageButton = document.createElement("img");
        this.prevPageButton.id = "prev-page";
        this.prevPageButton.className = "UI-button page-advance";
        this.prevPageButton.src = prev_img;
        this.prevPageButton.addEventListener('click', () => this.pageTurn(false));

        this.quitButton = document.createElement("img");
        this.quitButton.id = "quit-button";
        this.quitButton.className = "UI-button";
        this.quitButton.src = quit_img;
        this.quitButton.addEventListener('click', function() {
            window.location.href = "index.html";
        });
        
        this.closeButton = document.createElement("img");
        this.closeButton.id = "close-button";
        this.closeButton.className = "UI-button page-advance";
        this.closeButton.src = close_img;
        this.closeButton.addEventListener('click', () => this.closePassport());
    }
   
    displayUI() {
        document.body.appendChild(this.quitButton);

        if(this.activePage < this.pages.length-1) {
            document.body.appendChild(this.nextPageButton);
        } else {
            document.body.removeChild(this.nextPageButton);
        }

        if(this.activePage > 0) {
            document.body.appendChild(this.prevPageButton);
            document.body.appendChild(this.closeButton);
        } else {
            document.body.removeChild(this.prevPageButton);
            document.body.removeChild(this.closeButton);

        }
    }

    //true to advance page, false to go back a page
    pageTurn(n) {
            //make stamps not show on the wrong pages
        if(this.pages[this.activePage].stamp != 0) {
            var prevStamp = document.body.getElementsByClassName('stamp');
            // console.log(this.pages[this.activePage].stamp);
            // console.log(prevStamp[0]);
            document.body.removeChild(prevStamp[0]);
        }

        //turn the page
        if(n) {
            this.activePage += 1;
        } else {
            this.activePage -= 1;
        }

 

        this.display(); //show changes

        console.log(this.activePage);
    }

    closePassport() {
        this.activePage = 0;
        this.display();
        console.log(this.activePage);
    }

    display() {
        this.pages[this.activePage].display();
        
        this.displayUI();
     }
}
   


var P = new passport();

P.display();




/*
//Testing, change later
var stamp = [];
stamp[0] = document.createElement("img");
stamp[0].className = "stamp";
stamp[0].src = "assets/Flags/Cyprus.png";

stamp[0].acquired = false;
stamp[0].added = false;

console.log(stamp[0]);

if (localStorage.gotCyprus) {
    stamp[0].acquired = true;
}

if (stamp[0].acquired && !stamp[0].added) {
    document.body.appendChild(stamp[0]);
    stamp[0].added = true;
} 
*/