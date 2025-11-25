document.addEventListener('DOMContentLoaded', () => {
    // Шукаємо елементи, які ми додали для API
    const fetchButton = document.getElementById('fetch-button');
    
    // Якщо елементів немає (наприклад, ми на сторінці log.html), то просто виходимо
    if (!fetchButton) return; 

    const apiURL = 'https://randomfox.ca/floof/';
    
    const imageUrlElement = document.getElementById('image-url');
    const foxImage = document.getElementById('fox-image');
    const imageStatusElement = document.getElementById('image-status');
    const errorMessageElement = document.getElementById('error-message');

    /**
     * Асинхронна функція для отримання даних лисиці.
     */
    async function fetchRandomFox() {
        // Статус "Завантаження..."
        foxImage.style.display = 'none';
        errorMessageElement.style.display = 'none';
        imageStatusElement.textContent = 'Завантаження...';
        imageUrlElement.textContent = '...';
        fetchButton.disabled = true;

        try {
            //await+fetch
            const response = await fetch(apiURL);

            // Якщо відповідь не ОК (наприклад, 404), кидаємо помилку
            if (!response.ok) {
                throw new Error(`Помилка HTTP: ${response.status}`);
            }

            // Використовуємо await, щоб чекати обробки JSON
            const data = await response.json();
            
            const imageUrl = data.image;

            // Оновлюємо 
            imageStatusElement.textContent = 'Готово!';
            imageUrlElement.textContent = imageUrl;
            foxImage.src = imageUrl;
            foxImage.style.display = 'block'; //  зображення

        } catch (error) {
            // try/catch для обробки помилок
            console.error("Помилка API:", error);
            
            imageStatusElement.textContent = 'Помилка завантаження!';
            imageUrlElement.textContent = 'Не вдалося отримати URL.';
            errorMessageElement.textContent = `Сталася помилка: ${error.message}`;
            errorMessageElement.style.display = 'block';
            
        } finally {
            // Виконується завжди
            fetchButton.disabled = false; // Вмикаємо кнопку
        }
    }

    // Прив'язати функцію до кнопки
    fetchButton.addEventListener('click', fetchRandomFox);
    
    // Викликаємо функцію
    fetchRandomFox();
});