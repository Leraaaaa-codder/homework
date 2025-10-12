// Рахуємо кількість параграфів <p>
const paragraphs = document.querySelectorAll("p");
console.log("Кількість параграфів:", paragraphs.length);

// Рахуємо кількість заголовків <h2>
const h2s = document.querySelectorAll("h2");
console.log("Кількість заголовків h2:", h2s.length);

// Виводимо background-color <body>
const bodyBg = getComputedStyle(document.body).backgroundColor;
console.log("Фон body:", bodyBg);

// Виводимо font-size <h1>
const h1 = document.querySelector("h1");
const h1FontSize = h1 ? getComputedStyle(h1).fontSize : "немає h1";
console.log("Розмір шрифту h1:", h1FontSize);
// Зміна фону елементів при наведенні
document.querySelectorAll("*").forEach(el => {
  let originalColor = getComputedStyle(el).backgroundColor;

  el.addEventListener("mouseenter", () => {
    el.style.backgroundColor = "red";
  });

  el.addEventListener("mouseleave", () => {
    el.style.backgroundColor = originalColor;
  });
});