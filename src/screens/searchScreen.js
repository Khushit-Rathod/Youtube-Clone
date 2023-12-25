import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { getVideosBySearch } from "../redux/actions/videos.action";
import VideoHorizontal from "../components/videoHorizontal/VideoHorizontal";

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [dispatch, query]);
  const { videos, loading } = useSelector((state) => state.searchedVideos);
  return (
    <Container>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal video={video} key={video.id.vedioId} searchScreen />
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};

export default SearchScreen;
