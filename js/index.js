import { createNewCrad } from "./function.js";
const region = document.getElementById('select__region');
const wrapper = document.getElementById('wrapper')
const BASE_URL = "https://frontend-mentor-apis-6efy.onrender.com";


// // DArk MOde
const darkMode = document.querySelector('#btn');
const body = document.body;
const navFixed = document.getElementById('nav-fixed');
const title = document.getElementById('title');
const search = document.getElementById('search__input');
const container = document.getElementById('container');
const containerr = document.querySelector('.container');
const faSolid = document.querySelector('.fa-solid');

let isDarkMode = false;

darkMode.addEventListener('click', function (e) {
    e.preventDefault();
    if (!isDarkMode) {
        body.style.backgroundColor = 'rgba(43, 56, 68, 1)';
        navFixed.style.backgroundColor = 'rgba(43, 56, 68, 1)';
        title.style.color = 'white';
        search.style.color = 'white';
        container.style.backgroundColor = 'rgba(32, 44, 54, 1)';
        containerr.style.backgroundColor = 'rgba(32, 44, 54, 1)';
        faSolid.style.color = 'white';
        wrapper.style.backgroundColor = 'rgba(32, 44, 54, 1)';
        isDarkMode = true;
    } else {
        body.style.backgroundColor = '#F2F2F2';
        navFixed.style.backgroundColor = 'white';
        title.style.color = 'black';
        search.style.color = 'black';
        container.style.backgroundColor = 'white';
        containerr.style.backgroundColor = 'white';
        faSolid.style.color = 'black';
        wrapper.style.backgroundColor = 'white';
        isDarkMode = false;
    }
});

function createCard(country) {
    return `
    <div slug="${country.name.slug}" id="card" class="card" style="border: none; border-radius: 5px; width: 264px; height: 336px; ">
    <img style="width: 264px; margin-bottom: 20px; height: 164px; border-radius: 2px;" src="${country.flags.png}" alt="">            
    <h3>${country.name.common}</h3>
    <p class="p"><span>Population:</span> ${country.population}</p>
    <p> <span>Region:</span> ${country.region}</p>
    <p><span>Cpital:</span> ${country.capital}</p>
    </div> `;
}

region.addEventListener('change', function () {
    if (this.value) {
        fetch(`${BASE_URL}/countries?region=${this.value}`)
            .then(res => res.json())
            .then(data => {
                if (data.data.length) {
                    wrapper.innerHTML = ''
                    data.data.forEach(el => {
                        let card = createCard(el);
                        wrapper.innerHTML += card;
                        const cardd = document.querySelectorAll('#card')
                        cardd.forEach(res => {
                            res.addEventListener('click', function (e) {
                                e.preventDefault();
                                let slug = this.getAttribute('slug')
                                fetch(`${BASE_URL}/countries/${slug}`, {
                                    method: "GET"
                                })
                                    .then(res => {
                                        if (res.ok) {
                                            return res.json()
                                        }
                                    })
                                    .then(data => {
                                        let oneCount = createNewCrad(data)
                                        wrapper.innerHTML = oneCount;
                                        const back = document.getElementById('back')
                                        back && back.addEventListener('click', function () {
                                            window.location.reload()
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            })
                        })
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    } else {

    }
})

document.addEventListener('DOMContentLoaded', function () {
    fetch(`${BASE_URL}/countries`, {
        method: "GET"
    })
        .then(res => {
            return res.json()
        })
        .then(result => {
            result.data.forEach(element => {
                let card = createCard(element)
                wrapper.innerHTML += card
            });
            let cardd = document.querySelectorAll('#card')
            cardd.forEach(data => {
                data.addEventListener('click', function (e) {
                    e.preventDefault();
                    let slug = this.getAttribute('slug');
                    fetch(`${BASE_URL}/countries/${slug}`, {
                        method: "GET"
                    })
                        .then(res => {
                            return res.json()
                        })
                        .then(data => {
                            console.log(data);
                            let OneCard = createNewCrad(data)
                            wrapper.innerHTML = OneCard
                            const back = document.getElementById('back')
                            back.addEventListener('click', function (e) {
                                e.preventDefault();
                                window.location.reload()
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
            })
        })
})

search.addEventListener("input", updateValue);
function updateValue(e) {

    fetch(`${BASE_URL}/countries?search=${e.target.value}`, {
        method: "GET"
    })
        .then(res => res.json())
        .then(result => {
            wrapper.innerHTML = '';

            result.data.forEach(data => {
                let card = createCard(data);
                wrapper.innerHTML += card;
                const cardd = document.querySelectorAll('#card')
                cardd.forEach(res => {
                    res.addEventListener('click', function (e) {
                        e.preventDefault();
                        let slug = this.getAttribute('slug')
                        fetch(`${BASE_URL}/countries/${slug}`, {
                            method: "GET"
                        })
                            .then(res => {
                                if (res.ok) {
                                    return res.json()
                                }
                            })
                            .then(data => {
                                let oneCount = createNewCrad(data)
                                wrapper.innerHTML = oneCount;
                                const back = document.getElementById('back')
                                back && back.addEventListener('click', function () {
                                    window.location.reload()
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                })
            });


        })
        .catch(err => {
            console.log(err);
        });
};
