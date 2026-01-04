async  function getChat() {
  try {
    // 1. Надсилаємо запит і чекаємо на відповідь (пакунок)
    const response = await fetch("/getchat", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    });

    // 2. ПРИЙМАЄМО ТА РОЗПАКОВУЄМО ОБ'ЄКТ
    const data = await response.json();

    for (let i = 0 ; i < data.lenght; i++){
      let m = data.shift()
      document.getElementById("chat").append(`<p>${m}</p>`)
    }  
  } catch (error) {
    console.error("Помилка:", error);
  }
}
let data = await response.json
setInterval(getChat(),30)