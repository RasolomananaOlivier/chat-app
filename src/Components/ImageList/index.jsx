import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import pic1 from "./1.jpg";

import { useSelector } from "react-redux";
import { baseURL } from "../../Config/server";

export default function StandardImageList({ id }) {
  const [ListofImage, setListofImage] = React.useState([]);

  /**
   * Get the medias from redux store
   * And update the list of image
   * while the store changes
   */
  const medias = useSelector((state) => state.medias);
  React.useEffect(() => {
    // console.log(medias.collections);
    const result = medias.collections;
    setListofImage([...result]);
  }, [medias]);

  return (
    <ImageList
      sx={{ width: 260, height: "40vh" }}
      cols={2}
      rowHeight={164}
      className="disable-scrollbar"
    >
      {ListofImage.length === 0 ? (
        <div>NO Collections</div>
      ) : (
        ListofImage.map((image) => {
          return (
            <ImageListItem key={image.mediaId}>
              <img
                src={`${baseURL}/pic/avatar/${image.mediaId}`}
                srcSet={`?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={"sdf"}
                loading="lazy"
              />
            </ImageListItem>
          );
        })
      )}
    </ImageList>
  );
}
