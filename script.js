const coins = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC"
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH"
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL"
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB"
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP"
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE"
  }
];

async function loadMarket() {

  const list = document.getElementById("market-list");

  list.innerHTML = '<p class="loading">Loading market...</p>';

  const ids = coins.map(coin => coin.id).join(",");

  try {

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
    );

    const data = await response.json();

    list.innerHTML = "";

    coins.forEach((coin, index) => {

      const price = data[coin.id]?.usd || 0;
      const change = data[coin.id]?.usd_24h_change || 0;

      const row = document.createElement("div");

      row.className = "coin";

      row.innerHTML = `
        <span>${index + 1}</span>

        <div class="coin-info">
          <div class="icon">
            ${coin.symbol.charAt(0)}
          </div>

          <div>
            <strong>${coin.name}</strong>
            <div class="symbol">${coin.symbol}</div>
          </div>
        </div>

        <strong>
          $${price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
          })}
        </strong>

        <strong class="${change >= 0 ? "green" : "red"}">
          ${change >= 0 ? "+" : ""}
          ${change.toFixed(2)}%
        </strong>
      `;

      list.appendChild(row);
    });

  } catch (error) {

    list.innerHTML = `
      <p class="loading">
        Gagal mengambil data market.
      </p>
    `;

    console.error(error);
  }
}

loadMarket();

setInterval(loadMarket, 30000);
