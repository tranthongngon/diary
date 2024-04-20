import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import * as codeAction from "../../store/actions/codeActions";
import * as CONSTANTS from "../../core/constants";
import "./style.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useMediaQuery, useTheme } from "@mui/material";

export const loadImage = (nameImage) => {
  return require(`../../assets/images/${nameImage}`);
};

const data = [];

for (let index = 1; index < 21; index++) {
  data.push(loadImage(`${index}.jpeg`));
}


const Home = ({ codeDefault }) => {
  const [codeConfirm, setCodeConfirm] = useState("");
  const [checkConfirm, setCheckConfirm] = useState(false);
  const matchesXS = useMediaQuery("(max-width:767px)");
  const dispatch = useDispatch();

  useEffect(() => {
    if (codeDefault) {
      if (codeDefault === CONSTANTS.CODE_DEFAULT) {
        setCheckConfirm(true);
      }
    }
  }, []);

  const onChangeCodeConfirm = (e) => {
    setCodeConfirm(e.target.value);
  };

  const handleConfirmValue = (e) => {
    e.preventDefault();
    if (CONSTANTS.CODE_DEFAULT === codeConfirm) {
      setCheckConfirm(true);
      dispatch(codeAction.getCodeConfirm(codeConfirm));
    } else {
      setCheckConfirm(false);
      dispatch(codeAction.getCodeConfirm(""));
    }
  };

  return (
    <div className="site-content">
      <div className="container">
        {!checkConfirm && (
          <div className="enter-code">
            <h3>Please enter the verification code</h3>
            <div className="form-enter-code flex-box">
              <input type="text" onChange={(e) => onChangeCodeConfirm(e)} />
              <button onClick={(e) => handleConfirmValue(e)}>submit</button>
            </div>
          </div>
        )}
        {checkConfirm && (
          <div className="top-content">
            <h3 className="heading-home" style={{ textAlign: "center" }}>
              Hello cục cưng cụa tuiiii
            </h3>
            <div className="top-content-text">
              <ImageList
                variant="masonry"
                sx={{ width: "100%", height: "auto" }}
                cols={matchesXS ? 2 : 3}
                gap={8}
              >
                {data.map((item, index) => (
                  <ImageListItem key={index}>
                    <img src={item} alt="construct" loading="lazy" />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    codeDefault: state.codeReducer.codeConfirm,
  };
};

export default connect(mapStateToProps)(Home);
