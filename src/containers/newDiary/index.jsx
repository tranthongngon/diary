import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "react-quill/dist/quill.snow.css";
import "react-quill-emoji/dist/quill-emoji.css";
import { Emoji } from "emoji-picker-react";
import "./style.css";
import { module, formats } from "./setup";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  createDiary,
  updateDiary,
  getDiary,
} from "../../core/service/diaryService";
import { v4 as uuidv4 } from "uuid";
import LoadingService from "../../core/common/loadingService";
import { connect } from "react-redux";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const NewDiary = ({ codeDefault }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("happy");
  const [isValidSave, setIsValidSave] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [user] = useAuthState(auth);
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const onChange = (value) => {
    setContent(value);
    if (value !== "" && value !== "<p><br></p>") {
      setIsValidSave(true);
    } else {
      setIsValidSave(false);
    }
  };

  useEffect(() => {
    if (location.state?.uid) {
      setLoading(true);
      getDiary(location.state?.uid).then((res) => {
        setContent(res.data().content);
        setTitle(res.data().title);
        setImagePreview(res.data().urlImage);
        setImage(null);
        setUid(res.id);
        setStatus(res.data().statusMood);
        controlProps(res.data().statusMood);
        setLoading(false);
        setIsValidSave(true);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.uid]);

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleUpload = (uid) => {
      return new Promise((resolve, reject) => {
        const uploadImage = ref(storage, `diary_image/${uid}`);
      const uploadTask = uploadBytesResumable(uploadImage, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => {
          console.log(err);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadImage);
            resolve(url);
          } catch (error) {
            reject(error);
          }
        }
      );
      })
  };
  const controlProps = (item) => ({
    checked: status === item,
    onChange: onChangeStatus,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const onSaveDiary = (
    event,
    userUid,
    userEmail,
    userName,
    userUrl,
    content,
    statusMood
  ) => {
    event.preventDefault();
    let uidv4 = uuidv4();
    setLoading(true);
    if (!uid) {
      handleUpload(uidv4).then(res => {
        createDiary(
          uidv4,
          userUid,
          userEmail,
          userName,
          userUrl,
          title,
          res,
          content,
          statusMood
        ).then((res) => {
          setUid(res.id);
          setLoading(false);
        });
      }).catch(err => {
        console.log(err);
      });
    } else {
      if(image) {
        handleUpload(uid).then(urlImage => {
          updateDiary(uid, {title, urlImage, content, statusMood }).then((res) => {
            setLoading(false);
          });
        })
      }else {
        updateDiary(uid, {title, content, statusMood }).then((res) => {
          setLoading(false);
        });
      }
    }
  };
  const onClear = (event) => {
    event.preventDefault();
    setUid("");
    setStatus("happy");
    controlProps("happy");
    setContent("");
    setImage(null)
    setTitle('')
    setIsValidSave(false);
  };

  const onChangeImage = e => {
    if(e.target.files) {
      setImage(e.target.files[0]);
      setImagePreview('')
    }
  }
  return (
    <div className="site-content">
      {loading && <LoadingService />}
      {!codeDefault && <div className="container">
      <h3 className="not-enter-code">You have not entered the verification code <Link to="/">Go back home</Link></h3></div>}
      {codeDefault && (
        <div className="container">
          <div className="content-edit">
            <div className="choose-mood">
              <FormControl>
                <div>
                  <h2>Choose mood</h2>
                </div>
                <div className="list-mood flex-box">
                  <div className="flex-box">
                    <FormControlLabel
                      value="happy"
                      control={
                        <Radio {...controlProps("happy")} color="success" />
                      }
                      label={`Happy`}
                    />
                    <Emoji unified="1f60a" size="25" />
                  </div>
                  <div className="flex-box">
                    <FormControlLabel
                      value="funny"
                      control={<Radio {...controlProps("funny")} />}
                      label={`Funny`}
                    />
                    <Emoji unified="1f60b" size="25" />
                  </div>
                  <div className="flex-box">
                    <FormControlLabel
                      value="sad"
                      control={<Radio {...controlProps("sad")} />}
                      label={`Sad`}
                    />
                    <Emoji unified="2639-fe0f" size="25" />
                  </div>
                  <div className="flex-box">
                    <FormControlLabel
                      value="angry"
                      control={<Radio {...controlProps("angry")} />}
                      label={`Angry`}
                    />
                    <Emoji unified="1f621" size="25" />
                  </div>
                  <div className="flex-box">
                    <FormControlLabel
                      value="love"
                      control={<Radio {...controlProps("love")} />}
                      label={`Love`}
                    />
                    <Emoji unified="1f970" size="25" />
                  </div>
                  <div className="flex-box">
                    <FormControlLabel
                      value="others"
                      control={<Radio {...controlProps("others")} />}
                      label={`Others`}
                    />
                    <Emoji unified="1f914" size="25" />
                  </div>
                </div>
              </FormControl>
            </div>
            <div className="form-control">
              <h2>Title Diary</h2>
              <textarea value={title} onChange={e => setTitle(e.target.value)} rows="3"></textarea>
            </div>
            <div className="form-control">
              <h2 style={{marginTop: "-10px"}}>Choose Image</h2>
              <input type="file" accept="image/*" onChange={e => onChangeImage(e)}/>
              {(image || imagePreview) && <img className="diary-image" src={image ? URL.createObjectURL(image) : imagePreview} alt="diary-img"/>}
            </div>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={onChange}
              placeholder={"This is just for Nhun cuteeee..."}
              modules={module}
              formats={formats}
            />
          </div>
          <div className="list-btn" style={{ marginTop: "15px" }}>
            <button
              className="btn-save-diary"
              disabled={!isValidSave || !title || (image ? !image : !imagePreview)}
              onClick={(e) =>
                onSaveDiary(
                  e,
                  user.uid,
                  user.email,
                  user.displayName,
                  user.photoURL,
                  content,
                  status
                )
              }
            >
              Save
            </button>
            <button
              className="btn-save-diary"
              style={{ marginLeft: "15px" }}
              onClick={(e) => onClear(e)}
            >
              Clear
            </button>
            {uid && (
              <Link
                className="btn-view-single-diary"
                to={`/single-diary/${uid}`}
              >
                View Diary
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    codeDefault: state.codeReducer.codeConfirm,
  };
};

export default connect(mapStateToProps)(NewDiary);
