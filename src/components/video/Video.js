import React, { useEffect, useState } from "react";
import "./_video.scss";
import { AiFillEye } from "react-icons/ai";
import request from "../../api";
import moment from "moment"; //for converting time
import numeral from "numeral"; //for converting views
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const Video = ({ video, channelScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  // const _videoId = id?.vedioId || id; //checking if id is an object(contains more than one element), if not then go inside vedioId of id
  const navigate = useNavigate();

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id?.videoId || contentDetails?.videoId || id,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [id, contentDetails]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const handleVideoClick = () => {
    navigate(`/watch/${id?.videoId || contentDetails?.videoId || id}`);
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        {/* <img src={medium.url} alt="" /> */}
        <LazyLoadImage src={medium.url} />
        <span className="video__top__duration">{_duration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      {!channelScreen && (
        <div className="video__channel">
          {/* <img src={channelIcon?.url} alt="" /> */}
          <LazyLoadImage src={channelIcon?.url} />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
