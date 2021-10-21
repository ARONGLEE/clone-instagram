import React, { useState } from "react";
import Input from "../elements/Input";
import Image from "../elements/Image";
import Button from "../elements/Button";
import styled from "styled-components";
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import axios from "axios";

function PostWrite(props) {
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const fileUploadHandler=()=>{
    const formData = new FormData();
    formData.append("image", setSelectedImage, setSelectedImage.name);
    axios.post("api/posts/create", formData)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  };


  return (
    <React.Fragment>
      <Grid
        width="30%"
        border="1px solid #DCDCDC"
        height="100%"
        margin="0px auto"
        padding="0px 0px"
        bg="#ffffff"
      >
        <Text bold center size="16px" padding="12px">
          새 게시물 만들기
        </Text>
        <Grid width="100%" border="1px solid #DCDCDC" padding="40px 40px">
          <Grid is_flex>
            <Image></Image>
            <Text padding="10px" bold>
              {props.user_info.user_name}
            </Text>
          </Grid>
          <form
            action="/apt/posts/img"
            method="post"
            enctype="multipart/form-data"
          >
            <Grid padding="30px 0 0 0">
              <Input
                type="file"
                name="img"
                multiple
                width="100%"
                _onChange={imageChange}
              />

              {selectedImage && (
                <div style={styles.preview}>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    style={styles.image}
                    alt="Thumb"
                  />
                  <button onClick={removeSelectedImage} style={styles.delete}>
                    첨부 이미지 삭제
                  </button>
                </div>
              )}
            </Grid>
            <Grid padding="40px 0">
              <Input
                type="text"
                name="title"
                placeholder="문구입력..."
                width="100%"
                height="150px"
              />
            </Grid>
            <Button type="submit" _onClick={fileUploadHandler}>공유하기</Button>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

PostWrite.defaultProps = {
  user_info: {
    user_name: "mingab",
    // user_profile: 'https://filminvalle.com/wp-content/uploads/2019/10/User-Icon.png'
  },
  image_url:
    "https://hddesktopwallpapers.in/wp-content/uploads/2015/09/wheat-field-picture.jpg",
  contents: "배경 내용이 들어가요",
  comment_cnt: 10,
  insert_dt: "2021-09-30 10:00:00",
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "rgb(239,239,239)",
    color: "black",
    border: "none",
  },
};

export default PostWrite;
