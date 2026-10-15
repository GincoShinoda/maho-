async function loadData() {
  const response = await fetch("data.json");
  const data = await response.json();

  const rankFilter = document.getElementById("rankFilter");
  const nameFilter = document.getElementById("nameFilter");
  const tbody = document.querySelector("#dataTable tbody");

  // 1. 絞り込み順
  const rankOrder = ["SSR", "SR", "R"]; 
  const nameOrder = [
    "オズ", "アーサー", "カイン", "リケ",
    "スノウ", "ホワイト", "ミスラ", "オーエン", "ブラッドリー", 
    "ファウスト", "シノ", "ヒースクリフ", "ネロ",
    "シャイロック", "ムル", "クロエ", "ラスティカ",
    "フィガロ", "ルチル", "レノックス", "ミチル"
  ]; // 表示順

  // 既存データからユニーク値を抽出
  const ranks = [...new Set(data.map(d => d.cardRank))];
  const names = [...new Set(data.map(d => d.charaName))];

  // 手動順序を優先して並べる
  const sortedRanks = rankOrder.filter(r => ranks.includes(r)).concat(
    ranks.filter(r => !rankOrder.includes(r))
  );
  const sortedNames = nameOrder.filter(n => names.includes(n)).concat(
    names.filter(n => !nameOrder.includes(n))
  );

  // ドロップダウン生成
  sortedRanks.forEach(rank => {
    const opt = document.createElement("option");
    opt.value = rank;
    opt.textContent = rank;
    rankFilter.appendChild(opt);
  });

  sortedNames.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    nameFilter.appendChild(opt);
  });

  // キャラ名カラー設定マップ
  const colorMap = {
    "オズ": "name-gold",
    "アーサー": "name-gold",
    "カイン": "name-gold",
    "リケ": "name-gold",
    "スノウ": "name-purple",
    "ホワイト": "name-purple",
    "ミスラ": "name-purple",
    "オーエン": "name-purple",
    "ブラッドリー": "name-purple",
    "ファウスト": "name-blue",
    "シノ": "name-blue",
    "ヒースクリフ": "name-blue",
    "ネロ": "name-blue",
    "シャイロック": "name-red",
    "ムル": "name-red",
    "クロエ": "name-red",
    "ラスティカ": "name-red",
    "フィガロ": "name-green",
    "ルチル": "name-green",
    "レノックス": "name-green",
    "ミチル": "name-green"
  };

    const rankColorMap = {
    "SSR": "rank-SSR",
    "SR": "rank-SR",
    "R": "rank-R"
  };

  // テーブル描画
  function renderTable(filtered) {
    tbody.innerHTML = "";
    filtered.forEach(row => {
      const colorClass = colorMap[row.charaName] || "";
      
      const rankClass = rankColorMap[row.cardRank] || "";
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="${colorClass}">${row.charaName}</td>
        <td class="${rankClass}">${row.cardRank}</td>
        <td>${row.event}</td>
        <td>${row.eventColumn}</td>
        <td>${row.eventRow}</td>
        <td>${row.drops}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // 初期表示
  renderTable(data);

  // 絞り込み
  function applyFilter() {
    const rankVal = rankFilter.value;
    const nameVal = nameFilter.value;

    const filtered = data.filter(item => {
      const matchRank = !rankVal || item.cardRank === rankVal;
      const matchName = !nameVal || item.charaName === nameVal;
      return matchRank && matchName;
    });

    renderTable(filtered);
  }

  rankFilter.addEventListener("change", applyFilter);
  nameFilter.addEventListener("change", applyFilter);
}

loadData();
