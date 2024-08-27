const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.on("ReceiveMessage", (user, message) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`;
    document.getElementById("messagesList").appendChild(li);
    document.getElementById("messagesList").scrollTop = document.getElementById("messagesList").scrollHeight;
});

document.getElementById("sendButton").addEventListener("click", async () => {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    if (user && message) {
        await connection.invoke("SendMessage", user, message);
        document.getElementById("messageInput").value = "";
    }
});

document.getElementById("messageInput").addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        await document.getElementById("sendButton").click();
    }
});

connection.start().catch(console.error);
