function init() {
    let map = new ymaps.Map('map', {
        center: [56.42757891083619, 38.725055441856114],
        zoom: 15
    });

    map.controls.remove('geolocationControl'); 
    map.controls.remove('searchControl'); 
    map.controls.remove('trafficControl'); 
    map.controls.remove('typeSelector'); 
    map.controls.remove('fullscreenControl'); 
    map.controls.remove('zoomControl'); 
    map.controls.remove('rulerControl'); 
}


ymaps.ready(init);

// Обработка формы обратной связи
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ name, email, message, date: new Date().toLocaleString() });
        localStorage.setItem('messages', JSON.stringify(messages));

        alert('Ваше сообщение отправлено!');
        document.getElementById('contact-form').reset();
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});

// Общий код для бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (burger && mobileMenu) {
        burger.addEventListener('click', function() {
            this.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
        
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }
    
    // Для личного кабинета - обработка выхода
    const logoutBtn = document.getElementById('logout');
    const logoutMobileBtn = document.getElementById('logout-mobile');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser');
        });
    }
    
    if (logoutMobileBtn) {
        logoutMobileBtn.addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser');
        });
    }
});


// // Обработка формы обратной связи
// document.getElementById('contact-form').addEventListener('submit', function (e) {
// e.preventDefault(); // Предотвращаем перезагрузку страницы

// const name = document.getElementById('contact-name').value;
// const email = document.getElementById('contact-email').value;
// const phone = document.getElementById('contact-phone').value;
// const message = document.getElementById('contact-message').value;

// const feedback = { name, email, phone, message };
// let feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
// feedbackData.push(feedback);

// localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
// alert('Ваше сообщение отправлено!');

// // Очищаем форму
// document.getElementById('contact-form').reset();
// });