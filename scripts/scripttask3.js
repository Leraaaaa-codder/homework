document.addEventListener('DOMContentLoaded', () => {
    const loginInput = document.getElementById('login');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const form = document.getElementById('loginForm');

    //Регулярні вирази
    const loginRegExp = /^[a-zA-Z0-9_-]{3,20}$/; 
    const emailRegExp = /.+@.+\..+/; 
    const phoneRegExp = /\d{10}/; 
    
    

    function checkLogin() {
        const value = loginInput.value.trim();
        const feedback = document.getElementById('login-feedback');
        
        // search і чи вона повна match
        if (value.search(loginRegExp) !== -1 && value.match(loginRegExp) && value.match(loginRegExp)[0].length === value.length) {
            loginInput.classList.remove('is-invalid');
            loginInput.classList.add('is-valid');
            feedback.textContent = 'Логін ОК! Можна використовувати.';
            feedback.className = 'validation-message'; 
            return true;
        } else {
            // Якщо неправильно були введені дані - повідомлення про помилку
            loginInput.classList.remove('is-valid');
            loginInput.classList.add('is-invalid');
            feedback.textContent = 'ПОМИЛКА! Логін має бути 3-20 символів (латинські літери, цифри).';
            feedback.className = 'validation-message error-message'; 
            return false;
        }
    }
    
    function checkEmail() {
        const value = emailInput.value.trim();
        const feedback = document.getElementById('email-feedback');
        
        // Користуємось .match() та .search() для перевірки
        if (value.match(emailRegExp) && value.search(emailRegExp) === 0) {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
            feedback.textContent = 'Email ОК! Дякую.';
            feedback.className = 'validation-message'; 
            return true;
        } else {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
            feedback.textContent = 'ПОМИЛКА! Потрібен формат: ім\'я@домен.зона';
            feedback.className = 'validation-message error-message';
            return false;
        }
    }
    
    function checkPhone() {
        const value = phoneInput.value.trim();
        const feedback = document.getElementById('phone-feedback');
        
        // шукаємо 10 цифр у полі за допомогою match()
        if (value.match(phoneRegExp) && value.match(phoneRegExp)[0].length === 10) {
            phoneInput.classList.remove('is-invalid');
            phoneInput.classList.add('is-valid');
            feedback.textContent = 'Телефон ОК! Знайдено 10 цифр.';
            feedback.className = 'validation-message'; 
            return true;
        } else {
            phoneInput.classList.remove('is-valid');
            phoneInput.classList.add('is-invalid');
            feedback.textContent = 'ПОМИЛКА! Введіть 10 цифр (наприклад, 0991234567).';
            feedback.className = 'validation-message error-message';
            return false;
        }
    }

    // Прив'язка
    loginInput.addEventListener('blur', checkLogin);
    emailInput.addEventListener('blur', checkEmail);
    phoneInput.addEventListener('blur', checkPhone);
    
    
    
    // Очищення логіну
   
    
    const forbiddenCharsRegExp = /[^a-zA-Z0-9_-]/g;

    loginInput.addEventListener('input', () => {
        let currentValue = loginInput.value;
        const feedback = document.getElementById('login-feedback');
        
        // replace()
        const cleanedValue = currentValue.replace(forbiddenCharsRegExp, '');
        
        // Якщо символи були видалені, оновлюємо поле
        if (currentValue !== cleanedValue) {
            loginInput.value = cleanedValue;
            loginInput.classList.remove('is-valid'); 
            loginInput.classList.add('is-invalid');  
            feedback.textContent = 'УВАГА: Недозволені символи видалено автоматично!';
            feedback.className = 'validation-message warning-message'; // warning-message - це просто клас
        } else {
 
            feedback.style.color = ''; 
            
            //Переввірка
            checkLogin(); 
        }
    });


    // Запобігання відправки
    form.addEventListener('submit', (event) => {
        const isLoginValid = checkLogin();
        const isEmailValid = checkEmail();
        const isPhoneValid = checkPhone();

        if (!isLoginValid || !isEmailValid || !isPhoneValid) {
            event.preventDefault(); 
            alert('Спочатку виправ помилки в полях');
        } else {
            alert('Успіх! Дані правильні');
        }
    });
});