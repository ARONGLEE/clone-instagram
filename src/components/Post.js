import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, Image, Text } from "../elements";
import Modal from "./Modal";
import CommentWrite from "./CommentWrite";
import { postActions } from "../redux/modules/post";
import profile from "../shared/profile.PNG";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import SendIcon from "@mui/icons-material/Send";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CommentList from "./CommentList";
import { commentActions } from "../redux/modules/comment";

const Post = React.memo((props) => {
  // console.log("profile",profile)
  const dispatch = useDispatch();
  const postId = props.postId;
  const likeCnt = props.likeCnt;
  console.log("likeCnt", likeCnt);
  // const likeState2 = props.likeState
  // console.log("likeState",likeState2)

  const likeToggle = () => {
    dispatch(postActions.LikeToggleAPI(postId, props.heartLike));
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const [is_like, setIs_like] = React.useState(false);

  // const [postId, setPostId] = React.useState(props.postId)

  // console.log("postId",props.postId)
  // console.log("is_like",is_like)
  // if (like) {
  //   dispatch(postActions.likeToggleAPI(props.postId, like))
  // const [likeState, setlikeState] = React.useState(false);

  const post_like = useSelector((state) => state.post.post_like);
  console.log("post_like.postId", post_like.postId);

  let likeState = false;
  for (let i = 0; i < post_like.length; i++) {
    // console.log("post_like",post_like[i].postId)
    if (postId === post_like[i].postId) {
      likeState = true;
    }
  }

  // useEffect(()=>{
  //   // let likeState = false;
  //   for(let i=0; i<post_like.length; i++) {
  //     // console.log("post_like",post_like[i].postId)
  //     if (postId === post_like[i].postId) {
  //       setlikeState(true);
  //     } else {
  //       setlikeState(false);
  //     }
  //   }
  // }, [postId, post_like]);

  console.log(`${postId} likeState`, likeState);

  // 댓글가져오기
  const writeComment = useSelector((state) => state.comment.list);

  console.log("props.likeState", props.likeState);

  const ip = "http://13.125.63.44";
  const img = props.postImg;
  const imageUrl = ip + img;

  const deletePost = () => {
    dispatch(postActions.deletePostDB(props.postId));
    // console.log(props.postId);
  };

  const comment_list = useSelector((state) => state.comment.comment_list);
  //console.log(comment_list);

  React.useEffect(() => {
    dispatch(commentActions.getCommentDB(props.postId));
  }, []);

  return (
    <React.Fragment>
      <Border>
        {/* 프로필사진, 아이디, 설정버튼 */}
        <Grid
          is_flex
          justifyContent="space-between"
          height="41px"
          padding="5px 4px 5px 8px"
        >
          <Grid is_flex width="auto">
            <Profile />
            <Text bold size="14px" margin="6px">
              {props.userId}
            </Text>
          </Grid>
          <Grid is_flex justifyContent="flex-end" width="25%" margin="0px 10px">
            {props.is_me && (
              <MdOutlineDeleteOutline
                style={{ fontSize: "16px", margin: "0px 5px" }}
                cursor="pointer"
                onClick={deletePost}
              />
            )}
            <Button
              width="20px"
              size="16px"
              padding="0px"
              bg="#fff"
              color="#000"
              className="openModalBtn"
              _onClick={() => {
                setModalOpen(true);
              }}
            >
              ···
            </Button>
          </Grid>
        </Grid>

        {/* 사진 */}
        <Grid>
          <Image shape="rectangle" src={imageUrl} />
        </Grid>

        {/* 하트, 상세페이지, 보내기 아이콘 */}
        <Grid padding="3px">
          {likeState ? (
            <IconButton
              onClick={() => {
                // setIs_like(false);
                dispatch(postActions.deleteToggleAPI(postId, false));
              }}
            >
              <FavoriteIcon style={{ color: "red" }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                // setIs_like(true);
                dispatch(postActions.addLikeAPI(postId, true));
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}

          {/* {likeState ?
            (<IconButton
              onClick={() => {
                // setIs_like(false);
                dispatch(postActions.LikeToggleAPI(postId, false));
              }}
            >
              <FavoriteIcon style={{color:"red"}} />
            </IconButton>)
            :
            (<IconButton
              onClick={() => {
                // setIs_like(true);
                dispatch(postActions.LikeToggleAPI(postId, true));
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>)
          } */}

          <IconButton>
            <ModeCommentIcon />
          </IconButton>

          <IconButton>
            <SendIcon />
          </IconButton>
        </Grid>
        {/* 좋아요, 내용, 시간 */}
        <Text margin="0px 8px" bold size="14px" style={{ fontWeight: "600" }}>
          좋아요 {is_like ? likeCnt + 1 : likeCnt}개{/* 좋아요 {likeCnt}개 */}
        </Text>
        <Div>
          <Text bold size="12px" margin="8px 8px">
            {props.userId}
          </Text>
          <Text size="14px" margin="7px 0px">
            {props.postContents}
          </Text>
        </Div>
        {/* <CommentList /> */}
        <Div>
          <Text bold size="12px" margin="8px 8px">
            {props.userId}
          </Text>
          <Text size="14px" margin="7px 0px">
            {comment_list.comment}
          </Text>
        </Div>

        {/* 댓글 */}
        {/* {writeComment.map((p, idx) => <div key={p.id}> {p[idx]} </div>)} */}
        {writeComment}

        {/* 댓글쓰기 */}
        <CommentWrite postId={postId} />
      </Border>

      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </React.Fragment>
  );
});

// 부모에서 프롭스 못받을때 오류나 화면 깨짐 방지
Post.defaultProps = {
  userId: "jinsik",
  // user_profile: 'https://filminvalle.com/wp-content/uploads/2019/10/User-Icon.png'
  postImg:
    "https://hddesktopwallpapers.in/wp-content/uploads/2015/09/wheat-field-picture.jpg",
  postContents: "배경 내용이 들어가요",
  comment_cnt: 0,
  insert_dt: "2021-09-30 10:00:00",
  is_like: true,
};

export default Post;

const Border = styled.div`
  width: 614px;
  margin: auto;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  margin-bottom: 20px;
  background-color: #fff;
`;

const Profile = styled.div`
  background-image: url("https://www.mokhtsr.com/wp-content/uploads/2019/10/3.jpg");
  /* background-color: red; */
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: cover;
  background-position: center;
  background-size: cover;
  margin: 4px;
`;

const Div = styled.div`
  display: flex;
`;
