const nasaApiKey = 't1RfAbcPO5YINLzbMREhS5mjA1w5bPZlNtJssyd3';

// Fetch de APOD
async function fetchApodData() {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`);
        const data = await response.json();
        let mediaContent;
        if (data.media_type === 'image') {
            mediaContent = `<img src="${data.url}" alt="${data.title}" style="max-width: 100%; height: auto; border-radius: 10px;">`;
        } else if (data.media_type === 'video') {
            mediaContent = `<iframe src="${data.url}" frameborder="0" allowfullscreen style="max-width: 100%; height: 400px; border-radius: 10px;"></iframe>`;
        } else {
            mediaContent = `<p style="color: red;">Contenido no disponible.</p>`;
        }
        const apodContent = `
            ${mediaContent}
        `;
        document.getElementById('apod-data').innerHTML = apodContent;
    } catch (error) {
        document.getElementById('apod-data').innerHTML = `<p style="color: red;">Error al cargar APOD: ${error.message}</p>`;
    }
}

// Fetch de EPIC
async function fetchEpicData() {
    try {
    const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${nasaApiKey}`);
    const data = await response.json();
    const latestImage = data[0];
    const date = latestImage.date.split(' ')[0].replace(/-/g, '/');
    const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${latestImage.image}.png`;
    const epicContent = `
        <img src="${imageUrl}" alt="EPIC Image" style="max-width: 100%; height: auto; border-radius: 10px;">
    `;
        document.getElementById('epic-data').innerHTML = epicContent;
    } catch (error) {
        document.getElementById('epic-data').innerHTML = `<p style="color: red;">Error al cargar EPIC: ${error.message}</p>`;
    }
}

fetchApodData();
fetchEpicData();
