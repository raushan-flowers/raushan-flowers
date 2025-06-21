const FLOWERS_URL = `https://opensheet.elk.sh/1pn0_jgN1bVlq8igLix57r6cSMucoW_mWTpX5f6NcUmw/Flowers`;
const WRAPPINGS_URL = `https://opensheet.elk.sh/1pn0_jgN1bVlq8igLix57r6cSMucoW_mWTpX5f6NcUmw/Wrappings`;

let flowerData = [];
let outOfStockFlowers = [];

let wrapData = [];
let outOfStockWraps = [];

function fetchDataAndRender() {
  fetch(FLOWERS_URL)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      // Split flowers into available and out-of-stock
      flowerData = data.filter(item => item.in_stock?.toLowerCase() === 'yes');
      outOfStockFlowers = data.filter(item => item.in_stock?.toLowerCase() !== 'yes');
      renderFlowers();
    })
    .catch(() => {});

  fetch(WRAPPINGS_URL)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      // Split wrappings into available and out-of-stock
      wrapData = data.filter(item => item.in_stock?.toLowerCase() === 'yes');
      outOfStockWraps = data.filter(item => item.in_stock?.toLowerCase() !== 'yes');
      renderWrappings();
    })
    .catch(() => {});
}

function resolveImagePath(imageValue) {
  // If it already starts with "http", return it as-is
  if (imageValue?.startsWith("http")) return imageValue;
  // Otherwise treat it as relative path (from /img/ folder)
  return imageValue ? imageValue : "";
}

function renderFlowers() {
  const container = document.getElementById("flower-scroll");
  container.innerHTML = "";
  
  // First render available flowers
  flowerData.forEach(flower => {
    container.innerHTML += createCard({
      id: flower.id,
      name: {
        ru: flower.name_ru,
        kk: flower.name_kk
      },
      price: flower.price,
      discount_price: flower.discount_price,
      image: flower.image
    }, true);
  });
  
  // Then render out-of-stock flowers
  outOfStockFlowers.forEach(flower => {
    container.innerHTML += createNotInStockCard({
      id: flower.id,
      name: {
        ru: flower.name_ru,
        kk: flower.name_kk
      },
      price: flower.price,
      image: flower.image
    }, true);
  });
}

function renderWrappings() {
  const container = document.getElementById("wrap-scroll");
  container.innerHTML = "";

  // Available wraps (including "none" option)
  const dataToUse = [
    { id: "none", name: { ru: "Без упаковки", kk: "Ораусыз" }, price: 0, in_stock: 'yes' },
    ...wrapData
  ];

  dataToUse.forEach(wrap => {
    const isSelected = wrap.id === selectedWrap;
    container.innerHTML += createCard({
      id: wrap.id,
      name: {
        ru: wrap.name_ru || wrap.name?.ru || wrap.name,
        kk: wrap.name_kk || wrap.name?.kk || wrap.name,
      },
      price: wrap.price,
      image: wrap.image
    }, false, isSelected);
  });
  
  // Out-of-stock wraps
  outOfStockWraps.forEach(wrap => {
    container.innerHTML += createNotInStockCard({
      id: wrap.id,
      name: {
        ru: wrap.name_ru || wrap.name?.ru || wrap.name,
        kk: wrap.name_kk || wrap.name?.kk || wrap.name,
      },
      price: wrap.price,
      image: wrap.image
    }, false);
  });
}

function createNotInStockCard(item, isFlower) {
  const isNoneWrap = !isFlower && item.id === "none";
  const displayTitle = item.name[currentLang] || "-";
  const outOfStockText = currentLang === 'ru' ? 'Нет в наличии' : 'Қоймада жоқ';
  
  return `
    <div class="col-md-4 mb-3 position-relative">
      <div class="card" style="cursor: not-allowed;">
        ${
          isNoneWrap
            ? `<div class="no-image-replacement" style="height:150px; display:flex; align-items:center; justify-content:center; font-weight:semi-bold; font-size:1rem; background:#f8f9fa; color:#636363; opacity: 0.6;">
                 ${displayTitle}
               </div>`
            : `<div style="position: relative;">
                 <img src="${item.image}" class="card-img-top" alt="${displayTitle}" 
                   style="${!isFlower ? 'height: 180px; object-fit: cover;' : ''} opacity: 0.35;">
                 <div class="position-absolute top-80 start-50 translate-middle" 
                      style="z-index: 10; padding: 5px 10px; border-radius: 20px;">
                   <span class="text-danger fw-bold" style="font-size: 0.75rem; white-space: nowrap;">
                     ${outOfStockText}
                   </span>
                 </div>
               </div>`
        }
        <div class="card-body text-center" style="opacity: 0.35;">
          ${!isNoneWrap ? `<h5 class="card-title">${displayTitle}</h5>` : ''}
          <p class="card-text">${item.price} ₽</p>
        </div>
      </div>
    </div>
  `;
}

function createCard(item, isFlower, isSelected = false) {
  const isNoneWrap = !isFlower && item.id === "none";
  const displayTitle = item.name[currentLang] || "-";
  const cardClass = `card text-center ${!isFlower && isSelected ? 'wrap-selected' : ''}`;
  const cardClick = !isFlower ? `onclick="selectWrap('${item.id}')"` : "";
  const hasDiscount = item.discount_price && parseFloat(item.discount_price) < parseFloat(item.price);

  return `
    <div class="col-md-4 mb-3">
      <div class="${cardClass}" style="cursor: ${!isFlower ? 'pointer' : 'default'};" ${cardClick}>
        ${
          isNoneWrap
            ? `<div class="no-image-replacement" style="height:150px; display:flex; align-items:center; justify-content:center; font-weight:semi-bold; font-size:1rem; background:#f8f9fa; color:#636363;">
                 ${displayTitle}
               </div>`
            : `<img src="${item.image}" class="card-img-top" alt="${displayTitle}" style="${!isFlower ? 'height: 180px; object-fit: cover;' : ''}">`
        }
        <div class="card-body">
          ${!isNoneWrap ? `<h5 class="card-title">${displayTitle}</h5>` : ''}
          <div class="price-display">
            ${
              hasDiscount
                ? `<span class="original-price">${item.price} ₸</span>
                   <span class="discount-price">${item.discount_price} ₸</span>`
                : `<span>${item.price} ₸</span>`
            }
          </div>
          ${
            isFlower
              ? `<div class="quantity-controls">
                  <button class="btn btn-sm btn-outline-danger" onclick="changeQty('${item.id}', -1)">−</button>
                  <span id="${item.id}-qty">0</span>
                  <button class="btn btn-sm btn-outline-success" onclick="changeQty('${item.id}', 1)">+</button>
                </div>`
              : ''
          }
        </div>
      </div>
    </div>
  `;
}
function updateUIText() {
  document.getElementById("flower-title").innerText = translations[currentLang].chooseFlowers;
  document.getElementById("wrap-title").innerText = translations[currentLang].chooseWrap;
  document.getElementById("order-text").innerText = translations[currentLang].order;
  document.getElementById("delivery-btn-text").innerText = translations[currentLang].delivery;
  document.getElementById("preview-title").innerText = translations[currentLang].bouquetPreview;
  document.getElementById("reset-btn").innerText = translations[currentLang].resetBouquet;
  document.getElementById("letter-label").innerText = translations[currentLang].letterLabel;
  document.getElementById("message-box").placeholder = translations[currentLang].letterPlaceholder;
  document.getElementById("bouquet-info-title").innerText = translations[currentLang].bouquetRecipe;
  fetchDataAndRender();
  renderFlowers();
  renderWrappings();
}
