import React, { useEffect } from "react";
import "./_subscriptionScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionChannel } from "../../redux/actions/videos.action";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";

const SubscriptionScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptionChannel());
  }, [dispatch]);

  const { videos, loading } = useSelector((state) => state.subscribedChannel);

  return (
    <Container fluid>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal video={video} key={video.id} subScreen />
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};

export default SubscriptionScreen;
