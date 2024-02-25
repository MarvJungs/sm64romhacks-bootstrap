document.addEventListener("DOMContentLoaded", Header);

function Header() {
    const header = document.getElementsByTagName("header")[0];
    let time;
    setInterval(() => {
        const t = new Date();
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        };
        time =  new Intl.DateTimeFormat('sv', options).format(t);
        document.querySelector('#time').innerHTML = time;
    }, 1000);

    header.innerHTML = `
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="/"><img class="img-responsive d-inline-block align-text-top" src="/_assets/_img/logo.png" alt="Logo" width="160" height="90"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link link-info link-underline-opacity-0" href="/hacks">ROM Hacks </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-info link-underline-opacity-0" href="/megapack">Megapack</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link link-info link-underline-opacity-0 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Events
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/events/relay2024">Relay 2024</a></li>
                            <li><a class="dropdown-item" href="/events/wsrm2024">WSRM2024</a></li>
                            <li><a class="dropdown-item" href="/events/league2023">League 2023 </a></li>
                            <li><a class="dropdown-item" href="/events/ssrm2023">SSRM2023</a></li>
                            <li><a class="dropdown-item" href="/events/wsrm2023">WSRM2023</a></li>
                            <li><a class="dropdown-item" href="/events/league2022">League 2022</a></li>
                            <li><a class="dropdown-item" href="/events/ssrm2022">SSRM2022</a></li>
                            <li><a class="dropdown-item" href="/events/wsrm2022">WSRM2022</a></li>
                            <li><a class="dropdown-item" href="/events/ssrm2021">SSRM2021</a></li>
                            <li><a class="dropdown-item" href="/events/wsrm2021">WSRM2021</a></li>
                            <li><a class="dropdown-item" href="/events/ssrm2020">SSRM2020</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link link-info link-underline-opacity-0 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Gameplay Tools
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/codes">Codes </a></li>
                            <li><a class="dropdown-item" href="/stardisplay">Star Display</a></li>
                            <li><a class="dropdown-item" href="/patcher">Online Patcher</a></li>
                            <li><a class="dropdown-item" href="/plugins">Plugin Guide</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-info link-underline-opacity-0" href="/faq">FAQ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-info link-underline-opacity-0" href="/streams">Streams</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-info link-underline-opacity-0" href="http://discord.sm64romhacks.com">Discord</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-info link-underline-opacity-0" href="https://ko-fi.com/marvjungs">Support!</a>
                    </li>
                    <li class="nav-item"><a href="/login" class="nav-link link-info link-underline-opacity-0" title="By logging in you agree with our Terms of Service">Login</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="" width=16 height=16 />&nbsp;					
                            </a>
                            <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/admin">Admin Page</a></li>
                                    <li><a class="dropdown-item" href="/users">Users</a></li>
                                    <li><a class="dropdown-item" href="/users/">Profile</a></li>
                                <hr />
                                <li><a class="dropdown-item" href="/login/logout.php">Logout</a></li>
                                <li><a class="dropdown-item text-danger" href="/login/deleteAccount.php">Delete Account</a></li>
                            </ul>
                        </li>
                    </li>
                </ul>
            </div>
        </nav>
        <p class='text-end' id='time'></p>
    `
}