/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G0MaaL8SWAR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { Button } from "@/components/ui/Button"
// import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table"
// import { input } from "@/components/ui/input"

import React, { useRef, useState } from "react";
import { Button, Input, Modal, Spin } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
import axios from "axios";

function FlameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

export default function Component() {
  const addressRef = useRef();
  const [user, setUser] = useState();
  const [videos, setVideos] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  function getChannelIdFromUrl(channelUrl) {
    if (channelUrl.includes("channel/")) {
      return channelUrl.split("channel/")[1];
    } else {
      throw new Error("Invalid channel URL provided.");
    }
  }

  // Example function to make an API call with the extracted channel ID
  const fetchChannelDetails = async (channelUrl) => {
    try {
      let nextPageToken = "";
      const videoDetails = [];
      const channelId = getChannelIdFromUrl(channelUrl);
      // Replace 'YOUR_API_KEY_HERE' with your actual YouTube Data API v3 key
      const apiKey = "AIzaSyCnqNweuZd37APrxuoQMmfIL7ORJduK9zU";
      const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${apiKey}`;

      const response = await axios.get(url);

      console.log("response.data", response.data.items);

      if (!response.data?.items) {
        return false;
      }

      do {
        try {
          const { data } = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
              params: {
                channelId,
                part: "id,snippet",
                maxResults: 50,
                pageToken: nextPageToken,
                key: apiKey
              }
            }
          );

          for (const item of data.items) {
            if (item.id.kind === "youtube#video") {
              const videoId = item.id.videoId;
              const videoData = await axios.get(
                `https://www.googleapis.com/youtube/v3/videos`,
                {
                  params: {
                    id: videoId,
                    part: "snippet,contentDetails,statistics",
                    key: apiKey
                  }
                }
              );

              const video = videoData.data.items[0];
              const subscribers =
                response.data.items[0].statistics.subscriberCount;
              videoDetails.push({
                title: video.snippet.title,
                owner: video.snippet.channelTitle,
                subscribers: subscribers,
                views: video.statistics.viewCount,
                viewScore: subscribers
                  ? parseFloat(video.statistics.viewCount) /
                    parseFloat(subscribers)
                  : "알수없음",
                likes: video.statistics.likeCount,
                comments: video.statistics.commentCount,
                thumbnails: video.snippet.thumbnails.high.url,
                duration: video.contentDetails.duration,
                keywords: video.snippet.tags || [],
                keywordCnt: video.snippet.tags ? video.snippet.tags.length : 0
              });
            }
          }

          nextPageToken = data.nextPageToken;
        } catch (error) {
          console.error("Error listing videos:", error);
          break;
        }
      } while (nextPageToken);
      return { userData: response.data, videoData: videoDetails };
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
    }
  };

  // const listAllVideos = async (channelId) => {
  //   let nextPageToken = "";
  //   const videoDetails = [];
  //   const subscribers = await getChannelDetails(channelId);

  //   return videoDetails;
  // };

  return (
    <div className="bg-[#f8f9fa] min-h-screen w-[100%]">
        <Spin tip="로딩 중..." size="large" spinning={isLoading} className="absolute top-6">
        <main className="p-4 pr-6">
          <section className="mb-8 w-[100%] rounded-md">
            <div className="items-center p-4 bg-white">
              <div className="text-sm flex-3 mb-2">
                유튜브 주소를 입력해주세요
              </div>
              <div className="flex items-center w-[50%] space-x-2 mr-2">
                <Input className="flex-1" ref={addressRef} />
                <Button
                  disabled={user}
                  onClick={async () => {
                    setIsLoading(true);
                    const address = addressRef.current.input.value;
                    const result = await fetchChannelDetails(address);
                    console.log("result", result);
                    if (!result) {
                      alert("알수없는 아이디");
                      setIsLoading(false);
                      return;
                    }
                    const userData = result.userData;
                    const videoData = result.videoData;
                    const user = {
                      title: userData.items[0].snippet.localized.title,
                      thumbnails: userData.items[0].snippet.thumbnails.high.url,
                      description:
                        userData.items[0].snippet.localized.description,
                      subscriberCount:
                        userData.items[0].statistics.subscriberCount,
                      videoCount: userData.items[0].statistics.videoCount,
                      viewCount: userData.items[0].statistics.viewCount
                    };
                    setUser(user);
                    setVideos(videoData);
                    setIsLoading(false);
                  }}
                >
                  확인
                </Button>
                <Button disabled={!user} onClick={() => setUser(undefined)}>
                  재입력
                </Button>
              </div>
            </div>
          </section>
          {user && (
            <>
              <section className="mb-8 rounded-lg flex gap-3">
                <div className="flex items-center justify-between p-4 flex-1 bg-white">
                  <div className="space-y-2">
                    {/* <div className="flex items-center space-x-2">
                <div className="text-lg font-bold">유튜브 정보</div>
                <InfoIcon className="h-4 w-4 text-[#6c757d]" />
              </div> */}
                    {/* <img src="" alt="profile" /> */}
                    <div className="text-lg font-bold">{user.title}</div>
                    <img
                      className="rounded-md"
                      width={248}
                      alt="logo"
                      src={user.thumbnails}
                    />
                    <div className="text-sm">
                      <div className="text-sm font-bold mb-2">채널 설명</div>
                      {user.description}
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                      <div className="text-sm">구독자 수</div>
                      <div className="text-sm font-bold">
                        {user.subscriberCount}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">업로드 영상 개수</div>
                      <div className="text-sm font-bold">{user.videoCount}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">총 조회수</div>
                      <div className="text-sm font-bold">{user.viewCount}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 flex-1 bg-white">
                  <div className="space-y-2">
                    {/* <div className="flex items-center space-x-2">
                <div className="text-lg font-bold">유튜브 정보</div>
                <InfoIcon className="h-4 w-4 text-[#6c757d]" />
              </div> */}
                    <img src="" alt="profile" />
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Subscribers</div>
                      <div className="text-sm font-bold">29</div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="mb-8 bg-white">
                <div className="flex items-center justify-between p-4 bg-white">
                  <div className="flex items-center space-x-2">
                    <FlameIcon className="h-6 w-6 text-[#dc3545]" />
                    <div className="text-lg font-bold">최근 포스트</div>
                  </div>
                  <hr />
                  {/* <Button className="bg-[#007bff] text-white">더 보기</Button> */}
                </div>
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 3
                  }}
                  dataSource={videos}
                  // footer={
                  // <div>
                  //   <b>ant design</b> footer part
                  // </div>
                  // }
                  renderItem={(item) => (
                    <List.Item
                      key={item.title}
                      actions={[
                        <IconText
                          icon={LikeOutlined}
                          text={item.likes}
                          key="list-vertical-like-o"
                        />,
                        <IconText
                          icon={MessageOutlined}
                          text={item.comments}
                          key="list-vertical-message"
                        />,
                        <IconText
                          icon={MessageOutlined}
                          text={item.viewScore}
                          key="list-vertical-message"
                        />
                      ]}
                      extra={
                        <img width={272} alt="thumnail" src={item.thumbnails} />
                      }
                    >
                      <List.Item.Meta
                        // avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                      />
                      <div>
                        <div>관련 키워드</div>
                        <div className="flex gap-2 flex-wrap">
                          {item.keywords.map((val, idx) => {
                            return (
                              <Button
                                onClick={(e) => {
                                  setIsModalOpen(true);
                                  console.log(val);
                                }}
                              >
                                {val}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </section>
              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={() => {
                  setIsModalOpen(false);
                }}
                onCancel={() => {
                  setIsModalOpen(false);
                }}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </>
          )}
        </main>
    </Spin>
      </div>
  );
}
