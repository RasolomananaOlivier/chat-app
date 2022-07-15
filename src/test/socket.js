const { io } = require("socket.io-client");

const URL = process.env.URL || "http://localhost:5000";
const MAX_CLIENTS = 2;
const POLLING_PERCENTAGE = 0.05;
const CLIENT_CREATION_INTERVAL_IN_MS = 10000;
const EMIT_INTERVAL_IN_MS = 10000;

let clientCount = 0;
let lastReport = new Date().getTime();
let packetsSinceLastReport = 0;

let CREATE_GROUP = false;
const data = {
    adminId: '1',
    members: ['1', '2', '3'],
    name: 'group one',
    pictureUr: 'url'
}

const createClient = () => {
    // for demonstration purposes, some clients stay stuck in HTTP long-polling
    const transports =
        Math.random() < POLLING_PERCENTAGE ? ["polling"] : ["polling", "websocket"];

    const socket = io(URL, {
        transports,
    });

    if (!CREATE_GROUP) {
        setInterval(() => {
            socket.emit("CREATE_GROUP", data);
        }, EMIT_INTERVAL_IN_MS);
        CREATE_GROUP = true
    }

    setInterval(() => {
        socket.emit("SEND_MESSAGE_GROUP", { messageId: 1, message: 'hello world' });
    }, EMIT_INTERVAL_IN_MS);

    socket.on("GROUP_CREATED", (data) => {
        console.log('>>message', data);
        packetsSinceLastReport++;
    });

    socket.on("disconnect", (reason) => {
        console.log(`disconnect due to ${reason}`);
    });

    if (++clientCount < MAX_CLIENTS) {
        setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS);
    }
};

createClient();

const printReport = () => {
    const now = new Date().getTime();
    const durationSinceLastReport = (now - lastReport) / 1000;
    const packetsPerSeconds = (
        packetsSinceLastReport / durationSinceLastReport
    ).toFixed(2);

    console.log(
        `client count: ${clientCount} ; average packets received per second: ${packetsPerSeconds}`
    );

    packetsSinceLastReport = 0;
    lastReport = now;
};

setInterval(printReport, 5000);