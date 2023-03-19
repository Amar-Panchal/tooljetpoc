import "@/_styles/editor/comments.scss";

import React from "react";
import { isEmpty } from "lodash";

import Comment from "./Comment";

import useRouter from "@/_hooks/use-router";

const Comments = ({
  newThread = {},
  appVersionsId,
  socket,
  canvasWidth,
  currentPageId,
}) => {
  const [threads, setThreads] = React.useState([]);
  const router = useRouter();

  async function fetchData() {}

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // Listen for messages
    socket?.addEventListener("message", function (event) {
      if (event.data === "threads") fetchData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    !isEmpty(newThread) && setThreads([...threads, newThread]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newThread]);

  if (isEmpty(threads)) return null;

  return threads
    .filter((thread) => thread.pageId === currentPageId)
    .map((thread) => {
      const { id } = thread;
      return (
        <Comment
          key={id}
          appVersionsId={appVersionsId}
          fetchThreads={fetchData}
          socket={socket}
          threadId={id}
          canvasWidth={canvasWidth}
          {...thread}
        />
      );
    });
};

export default Comments;
