const deliveryMessages = {
  ru: `
    <b>Бесплатная доставка 🚚</b>
    <p>Выполните 3 простых шага:</p>
    <ol>
      <li>Опубликуйте сторис или пост в Threads 📱</li>
      <li>Упомяните нас: <b>@raushan.flowers.kz</b> 🌸</li>
      <li>Прикрепите скрин, как собирали букет на сайте 📸</li>
    </ol>
    <p>После публикации отправьте нам скрин в WhatsApp 💬</p>
  `,
  kk: `
    <b>Тегін жеткізу 🚚</b>
    <p>3 қарапайым қадамды орындаңыз:</p>
    <ol>
      <li>Threads-та сторис немесе пост жариялаңыз 📱</li>
      <li>Бізді атап өтіңіз: <b>@raushan.flowers.kz</b> 🌸</li>
      <li>Сайтта гүл шоғын қалай жинағаныңыздың скринін тіркеңіз 📸</li>
    </ol>
    <p>Жариялағаннан кейін WhatsApp арқылы скриншотты жіберіңіз 💬</p>
  `
};

function showDeliveryPopup() {
  const popup = document.getElementById('delivery-popup');
  const deliveryText = document.getElementById('delivery-text');
  // Use your global currentLang variable or default to Russian
  deliveryText.innerHTML = deliveryMessages[currentLang] || deliveryMessages.ru;
  popup.style.display = 'block';
}

function closeDeliveryPopup() {
  document.getElementById('delivery-popup').style.display = 'none';
}
