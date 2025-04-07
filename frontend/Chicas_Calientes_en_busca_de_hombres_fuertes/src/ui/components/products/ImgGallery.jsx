import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ima from "../../../assets/images";

export const ImgGallery = () => {
  //pobner en el redme cometario del commit vacio
  const images = [
    {
      original: "https://picsum.photos/id/0/1000/600/",
      thumbnail: "https://picsum.photos/id/0/250/150/",
    },
    {
      original: "https://picsum.photos/id/2/1000/600/",
      thumbnail: "https://picsum.photos/id/2/250/150/",
    },
    {
      original: "https://picsum.photos/id/9/1000/600/",
      thumbnail: "https://picsum.photos/id/9/250/150/",
    },
    {
      original: "https://picsum.photos/id/48/1000/600/",
      thumbnail: "https://picsum.photos/id/48/250/150/",
    },
  ];

  return (
    <div className="max-w-screen-md mx p-4">
      <ImageGallery
        items={images}
        thumbnailPosition="left"
        showNav={false}
        showPlayButton={false}
        showFullscreenButton={false}
      />
    </div>
  );
};
