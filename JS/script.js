//// key: 668f13566a4929799e779d22ccea2f8d
let closeIcon = document.getElementById('close')
let openIcon = document.getElementById('open')
let menuSlider = document.getElementById('MenuSlider')
let MainSideBar = document.getElementById('sideBar')

openIcon.addEventListener('click', function () {
    menuSlider.style.display = 'block'
    MainSideBar.style.zIndex = '99'
    openIcon.style.display = 'none'
    closeIcon.style.display = 'block'
})
closeIcon.addEventListener('click', function () {
    menuSlider.style.display = 'none'
    MainSideBar.style.zIndex = '0'
    closeIcon.style.display = 'none'
    openIcon.style.display = 'block'
})


// ---------------------------------------------------


let nowPlay = document.getElementById('nowPlay')
let popular = document.getElementById('popular')
let topRated = document.getElementById('topRated')
let trending = document.getElementById('trending')
let upcoming = document.getElementById('upcoming')

nowPlay.addEventListener('click', function () {
    startApp('now_playing')
})
popular.addEventListener('click', function () {
    startApp('popular')
})
topRated.addEventListener('click', function () {
    startApp('top_rated')
})
trending.addEventListener('click', function () {
    getMovieDataTrending()
})
upcoming.addEventListener('click', function () {
    startApp('upcoming')
})

function displayNowPlaying(data) {
    let cartona = ''
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
    for (i = 0; i < data.results.length; i++) {
        const posterUrl = baseImageUrl + data.results[i].poster_path;
        cartona += `
                <div class="col-md-4">
                <div class="box position-relative">
                    <div class="imgBox">
                        <img src="${posterUrl}" alt="" class="w-100 img rounded-2">
                    </div>
                    <div class="contentBox  w-100 h-100 position-absolute p-2">
                        <h2>${data.results[i].title}</h2>
                        <p>${data.results[i].overview}</p>
                        <p>Relase Date: ${data.results[i].release_date}</p>
                        <div class='rate d-grid border-1 rounded-circle'>
                        <h6 class='m-auto'>${data.results[i].vote_average}</h6></div>
                    </div>

                </div>
            </div>  
    
    `
    }
    document.getElementById('Demo').innerHTML = cartona
}


async function getMovieData(movieStatus) {
    let movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieStatus}?api_key=668f13566a4929799e779d22ccea2f8d`);
    let movieData = await movieResponse.json()
    return movieData
}

//   ---------trending data url is deferrent ---------------
async function getMovieDataTrending() {
    let movieResponse = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let movieData = await movieResponse.json()
    displayNowPlaying(movieData)
}


startApp()
async function startApp(movieStatus = 'now_playing') {
    let data = await getMovieData(movieStatus)///getting api data and put it in an argument to pass it to other functions
    if (!data.error) {
        displayNowPlaying(data)
    }
}

//  -------search function --------- 

let searchInput = document.getElementById('search')

searchInput.addEventListener('input', function () {
    searcMovies(searchInput.value)
})



async function searcMovies(searchInput) {
   let data = await getMovieData(movieStatus='now_playing')
    let cartona = ''
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
    for (i = 0; i < data.results.length; i++) {
        if (data.results[i].title.toLowerCase().includes(searchInput.toLowerCase())) {
            const posterUrl = baseImageUrl + data.results[i].poster_path;
            cartona += `
                <div class="col-md-4">
                <div class="box position-relative">
                    <div class="imgBox">
                        <img src="${posterUrl}" alt="" class="w-100 img rounded-2">
                    </div>
                    <div class="contentBox w-100 h-100 position-absolute p-2">
                        <h1>${data.results[i].title}</h1>
                        <p>${data.results[i].overview}</p>
                        <p>Relase Date: ${data.results[i].release_date}</p>
                        <div class='rate d-grid border-1 rounded-circle'>
                        <h6 class='m-auto'>${data.results[i].vote_average}</h6>
                    </div>

                </div>
            </div>  
    
    `
        }
        document.getElementById('Demo').innerHTML = cartona
    }

}


// -----------Regix form ------------------------------

const nameRegex = /^[a-zA-Z\s'-]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;
const ageRegex = /^(?:1[7-9][0-9]|[2-9][0-9])$/;
const passwordRegex = /^.{5,}$/;



function validateForm() {
    let valid = true;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    // Name Validation
    const nameError = document.getElementById('nameError');
    if (!nameRegex.test(name)) {
        nameError.style.display = 'block';
        valid = false;
    } else {
        nameError.style.display = 'none';
    }

    // Email Validation
    const emailError = document.getElementById('emailError');
    if (!emailRegex.test(email)) {
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Phone Validation
    const phoneError = document.getElementById('phoneError');
    if (!phoneRegex.test(phone)) {
        phoneError.style.display = 'block';
        valid = false;
    } else {
        phoneError.style.display = 'none';
    }

    // Age Validation
    const ageError = document.getElementById('ageError');
    if (!ageRegex.test(age)) {
        ageError.style.display = 'block';
        valid = false;
    } else {
        ageError.style.display = 'none';
    }

    // Password Validation
    const passwordError = document.getElementById('passwordError');
    if (!passwordRegex.test(password)) {
        passwordError.style.display = 'block';
        valid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // Password Match Validation
    const password2Error = document.getElementById('password2Error');
    if (password !== password2) {
        password2Error.style.display = 'block';
        valid = false;
    } else {
        password2Error.style.display = 'none';
    }

    if (valid) {
        alert("Form submitted successfully!");
    }
}
