

// function showMore() {
//     // Найти первый скрытый контейнер-строку
//     const hiddenRows = document.querySelectorAll('.row.hidden');
//     if (hiddenRows.length > 0) {
//         hiddenRows[0].classList.remove('hidden');
//     }
//     // Если больше скрытых строк нет, скрыть кнопку
//     if (document.querySelectorAll('.row.hidden').length === 0) {
//         document.querySelector('.show-more-btn').style.display = 'none';
//     }
// }

function showMore() {
    // Найти первый скрытый контейнер-строку
    const hiddenRows = document.querySelectorAll('.row.hidden');
    if (hiddenRows.length > 0) {
        const row = hiddenRows[0];
        row.classList.remove('hidden'); // Удаляем класс hidden
        setTimeout(() => {
            row.classList.add('visible'); // Плавно отображаем строку
        }, 10); // Задержка нужна, чтобы CSS-транзиции сработали
    }
    // Если больше скрытых строк нет, скрыть кнопку
    if (document.querySelectorAll('.row.hidden').length === 0) {
        document.querySelector('.show-more-btn').style.display = 'none';
    }
}

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