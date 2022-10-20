//global variables
const sec = document.getElementsByTagName('section');
const list = document.getElementById('navbar__list');


//creating navigation
const fragment = document.createDocumentFragment();
for (let i = 0; i < sec.length; i++) {
    const element = document.createElement('li');
    element.textContent = `section${i + 1}`;
    
    fragment.appendChild(element);
}

list.appendChild(fragment);


//making bar icon
const nav = document.querySelector('.navbar__menu');
const bar = document.createElement('div');

bar.innerHTML = '<i class="fa-solid fa-bars"></i>';
bar.classList = 'bar';
nav.appendChild(bar);

bar.addEventListener('click', function () {
    list.classList.toggle('active');
    bar.classList.toggle('active');
});


//up button
const up = document.createElement('div');
const main = document.querySelector('main');
up.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
up.classList = 'up';
setInterval(() => {
    if (scrollY > screen.height) {
        main.appendChild(up);
    } else {
        if (main.contains(up)) {
            main.removeChild(up);
        }
    }   
}, 500);

up.addEventListener('click', function () {
    scroll({
        top: 0,
        behavior: 'smooth'
    });
});


//scrolling
list.firstChild.classList = 'active';
for (let i = 0; i < list.children.length; i++) {
    list.children[i].addEventListener('click', function () {
        for (let n = 0; n < list.children.length; n++) {
            list.children[n].classList.remove('active');
        }
        list.children[i].classList = 'active';
        window.scroll({
            top: sec[i].offsetTop,
            behavior: 'smooth'
        })
    });
}

window.addEventListener('scroll', function () {
    let previous = 0;
    for (let i = 0; i < sec.length; i++) {
        if (scrollY > previous && scrollY <= sec[i].offsetTop) {
            for (let n = 0; n < list.children.length; n++) {
                list.children[n].classList.remove('active');
            }
            list.children[i].classList = 'active';
            previous = sec[i].offsetTop;
        }
    }
});
