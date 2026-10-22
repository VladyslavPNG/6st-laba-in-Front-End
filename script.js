const loadBtn = document.getElementById('loadBtn');
const statusDiv = document.getElementById('status');
const usersContainer = document.getElementById('usersContainer');

const API_URL = 'https://randomuser.me/api/';

function fetchUsers() {
    usersContainer.innerHTML = '';
    statusDiv.innerHTML = 'Завантаження...';

    fetch(API_URL + '?results=5')
        .then(response => {
            if (!response.ok) {
                throw new Error('Помилка мережі');
            }
            return response.json(); 
        })
        .then(data => {
            statusDiv.innerHTML = 'success!'; 
            renderUsers(data.results);
        })
        .catch(error => {
            console.error('Error:', error);
            statusDiv.innerHTML = 'Помилка при завантаженні даних.';
        });
}

function renderUsers(users) {
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';

        const picture = user.picture.large; 
        const cell = user.cell; 
        const city = user.location.city; 
        const email = user.email; 
        const lat = user.location.coordinates.latitude; 
        const lon = user.location.coordinates.longitude;

        card.innerHTML = `
            <img src="${picture}" alt="Фото користувача">
            <div class="user-info">
                <p><strong>City:</strong> ${city}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Cell:</strong> ${cell}</p>
                <p><strong>Coords:</strong> Lat: ${lat}, Lon: ${lon}</p>
            </div>
        `;

        usersContainer.appendChild(card);
    });
}

loadBtn.addEventListener('click', fetchUsers);