import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingService from "../../core/common/loadingService";
import "react-quill-emoji/dist/quill-emoji.css";
import "react-quill/dist/quill.snow.css";
import { getDiary, getDiaries } from "../../core/service/diaryService";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./style.css";
import Like from '../../assets/images/smile.jpeg';

export default function SingleDiary() {
  const [loading, setLoading] = useState(false);
  const [diary, setDiary] = useState();
  const [diaries, setDiaries] = useState([]);
  const [user] = useAuthState(auth);
  const params = useParams();
  useEffect(() => {
    setLoading(true);
    getDiary(params.uid).then((res) => {
      setDiary(res.data());
      setLoading(false);
    });
    getDiaries(user.email).then((res) => {
      setDiaries(
        res
          .filter((doc) => doc.id !== params.uid)
          .map((doc) => ({ ...doc.data(), uid: doc.id }))
      );
    });
  }, [params, user]);

  return (
    <div className="site-content">
      {loading && <LoadingService />}
      <div className="container">
        {!diary && !diaries.length > 0 && (
          <div className="empty">
            <img src={Like} alt="empty" />
          </div>
        )}
        {diary && (
          <div className="content-diary">
            <div className="single-diary-thumb">
              <img src={diary.urlImage} alt={diary.title} />
            </div>
            <div className="single-diary-text">
              <h1 className="single-diary-title">{diary.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: diary?.content }}></div>
              <div className="single-diary-author flex-box">
                <Link to="/profile" className="flex-box single-author">
                  <img src={diary?.userUrl} alt={diary?.userName} />
                  <p>{diary?.userName}</p>
                </Link>
                <p className="single-diary-author-status">
                  {diary?.statusMood}
                </p>
              </div>
            </div>
          </div>
        )}
        {diaries.length > 0 && (
          <div className="related-post">
            <h3 className="related-title">Nhunn cutee may also be interested</h3>
            <div className="related-list flex-box flex-box-4i flex-space-20">
              {diaries.length > 0 &&
                diaries.slice(0, 4).map((doc, index) => (
                  <div className="related-item" key={index}>
                    <div className="related-single">
                      <div className="related-single-thumb">
                        <Link to={`/single-diary/${doc.uid}`}><img src={doc.urlImage} alt={doc.title} /></Link>
                      </div>
                      <h3 className="related-single-title line-clamp line-clamp-2">
                        <Link to={`/single-diary/${doc.uid}`}>{doc.title}</Link>
                      </h3>
                      <div className="related-bottom flex-box">
                        <p className="status">{doc.statusMood}</p>
                        <Link to={`/single-diary/${doc.uid}`}>read more</Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
