import { ImgGallery } from "../../../ui/components/products/ImgGallery";
import { Navbar } from "../../../ui/components/common/Navbar";
import { StarRating } from "../../../ui/components/common/StarRating";
import icons from "../../../assets/icons";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../../hooks";
import { loadReview } from "../../helpers/loadReview";
import { AuthContext } from "../../../auth";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const newEmptyReview = {
  Review: "",
  star: "",
};

export const ProductView = () => {
  const location = useLocation();
  const { name, url, userName, UrlPhoto, IdUser } = location.state || {};
  const { logged, user } = useContext(AuthContext);
  const { Review, star, onInputChange } = useForm(newEmptyReview);
  const [review, setReview] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const productsData = await loadReview();
        setReview(productsData);
      } catch (error) {
        console.error("Error fetching Review", error);
      }
    };
    fetchReview();
  }, [IdUser]);

  const onCreateReview = async (event) => {
    event.preventDefault();
    const newReview = {
      Review: Review,
      userId: user.uid,
      star: star,
    };
    await saveReview(newReview);
  };

  const handleRatingChange = (rating) => {
    onInputChange({ target: { name: "star", value: rating } });
  };

  const onCreateFollowing = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/createfollowing",
        {
          usernameSeguidor: user.username,
          usernameSeguido: name,
          body: url,
        }
      );
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-900 h-5"></div>

      <div className="flex justify-center bg-gray-100 py-10">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
          <div className="flex items-center mb-6">
            <img
              src={UrlPhoto || icons.user}
              alt="User Icon"
              className="w-16 h-16 rounded-full"
            />
            <>
              {!logged && (
                <>
                  <label htmlFor=""></label> <br />
                  <Link to="/login" className="text-md text-blue-500">
                    Seguir
                  </Link>
                </>
              )}

              {logged && (
                <button className="text-blue-500" onClick={onCreateFollowing}>
                  Seguir
                </button>
              )}
            </>

            <div className="ml-4">
              <h1 className="text-xl font-semibold">{userName}</h1>
              <span className="text-gray-500">@{name}</span>
            </div>
          </div>

          <div className="flex justify-start mb-4">
            {!logged ? (
              <Link to="/login" className="text-gray-900 text-md font-semibold">
                Seguir
              </Link>
            ) : (
              <button
                onClick={onCreateFollowing}
                className="text-blue-700 font-semibold"
              >
                {isFollowing ? "Siguiendo" : "Seguir"}
              </button>
            )}
          </div>

          <div className="mb-4">
            <p className="font-bold text-gray-600">Descripción:</p>
            <p className="text-gray-700">
              {url || "No hay descripción disponible."}
            </p>
          </div>

          <div className="flex justify-around text-gray-700 mb-6">
            <div className="text-center">
              <span className="font-bold">10</span>
              <p>Following</p>
            </div>
            <div className="text-center">
              <span className="font-bold">20</span>
              <p>Followers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 h-5"></div>
    </>
  );
};
