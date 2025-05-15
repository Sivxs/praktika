window.addEventListener('load', () => {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!user) {
        alert('Вы не авторизованы. Пожалуйста, войдите.');
        window.location.href = 'reg.html';
        return;
    }

    // Установить приветствие
    document.getElementById('user-info').textContent = `Здравствуйте, ${user.name}`;
    document.getElementById('user-info-email').textContent = `Ваша почта: ${user.email}`;

    // Если пользователь администратор, показываем сообщения и запросы
    if (user.email === 'admin1@gmail.com') {
        // Показываем сообщения из формы обратной связи
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const messagesContainer = document.getElementById('messages-container');
        const messagesList = document.getElementById('messages-list');

        if (messages.length > 0) {
            messages.forEach((msg) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>Имя:</strong> ${msg.name}<br>
                    <strong>Email:</strong> ${msg.email}<br>
                    <strong>Сообщение:</strong> ${msg.message}<br>
                    <small>${msg.date}</small>
                    <hr>
                `;
                messagesList.appendChild(listItem);
            });
        } else {
            messagesList.textContent = 'Сообщений нет.';
        }
        messagesContainer.style.display = 'block';

        // Показываем только невыполненные запросы пользователей
        const requests = JSON.parse(localStorage.getItem('userRequests')) || [];
        const pendingRequests = requests.filter(req => req.status !== 'Выполнено');
        
        if (pendingRequests.length > 0) {
            const requestsSection = document.createElement('div');
            requestsSection.innerHTML = '<h2 class="first_title">Запросы пользователей</h2>';
            const requestsList = document.createElement('ul');
            requestsList.id = 'admin-requests-list';
            
            pendingRequests.forEach((req, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>Запрос от:</strong> ${req.userName} (${req.userEmail})<br>
                    <strong>Тип запроса:</strong> ${req.requestType}<br>
                    <strong>Дата:</strong> ${req.date}<br>
                    <button class="status-btn" data-id="${requests.findIndex(r => 
                        r.userEmail === req.userEmail && 
                        r.requestType === req.requestType && 
                        r.date === req.date)}">Отметить как выполненный</button>
                    <hr>
                `;
                requestsList.appendChild(listItem);
            });
            
            requestsSection.appendChild(requestsList);
            messagesContainer.parentNode.insertBefore(requestsSection, messagesContainer.nextSibling);

            // Обработка кнопок изменения статуса
            document.querySelectorAll('.status-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const requestId = parseInt(this.getAttribute('data-id'));
                    const requests = JSON.parse(localStorage.getItem('userRequests')) || [];
                    
                    if (requests[requestId]) {
                        requests[requestId].status = 'Выполнено';
                        localStorage.setItem('userRequests', JSON.stringify(requests));
                        
                        // Удаляем запрос из списка админа без перезагрузки страницы
                        this.parentElement.remove();
                        
                        // Если больше нет запросов, показываем сообщение
                        if (document.querySelectorAll('#admin-requests-list li').length === 0) {
                            requestsList.innerHTML = '<li>Нет активных запросов</li>';
                        }
                    }
                });
            });
        } else {
            const requestsSection = document.createElement('div');
            requestsSection.innerHTML = `
                <h2 class="first_title">Запросы пользователей</h2>
                <p>Нет активных запросов</p>
            `;
            messagesContainer.parentNode.insertBefore(requestsSection, messagesContainer.nextSibling);
        }
    } 
    // Для обычных пользователей показываем форму запроса
    else {
        const requestContainer = document.getElementById('user-request-container');
        requestContainer.style.display = 'block';

        // Функция для отображения истории запросов
        const displayRequestsHistory = () => {
            const requests = JSON.parse(localStorage.getItem('userRequests')) || [];
            const userRequests = requests.filter(req => req.userEmail === user.email);
            const requestsList = document.getElementById('requests-list');
            const requestsHistory = document.getElementById('requests-history');

            requestsList.innerHTML = ''; // Очищаем список перед обновлением

            if (userRequests.length > 0) {
                requestsHistory.style.display = 'block';
                
                // Сортируем запросы по дате (новые сверху)
                userRequests.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                userRequests.forEach((req, index) => {
                    const listItem = document.createElement('li');
                    listItem.className = 'request-item';
                    if (req.status === 'Выполнено') {
                        listItem.classList.add('completed');
                    }
                    
                    listItem.innerHTML = `
                        <div class="request-header">
                            <span class="request-number">Запрос #${userRequests.length - index}</span>
                            <span class="request-date">${req.date}</span>
                        </div>
                        <div class="request-body">
                            <p><strong>Тип:</strong> ${req.requestType}</p>
                            <p class="status-badge ${req.status === 'Выполнено' ? 'completed' : 'pending'}">
                                ${req.status || 'в обработке'}
                            </p>
                        </div>
                    `;
                    requestsList.appendChild(listItem);
                });
            } else {
                requestsHistory.style.display = 'none';
            }
        };

        // Обработка отправки запроса
        document.getElementById('request-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const requestType = document.getElementById('request-type').value;
            if (!requestType) {
                alert('Пожалуйста, выберите тип запроса');
                return;
            }

            // Сохраняем запрос
            const requests = JSON.parse(localStorage.getItem('userRequests')) || [];
            const newRequest = {
                userName: user.name,
                userEmail: user.email,
                requestType: requestType,
                date: new Date().toLocaleString(),
                status: 'в обработке'
            };
            requests.push(newRequest);
            localStorage.setItem('userRequests', JSON.stringify(requests));

            // Показываем статус отправки
            const statusElement = document.getElementById('request-status');
            statusElement.innerHTML = `
                <p>Ваш запрос на <strong>${requestType}</strong> успешно отправлен!</p>
            `;
            statusElement.style.display = 'block';

            // Обновляем историю запросов
            displayRequestsHistory();

            // Очищаем форму
            document.getElementById('request-form').reset();
            
            // Скрываем статус через 3 секунды
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 3000);
        });

        // Показываем историю запросов при загрузке
        displayRequestsHistory();
    }

    // Обработка выхода из системы
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser');
        });
    }
});