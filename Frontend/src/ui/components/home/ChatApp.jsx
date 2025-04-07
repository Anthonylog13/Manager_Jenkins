import { useEffect, useState, useContext } from "react";
import { socket } from "../home/socket";
import { ConnectionState } from "../home/ConnectionState";
import { ConnetionManager } from "../home/ConnetionManager";
import { AuthContext } from "../../../auth";
import axios from "axios";
import { CardProduct } from "../common/CardProduct";

export const ChatApp = () => {
  const { user, logged } = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/getAllTweets");
        console.log("Tweets fetched:", res.data.tweets);
        setMessages(res.data.tweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();

    const onConnect = () => {
      if (!logged) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }

      const payload = {
        user,
        text: "Joined to the chat room",
        timestamp: new Date().toLocaleTimeString(),
        type: "status",
      };

      socket.emit("chat message", payload);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessages = (value) => {
      setMessages((previous) => [...previous, value]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat message", onMessages);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat message", onMessages);
    };
  }, []);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (newMessage.trim() !== "") {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/createPosts",
          {
            username: user.username,
            body: newMessage,
          }
        );

        console.log("Message created:", data.user);

        const payload = {
          user: data.user.username,
          text: newMessage,
          timestamp: new Date().toLocaleTimeString(),
          type: "msg",
        };

        socket.timeout(1000).emit("chat message", payload, () => {
          setIsLoading(false);
          setNewMessage("");
        });
      } catch (error) {
        console.error("Error in message submission:", error);
        setIsLoading(false);
      }
    }
  };

  const isStatusMessage = (type) => {
    return type === "status" ? "fst-italic fw-light fs-8" : "";
  };

  const card = messages.map((item) => (
    <CardProduct key={item._id} body={item.body} username={item.username} />
  ));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="flex flex-col items-center w-full max-w-xl">
        <div className="w-full bg-white border border-gray-300 rounded-lg mt-4 shadow">
          <div className="bg-gray-900 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">Inicio</h2>
            <ConnetionManager />
            <ConnectionState isConnected={isConnected} />
          </div>

          <div className="p-4 border-b border-gray-300">
            <form onSubmit={onSubmit} className="flex space-x-3 items-center">
              {logged && (
                <img
                  src={user.userPhoto}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <input
                type="text"
                value={newMessage}
                onChange={handleInputChange}
                placeholder="What is happening??"
                className="flex-1 border border-gray-300 rounded-full p-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                disabled={isLoading || !isConnected}
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-600 disabled:bg-gray-400"
                disabled={isLoading || !isConnected}
                onClick={() => setTimeout(() => window.location.reload(), 1)}
              >
                Send
              </button>
            </form>
          </div>

          <div className="p-4 overflow-y-auto" style={{ maxHeight: "500px" }}>
            <ul className="space-y-4">{card}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};
