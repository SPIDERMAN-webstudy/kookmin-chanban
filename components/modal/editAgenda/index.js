import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { loginState, userState } from "../../recoil/recoil";

import { getAuth, signInWithCustomToken, updateProfile } from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditAgenda = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [warningModalIsOpen, setWarningModalIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const auth = getAuth();
  const router = useRouter();
  const imageHandler = ({ target: { files } }) => {
    if (files.length === 1) {
      if (files[0].size >= 2 * 1024 * 1024) {
        return alert("2MB 미만의 이미지만 올리 실 수 있습니다");
      }
      setImage(files[0]);
    }
  };

  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const db = getFirestore();
    const storage = getStorage();

    //storage에 이미지 추가
    const storageRef = ref(
      storage,
      `thumbnail/${auth.currentUser.uid}_${new Date().getTime()}.jpg`
    );
    await uploadBytes(storageRef, image).then((snapshot) => {
      console.log("Uploaded a or file!");
    });
    const imageURL = await getDownloadURL(storageRef);

    // userAgenda에 추가
    const createdAt = new Date();
    const agenda = {
      uid: auth.currentUser.uid,
      author: user[0].name,
      title: event.target.title.value,
      subTitle: event.target.subTitle.value,
      article: event.target.article.value,
      category: category,
      created: createdAt,
      hide: false,
      numAgree: 0,
      numAlternative: 0,
      numDisagree: 0,
      numVote: 0,
      numComment: 0,
      removed: null,
      imageUrl: imageURL,
    };
    const userAgendaCollection = collection(db, "userAgenda");
    const { id } = await addDoc(userAgendaCollection, agenda);
    // userAgneda 하위 콜렉션은 [id]에서 해줄거임

    // user에 wroteAgenda 추가
    const wroteAgendaCollection = collection(
      db,
      "user",
      auth.currentUser.uid,
      "wroteAgenda"
    );
    const agendaInfo = {
      category: category,
      title: event.target.title.value,
      wrote: createdAt,
      story: id,
    };
    await addDoc(wroteAgendaCollection, agendaInfo);
    setEditModalIsOpen(false);
    router.push(`/userAgenda/${id}`);
  };

  return (
    <>
      <button
        onClick={
          auth.currentUser != null
            ? () => {
                setEditModalIsOpen(true);
              }
            : () => {
                setWarningModalIsOpen(true);
              }
        }
      >
        새 글
      </button>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
      >
        <button onClick={() => setEditModalIsOpen(false)}>뒤로</button>
        <form onSubmit={onSubmitHandler}>
          <div>카테고리</div>
          <select value={category} onChange={categoryHandler}>
            <option value="정치">정치</option>
            <option value="연애">연애</option>
            <option value="진로">진로</option>
          </select>
          <div>제목</div>
          <input type="text" name="title"></input>
          <div>부제목</div>
          <input type="text" name="subTitle"></input>
          <div>본문</div>
          <textarea name="article"></textarea>
          <br></br>
          <input type="file" name="image" onChange={imageHandler}></input>
          <button type="submit">등록</button>
        </form>
      </Modal>
      <Modal
        isOpen={warningModalIsOpen}
        onRequestClose={() => setWarningModalIsOpen(false)}
      >
        <button onClick={() => setWarningModalIsOpen(false)}>닫기</button>
        <form onSubmit={onSubmitHandler}>
          <div>3초만에 시민찬반에 참여해보세요!</div>
          <div>로그인</div>
        </form>
      </Modal>
    </>
  );
};

export default EditAgenda;
