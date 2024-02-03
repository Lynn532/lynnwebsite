document.addEventListener('DOMContentLoaded', function () {
    checkServerStatus();
    setInterval(checkServerStatus, 1000); // Check server status every 5 seconds
});

function checkServerStatus() {
    // Replace 'your_server_ip' and 'your_server_port' with your Minecraft server IP and port
    const serverIp = 'play.peoplemc.xyz';
    const apiUrl = `https://api.mcsrvstat.us/2/${serverIp}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const statusText = document.getElementById('statusText');

            if (data.online) {
                const playerCount = data.players ? data.players.online : 0;
                const maxPlayers = data.players ? data.players.max : 0;
                statusText.textContent = `Server PeopleMC sedang Online ${playerCount}/${maxPlayers}`;
                statusText.classList.add('online');
                statusText.classList.remove('offline');
            } else {
                statusText.textContent = 'Server PeopleMC sedang Offline';
                statusText.classList.add('offline');
                statusText.classList.remove('online');
            }
        } else {
            console.error('Error fetching server status. Status code:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Network error while fetching server status.');
    };

    xhr.send();
}
