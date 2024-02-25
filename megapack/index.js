document.addEventListener("DOMContentLoaded", main);

async function main() {
    const mainSection = document.getElementsByTagName("main")[0];
    const megapackHacks = await fetchMegapackHacks();

    mainSection.innerHTML = `
        <h1>Grand ROM Hack Megapack</h1>
        <p>
            This megapack offers a selection of major Super Mario 64 ROM Hacks which are universally considered to be the greatest. This is in hope to provide an ideal starter pack which serves as an easily accessible introduction to the world of ROM Hacks.
        </p>
        <p>
            <i>Contents of this page was last updated: 2024-01-01 (yyyy-mm-dd)</i>
        </p>
        <div class="row">
            <div class="col">
                <div class="btn-group-lg">
                    <a class="btn btn-primary" href="Grand%20Rom%20Hack%20Megapack%202023%20(Final_Edition).zip">Download Megapack</a>
                </div>
            </div>
            <div class="col">
                <div class="btn-group-lg">
                    <a class="btn btn-primary" href="Grand%20SM64%20Kaizo%20Megapack%202023%20(Final_Edition).zip">Download KAIZO Megapack</a>
                </div>
            </div>
            <div class="col">
                <select class="form-select form-select-lg" id="filterDifficulty">
                    <option selected="true" value="">Select A Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="normal">Normal</option>
                    <option value="advanced">Advanced</option>
                    <option value="kaizo">Kaizo</option>
                </select>
            </div>
        </div>
    `;

    const normalMegapackContainer = document.createElement('div');
    const kaizoMegapackContainer = document.createElement('div');
    normalMegapackContainer.id = 'normal';
    kaizoMegapackContainer.id = 'kaizo';
    normalMegapackContainer.innerHTML = "<h2>Normal Megapack Hacks</h2>";
    kaizoMegapackContainer.innerHTML = "<h2>Kaizo Megapack Hacks</h2>";
    normalMegapackContainer.innerHTML += Table(megapackHacks.filter((hack) => {
        return !hack.hack_tags.includes("Kaizo");
    }));
    kaizoMegapackContainer.innerHTML += Table(megapackHacks.filter((hack) => {
        return hack.hack_tags.includes("Kaizo");
    }));
    mainSection.appendChild(normalMegapackContainer);
    mainSection.appendChild(kaizoMegapackContainer);

    document.querySelector("#filterDifficulty").addEventListener("change", (e) => {
        normalMegapackContainer.innerHTML = "<h2>Normal Megapack Hacks</h2>";
        kaizoMegapackContainer.innerHTML = "<h2>Kaizo Megapack Hacks</h2>";    
        switch (e.target.value) {
            case "easy":
                normalMegapackContainer.style.display = 'block';
                normalMegapackContainer.innerHTML += Table(megapackHacks.filter((hack) => {
                    return hack.hack_tags.toLowerCase().includes('easy');
                }))
                kaizoMegapackContainer.style.display = 'none';
                break;
            case "normal":
                normalMegapackContainer.style.display = 'block';
                normalMegapackContainer.innerHTML += Table(megapackHacks.filter((hack) => {
                    return hack.hack_tags.toLowerCase().includes('normal');
                }))
                kaizoMegapackContainer.style.display = 'none';
                break;
            case "advanced":
                normalMegapackContainer.style.display = 'block';
                normalMegapackContainer.innerHTML += Table(megapackHacks.filter((hack) => {
                    return hack.hack_tags.toLowerCase().includes('advanced');
                }))
                kaizoMegapackContainer.style.display = 'none';
                break;
            case "kaizo":
                normalMegapackContainer.style.display = 'none';
                kaizoMegapackContainer.style.display = 'block';
                kaizoMegapackContainer.innerHTML += Table(megapackHacks.filter((hack) => {
                    return hack.hack_tags.toLowerCase().includes("kaizo");
                })); 
                break;           
            default:
                normalMegapackContainer.style.display = 'block';
                kaizoMegapackContainer.style.display = 'block';
                normalMegapackContainer.innerHTML += Table(megapackHacks.filter((hack) => {
                    return !hack.hack_tags.toLowerCase().includes("kaizo");
                }));
                kaizoMegapackContainer.innerHTML += Table(megapackHacks.filter((hack) => {
                    return hack.hack_tags.toLowerCase().includes("kaizo");
                }));
                break;
        }
    })
}

async function fetchMegapackHacks() {
    const hacks = await fetch("https://www.sm64romhacks.com/api/megapack").then((res) => res.json());
    return hacks;
}

function Table(hacks) {
    const tableRows = hacks.map((hack) => {
        return `
            <tr>
                <td><a class="link-info link-underline-opacity-0" href="/hacks/${hack.hack_url}">${hack.hack_name}</a></td>
                <td>${hack.hack_author}</td>
                <td>${hack.release_date}</td>
                <td>${hack.hack_starcount}</td>
                <td class="text-muted text-nowrap">Downloads: ${hack.total_downloads}</td>
                <td>${hack.hack_tags}</td>
            </tr>
        `
    }).join("");



    return `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Hackname</th>
                    <th scope="col">Creator</th>
                    <th scope="col" class="text-nowrap">Release Date</th>
                    <th scope="col">Starcount</th>
                    <th scope="col">Downloads</th>
                    <th scope="col">Difficulty</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `
}