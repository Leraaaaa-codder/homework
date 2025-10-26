document.getElementById("compare").addEventListener("click", () => {
  const text1 = input1.value.toLowerCase().replace(/[.,!?]/g, "").split(" ");
  const text2 = input2.value.toLowerCase().replace(/[.,!?]/g, "").split(" ");
  const com = [...new Set(text1)].filter(word => new Set(text2).has(word));
  result.textContent = com.length ? com.join(", ") : "Спільних слів немає.";
});