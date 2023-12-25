import React, { useEffect } from "react";
import "./_channelScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { getVideosByChannel } from "../../redux/actions/videos.action";
import { useParams } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import Video from "../../components/video/Video";
import { getChannelDetails } from "../../redux/actions/channel.action";
import numeral from "numeral";

const ChannelScreen = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  const { videos, loading } = useSelector((state) => state.channelVideos);
  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channel
  );

  return (
    <>
      <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center channelHeader__left">
          <img src={snippet?.thumbnails?.default?.url} alt="" />
          <div className="ml-3 channelHeader__details">
            <h3>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} Subscribers
            </span>
          </div>
        </div>
        <button>Subscribe</button>
      </div>
      <Container>
        <Row className="mt-2">
          {!loading ? (
            videos?.map((video) => (
              <Col md={4} lg={3}>
                <Video video={video} channelScreen />
              </Col>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </Row>
      </Container>
    </>
  );
};

export default ChannelScreen;
