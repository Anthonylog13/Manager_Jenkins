import images from "../../../assets/images";
import { Navbar } from "../../../ui/components/common/Navbar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../../auth";

export const UserPerfile = () => {
  const { user, logged } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [follow, setFollow] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/TweetsUser/${user.username}`
        );
        console.log("Tweets fetched:", res.data.tweets);
        setMessages(res.data.tweets);

        const respo = await axios.get("http://localhost:3000/api/following", {
          usernameSeguidor: user.username,
        });
        console.log("Follow fetched:", respo.data.follow);
        setFollow(respo.data.follow);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-300 min-h-screen flex flex-col items-center">
        <div className="w-full h-24 bg-gray-800"></div>

        <div className="relative -mt-10 w-11/12 bg-gray-200 rounded-md shadow-md p-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={images.img5}
                className="w-16 h-16 rounded-full border-2 border-white"
                alt="Profile"
              />
              <div>
                <p className="text-gray-600">{user.username}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-2 text-gray-700">
            <p>
              <span className="font-bold">99</span> Following
            </p>
            <p>
              <span className="font-bold">7.5M</span> Followers
            </p>
          </div>
        </div>

        <div className="p-4 overflow-y-auto" style={{ maxHeight: "500px" }}>
          <ul className="space-y-4">
            {messages.map((message, _id) => (
              <li key={_id} className="flex items-start space-x-3">
                <img
                  src={message.userPhoto || "default-avatar-url.jpg"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    {!logged && (
                      <strong className="text-gray-900">
                        {message.username}
                      </strong>
                    )}
                    {logged && (
                      <>
                        <strong className="text-gray-900">
                          {message.username}
                        </strong>
                      </>
                    )}
                  </div>
                  <p>{message.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 overflow-y-auto" style={{ maxHeight: "500px" }}>
        <h1>FOLLOWING</h1>
        <ul className="space-y-4">
          {follow.map((follows, _id) => (
            <li key={_id} className="flex items-start space-x-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2"></div>
                <p>{follows.usernameSeguido}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
