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
console.log(data);

if (!data.response) {
  document.getElementById("matches").innerHTML = "<h2>Unable to load live fixtures.</h2>";
  return;
}
    const matches = document.getElementById("matches");

    if (!data.response || data.response.length === 0) {
      matches.innerHTML = "<h2>No live matches right now.</h2>";
      return;
    }

    matches.innerHTML = data.response.map(match => `
      <div class="match">
        
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
  <div style="text-align:center;">
    <img src="${match.teams.home.logo}" width="50" height="50">
    <p>${match.teams.home.name}</p>
  </div>

  <div style="text-align:center;">
    <h3>VS</h3>
    <p>${match.goals.home} - ${match.goals.away}</p>
    <small>${match.fixture.status.elapsed}'</small>
  </div>

  <div style="text-align:center;">
    <img src="${match.teams.away.logo}" width="50" height="50">
    <p>${match.teams.away.name}</p>
  </div>
</div>  
      
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
  }
}

loadLiveFixtures();
