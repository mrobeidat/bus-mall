'use strict';

// let divElement = document.getElementById('container');


let container = document.getElementById('container');
let leftImage = document.getElementById('left-img');
let middleImage = document.getElementById('middle-img');
let rightImage = document.getElementById('right-img');

let maxAttempts = 25;
let userAttempts = 0;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;


let namesArr = [];

let votesArr = [];

let shownArr = [];

let preventRepetition = [];


function Product(name, src) {

    this.name = name;
    this.source = src;
    this.votes = 0;
    this.shown = 0;

    Product.all.push(this);

    namesArr.push(this.name);
}


Product.all = [];

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

function getRandomIndex() {

    return Math.floor(Math.random() * Product.all.length);
}

function renderThreeImages() {

    leftImageIndex = getRandomIndex();
    middleImageIndex = getRandomIndex();
    rightImageIndex = getRandomIndex();

    while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex || preventRepetition.includes(leftImageIndex) || preventRepetition.includes(rightImageIndex) || preventRepetition.includes(middleImageIndex)) {

        rightImageIndex = getRandomIndex();
        leftImageIndex = getRandomIndex();
        middleImageIndex = getRandomIndex();
        // preventRepetition = getRandomIndex();
    }
    leftImage.src = Product.all[leftImageIndex].source;
    Product.all[leftImageIndex].shown++;

    middleImage.src = Product.all[middleImageIndex].source;
    Product.all[middleImageIndex].shown++;

    rightImage.src = Product.all[rightImageIndex].source;
    Product.all[rightImageIndex].shown++;


preventRepetition=[leftImageIndex,rightImageIndex,middleImageIndex];
}
renderThreeImages();


// leftImage.addEventListener('click', clicker)
// middleImage.addEventListener('click', clicker)
// rightImage.addEventListener('click', clicker)


container.addEventListener('click', clicker)



function clicker(event) {

    console.log(leftImageIndex)
    // console.log(userAttempts);
    if (userAttempts < maxAttempts) {
        if (event.target.id === 'left-img') {

            Product.all[leftImageIndex].votes++;

        }

        else if (event.target.id === 'right-img') {

            Product.all[rightImageIndex].votes++;

        }

        else if (event.target.id === 'middle-img') {

            Product.all[middleImageIndex].votes++;
        }
        else {

            alert('please click on one of the images');
            userAttempts--;
        }

        renderThreeImages();

    }
    else {

       let buttonEl=document.getElementById('btn');

       buttonEl.hidden=false;

       buttonEl.addEventListener('click', showing);

       function showing (event) {

         let list = document.getElementById('results-list');
        let buttonEl = document.getElementById('btn');

        buttonEl.hidden = false;

        buttonEl.addEventListener('click', showing);

        function showing(event) {

            showChart();

            let list = document.getElementById('results-list');

            for (let i = 0; i < Product.all.length; i++) {

                let listItems = document.createElement('li');

                list.appendChild(listItems);

                listItems.textContent = `${Product.all[i].name} has ${Product.all[i].votes} Votes and was seen ${Product.all[i].shown} times`

            }
            buttonEl.removeEventListener('click', showing);

            listItems.textContent = `${Product.all[i].name} has ${Product.all[i].votes} Votes and was seen ${Product.all[i].shown} times`


        }
        buttonEl.removeEventListener('click', showing);

           
       }
        // let list = document.getElementById('results-list');

        // for (let i = 0; i < Product.all.length; i++) {

        //     let listItems = document.createElement('li');

        //     list.appendChild(listItems);

        //     listItems.textContent = `${Product.all[i].name} has ${Product.all[i].votes} Votes`

        // }

        // leftImage.removeEventListener('click', clicker)
        // middleImage.removeEventListener('click', clicker)
        // rightImage.removeEventListener('click', clicker)
        container.removeEventListener('click', clicker);


        for (let i = 0; i < Product.all.length; i++) {
            console.log(Product.all[i].votes);
            votesArr.push(Product.all[i].votes);
            shownArr.push(Product.all[i].votes);

        }
        // let list = document.getElementById('results-list');

        // for (let i = 0; i < Product.all.length; i++) {

        //     let listItems = document.createElement('li');

        //     list.appendChild(listItems);

        //     listItems.textContent = `${Product.all[i].name} has ${Product.all[i].votes} Votes`

        // }

        // leftImage.removeEventListener('click', clicker)
        // middleImage.removeEventListener('click', clicker)
        // rightImage.removeEventListener('click', clicker)
        container.removeEventListener('click', clicker);

        // showChart();
    }
    userAttempts++;

}


//  let list = document.getElementById('results-list');

//         for (let i = 0; i < Product.all.length; i++) {

//             let listItems = document.createElement('li');

//             list.appendChild(listItems);

//             listItems.textContent = `${Product.all[i].name} has ${Product.all[i].votes} Votes`

//         }








