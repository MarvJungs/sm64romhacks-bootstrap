document.addEventListener("DOMContentLoaded", main);

async function main() {
    const hack_url = document.location.pathname.replace('/hacks/', '')
    const mainSection = document.getElementsByTagName('main')[0];
    const patches = await fetchHack(hack_url);
    
    const tableContainer = document.createElement('div');
    tableContainer.id = 'hacksCollection';
    mainSection.appendChild(tableContainer);

    tableContainer.innerHTML = Table(patches.patches)

    if(patches.images.length > 0) {
        const imageContainer = document.createElement('div');
        imageContainer.id = 'imagesCollection';
        mainSection.appendChild(imageContainer);
    
        imageContainer.innerHTML = Slideshow(patches.images);
    }

    if(patches.patches[0].hack_description !== "") {
        const descriptionContainer = document.createElement('div');
        descriptionContainer.id = "descriptionContainer";
        mainSection.appendChild(descriptionContainer);
    
        descriptionContainer.innerHTML = Description(patches.patches[0].hack_description);    
    }
}

async function fetchHack(hack_url) {
    const patches = await fetch(`https://www.sm64romhacks.com/api/hacks?hack_name=${hack_url}`).then((res) => {return res.json()})
    return patches;
}

function Table(patches) {
    const tableRows = patches.map((patch) => {
        return `
            <tr>
                <td>${patch.hack_name}</td>
                <td>${patch.hack_version}</td>
                <td><a href="/patch/${patch.hack_patchname}.zip">Download</a><br><span class="text-muted">Downloads: ${patch.hack_downloads}</td>
                <td>${patch.authors}</td>
                <td>${patch.hack_starcount}</td>
                <td>${patch.hack_release_date}</td>
            </tr>
        `
    }).join("");

    return `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Hack Name</th>
                    <th scope="col">Hack Version</th>
                    <th scope="col">Download Link</th>
                    <th scope="col">Creator</th>
                    <th scope="col">Starcount</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `
}

function Slideshow(images) {

    const slideshow = `
        <div class="carousel-inner">
            ${images.map((image, index) => {
                if(index === 0)
                {
                    return `
                    <div class="carousel-item active justify-content-center" data-bs-interval="100">
                        <img src="https://www.sm64romhacks.com/api/images/${image}" class="d-block" data-bs-interval="100"></image>
                    </div>
                `
                }
                else {
                    return `
                    <div class="carousel-item justify-content-center" data-bs-interval="100">
                        <img src="https://www.sm64romhacks.com/api/images/${image}" class="d-block" data-bs-interval="100"></image>
                    </div>
                `

                }
            }).join('')}
        </div>

    ` 

    return `
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            ${slideshow}
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>
    `
}

function Description(description) {
    return `
        <div class="accordion id="descriptionComponent">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button type="button" data-bs-collapse="collapse" data-bs-target="#description" aria-expanded="true" aria-controls="description">
                        Description
                    </button>
                </h2>
                <div id="description" class="accordion-collapse collapse show" data-bs-parent="#descriptionComponent">
                    <div class="accordion-body">
                        <strong>${description}</strong>
                    </div>
                </div>
            </div>
        </div>
    `
}