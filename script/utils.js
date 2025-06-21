let flowerQuantities = {};
let selectedWrap = null;

function changeQty(id, diff) {
  if (!flowerQuantities[id]) flowerQuantities[id] = 0;
  flowerQuantities[id] = Math.max(0, flowerQuantities[id] + diff);
  document.getElementById(`${id}-qty`).innerText = flowerQuantities[id];

  const wrapObj = wrapData.find(w => w.id === selectedWrap);
  renderBouquetPreview(flowerQuantities, wrapObj?.image || null);
  updateTotalCostDisplay();
  updateBouquetInfo();
}

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function selectWrap(id) {
  selectedWrap = id;
  renderWrappings(); // refresh selection UI

  const wrapObj = wrapData.find(w => w.id === selectedWrap);
  renderBouquetPreview(flowerQuantities, wrapObj?.image || null);
  updateTotalCostDisplay();
  updateBouquetInfo();
}

function generateMessage() {
  const t = translations[currentLang];
  let msg = `💐 ${t.greeting}\n`;
  let total = 0;
  let hasFlowers = false;

  flowerData.forEach(f => {
    const qty = flowerQuantities[f.id] || 0;
    if (qty > 0) {
      hasFlowers = true;
      const cost = qty * f.price;
      const name = f[`name_${currentLang}`] || f.name?.[currentLang] || f.name;
      msg += `🎀 ${name} x${qty} = ${cost} ₸\n`;
      total += cost;
    }
  });

  if (!hasFlowers) {
    alert(t.alertEmpty);
    return null;
  }

  const wrap = wrapData.find(w => w.id === selectedWrap) || { price: 0, name_ru: 'Без упаковки', name_kk: 'Ораусыз' };
  const wrapName = wrap[`name_${currentLang}`] || wrap.name?.[currentLang] || wrap.name;
  msg += `${t.wrap}: ${wrapName} (${wrap.price} ₸)\n`;
  total += Number(wrap.price);
  msg += `💰 ${t.total}: ${total} ₸`;

  const letterText = document.getElementById("message-box").value.trim();
  if (letterText) {
    msg += `\n\n${translations[currentLang].letterInWhatsapp}: ${letterText}`;
  }

  return encodeURIComponent(msg);
}

function updateTotalCostDisplay() {
  let total = 0;

  flowerData.forEach(f => {
    const qty = flowerQuantities[f.id] || 0;
    total += qty * Number(f.price);
  });

  const wrap = wrapData.find(w => w.id === selectedWrap);
  if (wrap) {
    total += Number(wrap.price);
  }

  const el = document.getElementById("total-cost");
  el.innerText = `${translations[currentLang].total}: ${total} ₸`;
}
