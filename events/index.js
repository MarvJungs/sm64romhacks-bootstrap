document.addEventListener("DOMContentLoaded", main);

async function main() {
    const WSRM2024_EVENT_ID = "5c504w1ah0f2kpb494"
    const SSRM2023_EVENT_ID = "06509q02k1dbo1b431";
    const WSRM2023_EVENT_ID = "4750zz56rk92sjb4bf";
    const SSRM2022_EVENT_ID = "7e50ulc9ggea6zb412";
    const WSRM2022_EVENT_ID = "34506369bja9jeb4e2";
    const SSRM2021_EVENT_ID = "0350d7328x26v0b4c9";
    const WSRM2021_EVENT_ID = "7650451baq30rwb4d8";
    const SSRM2020_EVENT_ID = "4450tn9604a91jb459";
    const WSRM2020_EVENT_ID = "18500837qwddp6b4c0";
    const SSRM2019_EVENT_ID = "5a50tr3cuccb1pb4c9";
    const WSRM2019_EVENT_ID = "3450oib9en77meb440";
    const SSRM2018_EVENT_ID = "5d50w3799pbfxpb45c";
    const WSRM2018_EVENT_ID = "19502r67ar8c17b42e";

    const mainSection = document.getElementsByTagName('main')[0];
    const slug = document.location.pathname.replace('/events/', '');
    
    const eventContainer = document.createElement('div');
    eventContainer.id = 'eventContainer';
    mainSection.appendChild(eventContainer);

    if(slug.includes('ssrm') || slug.includes('wsrm')) {
        switch (slug) {
            case 'wsrm2024':
                eventContainer.innerHTML = await SRMPage(WSRM2024_EVENT_ID);
                break;
            case 'ssrm2023':
                eventContainer.innerHTML = await SRMPage(SSRM2023_EVENT_ID);
                break;
            case 'wsrm2023':
                eventContainer.innerHTML = await SRMPage(WSRM2023_EVENT_ID);
                break;
            case 'ssrm2022':
                eventContainer.innerHTML = await SRMPage(SSRM2022_EVENT_ID);
                break;
            case 'wsrm2022':
                eventContainer.innerHTML = await SRMPage(WSRM2022_EVENT_ID);
                break;
            case 'ssrm2021':
                eventContainer.innerHTML = await SRMPage(SSRM2021_EVENT_ID);
                break;
            case 'wsrm2021':
                eventContainer.innerHTML = await SRMPage(WSRM2021_EVENT_ID);
                break;
            case 'ssrm2020':
                eventContainer.innerHTML = await SRMPage(SSRM2020_EVENT_ID);
                break;
            case 'wsrm2020':
                eventContainer.innerHTML = await SRMPage(WSRM2020_EVENT_ID);
                break;
            case 'ssrm2019':
                eventContainer.innerHTML = await SRMPage(SSRM2019_EVENT_ID);
                break;
            case 'wsrm2019':
                eventContainer.innerHTML = await SRMPage(WSRM2019_EVENT_ID);
                break;
            case 'ssrm2018':
                eventContainer.innerHTML = await SRMPage(SSRM2018_EVENT_ID);
                break;
            case 'wsrm2018':
                eventContainer.innerHTML = await SRMPage(WSRM2018_EVENT_ID);
                break;                                                                                                                                                                                                                                                                                                        
            default:
                eventContainer.innerHTML = "Error :(";
                break;
        }
    }
    else {
        switch (slug) {
            case "relay2024":
                eventContainer.innerHTML = Relay2024();
                break;
            case "league2023":
                break;
            case "league2022":
                break;
            default:
                eventContainer.innerHTML = "Error :(";
                break;
        }
    }
}

async function SRMPage(id) {
    const data = await fetchEvent(id);
    const event = data.event;
    const schedule = data.schedule;
    const ticker = data.ticker;

    return `
        <h1 class="text-center text-decoration-underline">${event.name}</h1>
        <p>
            <span class="text-uppercase">${event.slug}</span> is a Community-driven Marathon streamed on Twitch at the <a href="https://www.twitch.tv/sm64romhacks" target="_blank" rel="noreferrer">sm64romhacks Twitch Channel</a>.
            The marathon usually lasts for about 3-4 days and consists of various events such as speedruns, game shows, award ceremonies (Winter only) and more! For the schedule, please see below (converted to your local timezone).
        </p>
        ${ticker.current || ticker.next ? Ticker(ticker) : '' }
        ${Schedule(schedule)}
    `


}

async function fetchEvent(id) {
    const event = await fetch(`https://www.sm64romhacks.com/api/events?id=${id}`).then((res) => {return res.json();})
    return event;
}

