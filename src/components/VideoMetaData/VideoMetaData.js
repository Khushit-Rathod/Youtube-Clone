import React, { useEffect } from "react";
import "./_videoMetaData.scss";
import numeral from "numeral";
import moment from "moment";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { getChannelDetails } from "../../redux/actions/channel.action";
import { checkSubscriptionStatus } from "../../redux/actions/channel.action";
// import HelmetCustom from "../HelmetCustom";

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount } = statistics;

  const dispatch = useDispatch();

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  return (
    <div className="videoMetaData py-2">
      {/* <HelmetCustom title={title} description={description} /> */}
      {/*py-2 gives padding of 2 px*/}
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="videoMetaData__top__views">
          {/*d-flex is display flex*/}
          <span>
            {numeral(viewCount).format("0.a")} views •
            {moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="up">
              <MdThumbUp size={26} />
              {numeral(likeCount).format("0.a")}
            </span>
            <span className="down">
              <MdThumbDown size={26} />
            </span>
          </div>
        </div>
      </div>
      <div className="channel">
        <img
          src={channelSnippet?.thumbnails?.default?.url}
          alt=""
          className="rounded-circle mr-3"
        />
        <div className="channel_name">
          <span>{channelTitle}</span>
          <span>
            {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
            Subscribers
          </span>
        </div>
        <button
          className={`btn border-0 p-2 m-2 ${subscriptionStatus && "btn-gray"}`}
        >
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="Show More"
          less="Show Less"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
