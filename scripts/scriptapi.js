
const fetchButton = document.getElementById('fetch-button');

if (fetchButton) {
    const apiURL = 'https://randomfox.ca/floof/';
    const imageUrlElement = document.getElementById('image-url');
    const foxImage = document.getElementById('fox-image');
    const imageStatusElement = document.getElementById('image-status');
    const errorMessageElement = document.getElementById('error-message');

    async function fetchRandomFox() {
        foxImage.style.display = 'none';
        errorMessageElement.style.display = 'none';
        imageStatusElement.textContent = 'Завантаження...';
        imageUrlElement.textContent = '...';
        fetchButton.disabled = true;

        try {
            const response = await fetch(apiURL);
            if (!response.ok) throw new Error(`Помилка HTTP: ${response.status}`);

            const data = await response.json();
            const imageUrl = data.image;

            imageStatusElement.textContent = 'Готово!';
            imageUrlElement.textContent = imageUrl;
            foxImage.src = imageUrl;
            foxImage.style.display = 'block';
        } catch (error) {
            console.error("Помилка API:", error);
            imageStatusElement.textContent = 'Помилка завантаження!';
            imageUrlElement.textContent = 'Не вдалося отримати URL.';
            errorMessageElement.textContent = `Сталася помилка: ${error.message}`;
            errorMessageElement.style.display = 'block';
        } finally {
            fetchButton.disabled = false;
        }
    }

    fetchButton.addEventListener('click', fetchRandomFox);
    fetchRandomFox(); // одразу показує лисицю при завантаженні
}

// ---------------- МЕМИ ----------------
const memeButton = document.getElementById('meme-button');

if (memeButton) {
    const memeStatus = document.getElementById('meme-status');
    const memeImage = document.getElementById('meme-image');
    const memeName = document.getElementById('meme-name');
    const memeError = document.getElementById('meme-error');

    async function fetchRandomMeme() {
        memeImage.style.display = 'none';
        memeError.style.display = 'none';
        memeStatus.textContent = 'Завантаження...';
        memeName.textContent = '';
        memeButton.disabled = true;

        try {
            const response = await fetch("https://api.imgflip.com/get_memes");
            if (!response.ok) throw new Error(`Помилка HTTP: ${response.status}`);

            const data = await response.json();
            if (data.success) {
                const memes = data.data.memes;
                const randomMeme = memes[Math.floor(Math.random() * memes.length)];

                memeImage.src = randomMeme.url;
                memeImage.style.display = 'block';
                memeName.textContent = randomMeme.name;
                memeStatus.textContent = 'Готово!';
            } else {
                memeStatus.textContent = 'Помилка!';
            }
        } catch (error) {
            console.error("Помилка API:", error);
            memeStatus.textContent = 'Помилка завантаження!';
            memeError.textContent = `Сталася помилка: ${error.message}`;
            memeError.style.display = 'block';
        } finally {
            memeButton.disabled = false;
        }
    }

    memeButton.addEventListener('click', fetchRandomMeme);
}