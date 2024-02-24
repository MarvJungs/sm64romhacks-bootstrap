document.addEventListener("DOMContentLoaded", main);

async function main() {
    const streams = await fetchStreams();
    
    const mainSection = document.getElementsByTagName('main')[0];
    mainSection.innerHTML = Streams(streams);
}

async function fetchStreams() {
    const streams = await fetch('https://www.sm64romhacks.com/api/streams').then((res) => {return res.json()});
    return streams;
}

function Streams(streams) {
    const streamItems = Object.values(streams).map((stream) => {
        const thumbnail = stream.thumbnail_url.replace('{width}', 1280).replace('{height}', 720);
        const title = stream.title.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        const viewer_count = stream.viewer_count;
        const user_name = stream.user_name;
        const user_login = stream.user_login;
        
        return `
            <div class='stream-container'>
                <a href="https://www.twitch.tv/${user_login}" target='_blank' rel='noreferrer'>
                    <img src="${thumbnail}" alt="${user_login} stream thumbnail"></img>
                </a>
                <h2>${title}</h2>
                <h2>${user_name} (${viewer_count} Viewers)</h2>
            </div>
        `
    }).join('');

    return `
        <div class='streams'>
            ${streamItems}
        </div>
    `
}