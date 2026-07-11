const API_KEY = "8fed889517eb25c010399e1e5c91dd01";

async function loadLiveFixtures() {
  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        method: "GET",
        headers: {
          "x-apisports-key": API_KEY
        }
      }
    );

    const data = await response.json();

    const matches = document.getElementById("matches");

    if (!data.response || data.response.length === 0) {
      matches.innerHTML = "<h2>No live matches right now.</h2>";
      return;
    }

    matches.innerHTML = data.response.map(match => `
      <div class="match">
        <h3>${match.teams.home.name} vs ${match.teams.away.name}</h3>
        <p>${match.goals.home} - ${match.goals.away}</p>
        <p>${match.fixture.status.elapsed}'</p>
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
  }
}

loadLiveFixtures();
