import {
  getFirestore,
  query,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  set,
  addDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  clickCountState,
  commentState,
  communityState,
  isVotedState,
  loginState,
  userState,
  voteState,
} from "../recoil/recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import LogInModal from "../modal/login";
import { useEffect, useState } from "react";
import CommentSec from "./commentSec";
import CommentPart from "./commentPart";
import { useRouter } from "next/router";
import styles from "./comment.module.css";

const Comment = () => {
  const auth = getAuth();
  const router = useRouter();
  const db = getFirestore();
  const [comment, setComment] = useState("");
  const commentSort = useRecoilValue(commentState);
  const logIn = useRecoilValue(loginState);
  const [user, setUser] = useRecoilState(userState);
  const [clickCount, setClickCount] = useRecoilState(clickCountState);
  const vote = useRecoilValue(voteState);
  const community = useRecoilValue(communityState);
  const [submit, setSubmit] = useState(false);
  const isVoted = useRecoilValue(isVotedState);

  useEffect(() => {
    if (logIn) {
      userFetch();
      console.log("유저정보임");
      console.log(user);
      document.activeElement.blur();
    }
  }, [logIn]);

  const clickHandler = () => {
    if (!logIn) {
      setClickCount(true);
    }
  };

  const commentFetch = async () => {
    if (logIn) {
      const q = setDoc(
        // 파이어베이스 user/wroteComment 추가
        doc(
          db,
          "user",
          `${auth.currentUser.uid}`,
          "wroteComment",
          `${router.query.id}`
        ),
        {
          article: `${comment}`,
          like: 0,
          story: `${router.query.id}`,
          wrote: new Date(),
        }
      );
      console.log(q);
      console.log("쿼리 출력!");
      console.log(comment);
      console.log(community);
      console.log(user);
      await addDoc(
        // 파이어베이스 아젠다부분에 댓글 추가
        collection(db, `${community}`, `${router.query.id}`, `${commentSort}`),
        {
          article: `${comment}`,
          author: auth.currentUser.uid,
          authorLevel: user.level,
          authorName: user.name,
          hide: false,
          like: 0, // 나중에 반응형으로 교체해야함
          wrote: new Date(),
          id: auth.currentUser.uid,
        }
      );
      console.log(comment);
      console.log(community);
      console.log("답변완료!");
      setComment("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmit((prev) => !prev);
    commentFetch();
    // await setDoc(doc(db, "user", `${auth.currentUser.uid}`, ),{})
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandler(e);
    }
  };
  const userFetch = async () => {
    //
    let q = query(doc(db, "user", `${auth.currentUser.uid}`));
    let snapShot = await getDoc(q);
    console.log(snapShot.data());
    const a = {
      name: snapShot.data().nickname,
      age: snapShot.data().age,
      gender: snapShot.data().gender,
      level: snapShot.data().level,
      ...snapShot.data(),
    };
    console.log(a);

    setUser(a);
  };

  return (
    <div>
      <CommentSec />
      <CommentPart isSubmit={submit} />
      {/*제출 상태를 넘겨서 제출 할 때마다 commentPart를 리랜더링하게 한다. */}
      <div>
        <form onSubmit={submitHandler} className={styles.submit}>
          <input
            type="text"
            className={styles.input}
            placeholder={
              logIn
                ? isVoted
                  ? vote == commentSort
                    ? `${auth.currentUser.displayName}님의 소중한 의견이 필요합니다!`
                    : `${auth.currentUser.displayName}님은 다른 입장에 투표를 하였습니다!`
                  : `${auth.currentUser.displayName}님, 먼저 투표를 진행해주세요!`
                : "로그인을 해주세요."
            }
            onChange={onChangeHandler}
            value={comment}
            onKeyUp={onKeyPress}
            onFocus={clickHandler}
            disabled={
              logIn
                ? isVoted
                  ? vote == commentSort
                    ? false
                    : true //투표상태랑 내가 작성하려는 comment부분이랑 다를 때
                  : true // 투표를 안했을 때
                : false //로그인을 안했을 때
            }
          />
          <button className={styles.button}>게시</button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
