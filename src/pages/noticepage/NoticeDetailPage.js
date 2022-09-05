import React, { useEffect, useState, useNavigate } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useParams } from "react-router-dom";
import { GetNotice } from "../../api/tf";
import { useAppSelector } from "../../redux/store";

//_mock 더미데이터
import { noticeData } from "../../_mock/noticeData";

// components
import TitleBar from "../../components/TitleBar";
import Footer from "../../components/Footer/Footer";
import DeleteButton from "../../components/NoticePage/DeleteButton";
import ModifyButton from "../../components/NoticePage/ModifyButton";
import Modal from "../../components/Modal/Modal";
import { Pretendard } from "../../components/Text";



export function NoticeDetailPage() {
  const [notice, setNotice] = useState({});
  let { id } = useParams();

// 공지 상세 조회 api
  useEffect(()=>{
    GetNotice(id)
    .then(res => {
      console.log("공지 상세 조회 성공", res);
      setNotice(res.data.data);
    })
    .catch(err => {
      console.log("공지 상세 조회 실패", err);
    });
  },[])

// 유저 tf 여부
const isTf = useAppSelector(state => state.user.isTf)

// 수정 페이지 이동
function Update(e) {
  window.location.href = "/update";
}

// 모달
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Pretendard>
        <TitleBar>
          <span style={{ color: "var(--green1)" }}>공</span>
          <span style={{ color: "var(--green2)" }}>지</span>
          <span style={{ color: "var(--green3)" }}>사항</span>
        </TitleBar>
        <NoticeTitle>
          <p class="title">{"[공지]" + " " + notice.title}</p>
        </NoticeTitle>
        <Line />
        <NoticeInfo>
          <div style={{ display: "flex", float: "left" }}>
            <p class="writer">TF 팀</p>
          </div>
          <div style={{ display: "flex", float: "right" }}>
            <p class="createdAt">{notice.created_at}</p>
          </div>
        </NoticeInfo>
        <NoticeContent>
          <p class="content">{notice.content}</p>
        </NoticeContent>
        <Line style={{ marginBottom: "5%" }} />
      </Pretendard>
      {isTf ? 
      <ButtonBox>
        <DeleteButton onClick={openModal}>삭제</DeleteButton>
        <ModifyButton onClick={Update}>수정</ModifyButton>
      </ButtonBox> : null}
      <Modal
        open={modalOpen}
        close={closeModal}
        header="공지 삭제"
        subtext="삭제 된 글은 다시 불러올 수 없습니다."
        maintext="공지 글을 삭제하시겠습니까?"
      ></Modal>
      <Footer />
    </>
  );
}

const NoticeTitle = styled.div`
  margin: 8% 10% 3%;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-align: justify;
`;
const NoticeInfo = styled.div`
  box-sizing: border-box;
  height: 10px;
  margin: 3% 10% 6%;
  font-family: "Pretendard";
  color: var(--gray2);
  font-weight: 300;
  font-size: 12px;
`;
const NoticeContent = styled.div`
  margin: 0 10% 5%;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: justify;
  line-height: 22px;
`;
const Line = styled.div`
  border: 1px solid var(--gray);
  width: 85%;
  margin: 0 auto;
`;

const ButtonBox = styled.div`
  display: flex;
  margin-bottom: 10%;
`;

export default NoticeDetailPage;
