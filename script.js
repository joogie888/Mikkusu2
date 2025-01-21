function fetchAnime() {
    fetch('https://kitsu.io/api/edge/anime')
        .then(response => response.json())
        .then(data => {
            const animeList = document.getElementById('animelist');
            animeList.innerHTML = '';
            data.data.forEach(anime => {
                const animeItem = document.createElement('div');
                animeItem.className = 'anime-item';
                animeItem.innerText = anime.attributes.titles.en || 'No English title available';
                animeList.appendChild(animeItem);
            });
        })
        .catch(error => console.error('Error fetching anime data:', error));
}


function fetchTrace() {
    const imageUrl = prompt("Enter the image URL to search for:"); 
    if (!imageUrl) return;

    fetch(`https://api.trace.moe/search?url=${encodeURIComponent(imageUrl)}`)
        .then(response => response.json())
        .then(data => {
            const traceResult = document.getElementById('trace');
            traceResult.innerHTML = ''; 
            if (data.result && data.result.length > 0) {
                data.result.forEach(result => {
                    const traceItem = document.createElement('div');
                    traceItem.className = 'trace-item';
                    traceItem.innerText = `Title: ${result.anime}, Episode: ${result.episode}`;
                    traceResult.appendChild(traceItem);
                });
            } else {
                traceResult.innerText = 'No results found for the image.';
            }
        })
        .catch(error => console.error('Error fetching trace data:', error));
}

function fetchAnimeSchedule() {
    fetch('https://api.jikan.moe/v4/schedules/thursday?sfw')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const scheduleResult = document.getElementById('animesched');
            scheduleResult.innerHTML = ''; 
            data.data.forEach(anime => {
                const animeItem = document.createElement('div');
                animeItem.className = 'myanimelist-item';
                animeItem.innerHTML = `
                    <h4>${anime.title}</h4>
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}" style="max-width: 50px;">
                    <p>Status: ${anime.status}</p>
                    <a href="${anime.url}" target="_blank">More Info</a>
                `;
                scheduleResult.appendChild(animeItem);
            });
        })
        .catch(error => console.error('Error fetching anime schedule:', error));
}

function fetchWaifu() {
    fetch('https://api.waifu.pics/sfw/waifu')
        .then(response => response.json())
        .then(data => {
            const waifuResult = document.getElementById('waifu');
            waifuResult.innerHTML = '';
            const waifuItem = document.createElement('div');
            waifuItem.className = 'waifu-item';
            waifuItem.innerHTML = `<img src="${data.url}" alt="Waifu Image" style="max-width: 25%;">`;
            waifuResult.appendChild(waifuItem);
        })
        .catch(error => console.error('Error fetching Waifu data:', error));
}

function fetchAnimeNewsNetwork(animeId) {
    fetch(`https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=${animeId}`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const animeInfo = xmlDoc.getElementsByTagName("anime")[0];
            const title = animeInfo.getElementsByTagName("title")[0].textContent;
            const animeNewsResult = document.getElementById('animenews');
            animeNewsResult.innerHTML = `<div class="anime-news-item">Title: ${title}</div>`;
        })
        .catch(error => console.error('Error fetching Anime News Network data:', error));
}


document.getElementById('fetchanimenews').addEventListener('click', () => {
    const animeId = prompt("Enter Anime ID:");
    if (animeId) {
        fetchAnimeNewsNetwork(animeId);
    }
});

document.getElementById('fetchanime').addEventListener('click', fetchAnime);
document.getElementById('fetchtrace').addEventListener('click', fetchTrace);
document.getElementById('fetchsched').addEventListener('click', fetchAnimeSchedule);
document.getElementById('fetchwaifu').addEventListener('click', fetchWaifu);