function Schedule(schedule) {

    const columns = schedule.columns.map((col) => {
        return `
            <th scope="col">
                ${col}
            </th>
        `
    }).join('');

    const items = schedule.items.map((item) => {
        const data = item.data.map((runData) => {
            return `
                <td>
                    ${runData}
                </td>
            `
        }).join('');

        return `
            <tr>
                <td class="text-nowrap">
                    ${convertTimestampToDate(item.scheduled_t)}
                </td>
                <td>
                    ${convertTimestampToTime(item.scheduled_t)}
                </td>
                ${data}
            </tr>
        `
    }).join('');



    return `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">
                        Date
                    </th>
                    <th scope="col">
                        Time
                    </th>
                    ${columns}
                </tr>
            </thead>
            <tbody>
                ${items}
            </tbody>
        </table>
    `
}

function Ticker(ticker) {
    const current = ticker.current;
    const next = ticker.next;

    return `
        <table class="table table-sm table-responsive table-bordered table-warning">
            <thead>
                <tr>
                    <th>
                        Current Run:
                    </th>
                    <th>
                        Next Run:
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        ${current.data[0]} (${current.data[1]}) By ${current.data[2]}
                    </td>
                    <td>
                        ${next.data[0]} (${next.data[1]}) By ${next.data[2]}
                    </td>
                </tr>
            </tbody>
        </table>
    `
}

function convertTimestampToTime(timestamp) {
    const d = new Date(timestamp * 1000);
	const hh = ('0' + d.getHours()).slice(-2)			// Add leading 0.
	const m = ('0' + d.getMinutes()).slice(-2)			// Add leading 0.
	const ss = ('0' + d.getSeconds()).slice(-2)		    // Add leading 0.
    const time = hh + ':' + m + ':' + ss;

	return time;
}

function convertTimestampToDate(timestamp) {
    const d = new Date(timestamp * 1000);				// Convert the passed timestamp to milliseconds
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const yyyy = d.getFullYear()
    const mm = ('0' + (d.getMonth() + 1)).slice(-2)		// Months are zero based. Add leading 0.
    const dd = ('0' + d.getDate()).slice(-2)			// Add leading 0.

    const time = days[d.getDay()] + ', ' + yyyy + '-' + mm + '-' + dd;

    return time;
}

function League2022() {
    return `

    `
}

function League2023() {
    return `

    `
}

function Relay2024() {
    return `
        <h1>Star Revenge 100% Relay</h1>
        <p>
            The Star Revenge 100% Relay is an invite-only relay event. A relay is essentially nothing other than a serie of events in such a way that the next event starts once the ongoing player has finished. The relay is going to take place on April 12th to April 14th and will be streamed to <a href="https://www.twitch.tv/sm64romhacks" target="_blank" rel="noreferrer"> the sm64romhacks Twitch Channel</a>!
        </p>
        The following Categories will take place in this:
        <ul>
            <li> Star Revenge 0: Galaxy of Origins - 122 Star </li>
            <li> Star Revenge 0.5: The Unused Levels - 65/67/69 Star (Runners preference) </li>
            <li> Star Revenge 1: Star Takeover - 101 Star </li>
            <li> Star Revenge Redone 1.3 - 106 Star </li>
            <li> Star Revenge 1.5: Star Takeover Redone - 125 Star </li>
            <li> Star Revenge 2 Act 1: To The Moon - 85 Star </li>
            <li> Star Revenge 2 Act 2: Night of Doom - 160 Star </li>
            <li> Star Revenge 2.5: Remnant of Doom - 115 Star </li>
            <li> Star Revenge 3: Mario on An Saoire 64 - 65 Star </li>
            <li> Star Revenge 3.5: Vacation of Cursed Dreams - 133 Star </li>
            <li> Star Revenge 3.9: Dreamish Block Beats - 20 Star </li>
            <li> Star Revenge 4: The Kedama Takeover - 100 Star </li>
            <li> Star Revenge 4.5: The Kedama Takeover Rewritten - 100 Star </li>
            <li> Star Revenge 4.9: Adulterated Reality - 140 Star </li>
            <li> Star Revenge 5: Neo Blue Realm - 70 Star </li>
            <li> Star Revenge 5.5: Destroyed Memories - 70 Star </li>
            <li> Star Revenge 6: Luigi's Adventure - 121 Star </li>
            <li> Star Revenge 6.25: Luigi's Adventure DX - 216 Star </li>
            <li> Star Revenge 6.5: Wrath of the Dimensional Flower - 70 Star </li>
            <li> Star Revenge 6.9: Luigi Lost in Time - 25/27 Star (Runners preference) </li>
            <li> Star Revenge 7: Park of Time - 121 Star </li>
            <li> Star Revenge 7.5: Kedowser's Return - 131 Star </li>
            <li> Star Revenge 8: Scepter of Hope - 121 Star </li>
            <li> Star Revenge X: Discord Star Adventure - 100 Star </li>
        </ul>
        <p>
            Interested in catching the event? Be sure to keep an eye on this page as information gets continously updated! 
        </p>
        <p>
            The event is estimated to take around 50 hours.
        </p>
    `
}