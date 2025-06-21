let currentLang = "ru";

const translations = {
  ru: {
    chooseFlowers: "Выберите цветы",
    chooseWrap: "Выберите упаковку",
    order: "Заказать через WhatsApp",
    delivery: "Хотите бесплатную доставку?",
    total: "Итого",
    wrap: "Упаковка",
    greeting: "Здравствуйте! Я хочу заказать букет:\n",
    alertEmpty: "Пожалуйста, выберите хотя бы один цветок.",
    bouquetPreview: "Предпросмотр букета",
    resetBouquet: "Собрать заново",
    letterLabel: "💌 Добавьте письмо получателю:",
    letterPlaceholder: "Напишите ваше послание здесь...",
    letterInWhatsapp: "Сообщение для получателя",
    bouquetRecipe: "Cостав букета:"
  },
  kk: {
    chooseFlowers: "Гүлдерді таңдаңыз",
    chooseWrap: "Қаптаманы таңдаңыз",
    order: "WhatsApp арқылы тапсырыс беру",
    delivery: "Тегін жеткізуді қалайсыз ба?",
    total: "Барлығы",
    wrap: "Қаптама",
    greeting: "Сәлеметсіз бе! Мен гүл шоғын тапсырыс бергім келеді:\n",
    alertEmpty: "Кем дегенде бір гүл таңдаңыз.",
    bouquetPreview: "Гүл шоғының алдын ала көрінісі",
    resetBouquet: "Қайта жинау",
    letterLabel: "💌 Сіздің арналған хатты жазыңыз:",
    letterPlaceholder: "Хатыңызды осында жазыңыз...",
    letterInWhatsapp: "Алушыға арналған хабарлама",
    bouquetRecipe: "Гүл шоғының құрамы:"
  }
};

function setLanguage(lang) {
  currentLang = lang;
  updateUIText();
}
