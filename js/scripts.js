var menuSlide = {
    init: function() {
        this.domCache();
        this.menuSlide();
        this.interval = setInterval(function(){
            menuSlide.menuTop();
        }, 20);
    },
    changeClass: function() {
        this.classQuan = this.items.classList;
        if (this.classQuan.length > 0) {
            this.items.classList.remove("open");
            this.menu.classList.remove("open");
        } else {

            this.items.classList.add("open");
            this.menu.classList.add("open");
        }
    },
    domCache: function(){
        this.menu = document.getElementById("btn_menu");
        this.nav = document.getElementById("nav");
        this.items = document.getElementById("menu-items");
    },
    menuSlide: function() {
        this.menu = document.getElementById("btn_menu");

        this.items = document.getElementById("menu-items");
        this.menu.addEventListener("click", function() {
            menuSlide.changeClass();
        });
    },
    menuTop: function(){
        this.bodyHeight = document.body.clientHeight;
        let x = window.pageYOffset;
        if(x > this.bodyHeight){
            this.nav.style.zIndex = "-2";
            this.items.style.top = "0";
        }else{
            this.nav.style.zIndex = "2";
            this.items.style.top = "-55px";
        }
    },

}

/*function changeClass(){
  var classQuan = items.classList;
  if(classQuan.length > 0){
    items.classList.remove("open");
    menu.classList.remove("open");
  }else{
    console.log(menu);
    items.classList.add("open");
    menu.classList.add("open");
  }
}
function menuSlide(){
  let menu = document.getElementById("btn_menu");
  console.log(menu);
  let items = document.getElementById("menu-items");
  menu.addEventListener("click", function(){
    changeClass();
  });
}
*/
function scrollDown() {
    let about = document.getElementById("aboutA");
    let works = document.getElementById("worksA");
    let contact = document.getElementById("contactA");

    let arrEl = [about, works, contact];
    let arrIds = ["about", "works", "contact"];

    for (let i = 0; i < 3; i++) {
        arrEl[i].addEventListener("click", function() {
            smoothScroll(arrIds[i]);
        });

    }
}

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset)
        return self.pageYOffset;

    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;

    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop)
        return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}

function smoothScroll(eID) {

    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY
        ? stopY - startY
        : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20)
        speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY
        ? startY + step
        : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY)
                leapY = stopY;
            timer++;
        }
        return;
    }
    for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY)
            leapY = stopY;
        timer++;
    }
    return false;
}

window.onload = function() {
    document.body.addEventListener("click", function(e) {
        console.log(e.target.id);
        if (e.target.id == "contactA" || e.target.id == "aboutA" || e.target.id == "worksA") {
            menuSlide.changeClass();
        }
    });
    menuSlide.init();
    scrollDown();
}
