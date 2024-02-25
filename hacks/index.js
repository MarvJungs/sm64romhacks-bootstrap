document.addEventListener("DOMContentLoaded", main);

async function main() {
    const mainSection = document.getElementsByTagName("main")[0];
    const hacks = await fetchAllHacks();
    mainSection.innerHTML = Searchbar(hacks.tags);

    const tableContainer = document.createElement('div');
    tableContainer.id = 'hacksCollection';
    tableContainer.innerHTML += Table(hacks.hacks);
    mainSection.appendChild(tableContainer);

    mainSection.addEventListener("change", (e) => {
        if(e.target.id === "sortFilter") {
            tableContainer.innerHTML = Table(hacks.hacks.sort((a, b) => {
                switch(e.target.value) {
                    case "hack_name_asc":
                        return a.hack_name.toLowerCase().localeCompare(b.hack_name.toLowerCase());
                    case "hack_name_desc":
                        return b.hack_name.toLowerCase().localeCompare(a.hack_name.toLowerCase());
                    case "hack_release_date_asc":
                        if(new Date(a.release_date) - new Date(b.release_date) === 0) return a.hack_name.toLowerCase().localeCompare(b.hack_name.toLowerCase());
                        else return new Date(a.release_date) - new Date(b.release_date);
                    case "hack_release_date_desc":
                        if(new Date(b.release_date) - new Date(a.release_date) === 0) return a.hack_name.toLowerCase().localeCompare(b.hack_name.toLowerCase());
                        else return new Date(b.release_date) - new Date(a.release_date);
                    case "hack_starcount_asc":
                        if(Number(a.hack_starcount) - Number(b.hack_starcount) === 0) return a.hack_name.toLowerCase().localeCompare(b.hack_name.toLowerCase());
                        else return Number(a.hack_starcount) - Number(b.hack_starcount);
                    case "hack_starcount_desc":
                        if(Number(b.hack_starcount) - Number(a.hack_starcount) === 0) return a.hack_name.toLowerCase().localeCompare(b.hack_name.toLowerCase());
                        else return Number(b.hack_starcount) - Number(a.hack_starcount);
                    case "hack_downloads_asc":
                        if(Number(a.total_downloads) - Number(b.total_downloads) === 0) return a.hack_name.toLowerCase().localeCompare(b.hack_name.toLowerCase());
                        else return Number(a.total_downloads) - Number(b.total_downloads);
                    case "hack_downloads_desc":
                        if(Number(b.total_downloads) - Number(a.total_downloads) === 0) return a.hack_name.toLowerCase().localeCompare(b.hack_name.toLowerCase());
                        else return Number(b.total_downloads) - Number(a.total_downloads);
                    default:
                        return a.hack_name.toLowerCase().localeCompare(b.hack_name.toLowerCase());
                }
            }));
        }
        if(e.target.id === "hack_tag_filter") {
            tableContainer.innerHTML = Table(hacks.hacks.filter((hack) => {
                return e.target.value.toLowerCase() === '' ? hack : hack.hack_tags.toLowerCase().includes(e.target.value.toLowerCase());
            }));
        }
    })

    mainSection.addEventListener("keyup", (e) => {
            tableContainer.innerHTML = Table(hacks.hacks.filter((hack) => {
                switch(e.target.id) {
                    case 'hack_name_filter':
                        return e.target.value.toLowerCase() === '' ? hack : hack.hack_name.toLowerCase().includes(e.target.value.toLowerCase());
                    case 'hack_creator_filter':
                        return e.target.value.toLowerCase() === '' ? hack : hack.hack_author.toLowerCase().includes(e.target.value.toLowerCase());
                    case 'hack_release_date_filter':
                        return e.target.value.toLowerCase() === '' ? hack : hack.release_date.toLowerCase().includes(e.target.value.toLowerCase());
                }
            }))
        }
    )
}

async function fetchAllHacks() {
    const hacks = await fetch("https://www.sm64romhacks.com/api/hacks").then((res) => res.json());
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
                <td hidden="true">${hack.hack_tags}</td>
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
                    <th scope="col" hidden="true">Tags</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `
}

function Searchbar(tags) {
    const tagOptions = tags.map((tag) => {
        return `
            <option value="${tag.tag_name}">${tag.tag_name}</option>
        `
    });

    return `
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" id="hack_name_filter" placeholder="Search for Hacknames..."></input>
            </div>
            <div class="col">
                <input type="text" class="form-control" id="hack_creator_filter" placeholder="Search for Hackcreators..."></input>
            </div>
            <div class="col">
                <input type="text" class="form-control" id="hack_release_date_filter" placeholder="Search for Release Date..."></input>
            </div>
            <div class="col">
                <select class="form-select" id="hack_tag_filter">
                    <option value="" selected="true">Select A Tag</option>
                    ${tagOptions}
                </select>
            </div>
            <div class="col">
                <select class="form-select" id="sortFilter">
                    <option value="" selected="true">Sort By</option>
                    <option value="hack_name_asc">Hackname (ASC)</option>
                    <option value="hack_name_desc">Hackname (DESC)</option>
                    <option value="hack_release_date_asc">Release Date (ASC)</option>
                    <option value="hack_release_date_desc">Release Date (DESC)</option>
                    <option value="hack_starcount_asc">Starcount (ASC)</option>
                    <option value="hack_starcount_desc">Starcount (DESC)</option>
                    <option value="hack_downloads_asc">Downloads (ASC)</option>
                    <option value="hack_downloads_desc">Downloads (DESC)</option>
                </select>
            </div> 
        </div>
    `
}