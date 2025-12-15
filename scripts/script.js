

const paragraphs = document.querySelectorAll("p");
console.log("Кількість параграфів:", paragraphs.length);

const h2s = document.querySelectorAll("h2");
console.log("Кількість заголовків h2:", h2s.length);


const bodyBg = getComputedStyle(document.body).backgroundColor;
console.log("Фон body:", bodyBg);


const h1 = document.querySelector("h1");
const h1FontSize = h1 ? getComputedStyle(h1).fontSize : "немає h1";
console.log("Розмір шрифту h1:", h1FontSize);

document.querySelectorAll("*").forEach(el => {
  let originalColor = getComputedStyle(el).backgroundColor;

  el.addEventListener("mouseenter", () => {
    el.style.backgroundColor = "red";
  });

  el.addEventListener("mouseleave", () => {
    el.style.backgroundColor = originalColor;
  });
});

setTimeout(() => {
  
  
  const imagesUrl = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rosetta_Stone.JPG/220px-Rosetta_Stone.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Great_Wall_2010.JPG/220px-Great_Wall_2010.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pyramids_of_Giza.JPG/220px-Pyramids_of_Giza.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/220px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg"
  ];

 
  const boxes = document.querySelectorAll(".content-menu .contents .box");
  const fragment = document.createDocumentFragment();

  
  imagesUrl.forEach((url, index) => {
    
    
    setTimeout(() => {
      
    
      if (boxes[index]) {
        
       
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Історичне зображення";
        
        
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.borderRadius = "10px";

    

        boxes[index].appendChild(img);
      }
    }, index * 1000); 
  });
}, 5000);