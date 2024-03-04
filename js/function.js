function createNewCrad(country) {
    return `
    <div class="cont">
        <button id="back" class="back"><i class="fa-solid fa-arrow-left"></i> Back</button>
            <div class="data">
                <div class="img">
                    <img src="${country.flags.png}" alt="">
                </div>
                <div class="data-title">
                    <div class="left">
                        <h3>${country.name.common}</h3>
                        <p>Native Name: <span>${country.name.nativeName}</span></p>
                        <p>Population: <span>${country.population}</span></p>
                        <p>Region: <span>${country.region}</span></p>
                        <p>Sub Region: <span>${country.subregion}</span></p>
                        <p>Capital: <span>${country.capital}</span></p>
                        <div class="border">
                            <h5>Border Countries: </h5>
                            <button>${country.borders.common}</button>
                        </div>
                    </div>
                    <div class="right">
                        <p>Top level domain</p>
                        <p>Currencies: ${country.currencies}</p>
                        <p>Language: ${country.languages}</p>
                    </div>
                </div>
            </div>
    </div>
    `
}

export {createNewCrad}