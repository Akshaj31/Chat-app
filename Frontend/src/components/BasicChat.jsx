import { useEffect, useState } from "react";
import socket from "../../socket"; // Adjust the import based on your file structure

const BasicChat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [isRegistered, setIsRegistered] = useState(false); // State to track if the user is registered

    // Effect to handle incoming messages
    useEffect(() => {
        // Listen for incoming messages
        socket.on('receiveMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Cleanup on unmount
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const registerUsername = () => {
        if (username) {
            socket.emit('register', username); // Emit register event with username
            setIsRegistered(true); // Mark user as registered
        }
    };

    const sendMessage = () => {
        if (message && isRegistered) {
            // Emit the message event
            socket.emit('sendMessage', { receiverUsername: "receiverUsername", content: message, messageType: "text" });
            setMessage(""); // Clear input after sending
        }
    };

    return (
        <div className="min-h-screen items-center flex flex-col gap-10">
            <div>
                <h1 className="text-4xl p-8">Chat Application</h1>
            </div>
            <div className="flex flex-col gap-4">
                {/* Username Input */}
                {!isRegistered && (
                    <div>
                        <input
                            className="rounded-xl p-2 border-2 border-black"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button
                            className="bg-slate-300 px-4 py-2 rounded-lg"
                            onClick={registerUsername}
                        >
                            Register Username
                        </button>
                    </div>
                )}
                {/* Message Input */}
                {isRegistered && (
                    <>
                        <input
                            className="rounded-xl p-2 border-2 border-black"
                            type="text"
                            placeholder="Type your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            className="bg-slate-300 px-4 py-2 rounded-lg"
                            onClick={sendMessage}
                        >
                            Send Message
                        </button>
                    </>
                )}
            </div>
            <div className="flex flex-col gap-10">
                <h1 className="text-4xl p-8">Messages</h1>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            {msg.senderId}: {msg.content} at {new Date(msg.timestamp).toLocaleTimeString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BasicChat;
