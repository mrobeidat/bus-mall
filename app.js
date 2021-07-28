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
    // shownArr.push(this.shown);

}


Product.all = [];

// local storage 
function updateStorage() {


    let stringifyProducts = JSON.stringify(Product.all);
    // console.log(Product.all);

    localStorage.setItem('products', stringifyProducts);

    // localStorage.setItem('chart', votesArr);
    // localStorage.setItem('shown', stringifyProducts);

}


function getItem() {

    let data = localStorage.getItem('products');

    let parsedData = JSON.parse(data);

    if (parsedData !== null) {
        // Product.all = JSON.parse(data);

        // showChart();
        Product.all = parsedData;

    }
}


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

    preventRepetition = [leftImageIndex, rightImageIndex, middleImageIndex];
}
renderThreeImages();


// leftImage.addEventListener('click', clicker)
// middleImage.addEventListener('click', clicker)
// rightImage.addEventListener('click', clicker)

container.addEventListener('click', clicker)



function clicker(event) {




    // console.log(leftImageIndex)
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


        }


        for (let i = 0; i < Product.all.length; i++) {
            // console.log(Product.all[i].votes);

            votesArr.push(Product.all[i].votes);

            shownArr.push(Product.all[i].shown);
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

        updateStorage();
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



function showChart() {


    const data = {
        labels: namesArr,
        datasets: [{
            label: 'Votes',
            data: votesArr,

            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [

                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },
        {
            label: 'Shown',
            data: shownArr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }

        ]
    };

    const config = {
        scaleFontColor: "black",
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };


    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

getItem();
