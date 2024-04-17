window.addEventListener("DOMContentLoaded", async () => {
  // URL에서 "from" 매개변수 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const from = urlParams.get("from");

  // 멤버 리스트
  let member = ["박요셉", "이성찬", "박하린", "조민수", "김용", "이효현"];
  // "from" 매개변수로부터 멤버의 인덱스 가져오기
  let memberIndex = member.indexOf(from);

  // 게스트북 함수
  const guestbook = async (memberindex) => {
    // 멤버 이름 엘리먼트 찾기
    const memberNameElement = document.getElementById("membername");
    // 멤버 이름 설정
    memberNameElement.innerHTML = member[memberindex];

    // 로컬 스토리지에서 해당 멤버의 응원 데이터 가져오기
    let support =
      JSON.parse(localStorage.getItem(`supportData${memberindex}`)) || [];

    // 게스트북 렌더링 함수
    const renderGuestbook = () => {
      // 게스트북 보드 엘리먼트 찾기
      const board = document.getElementById("guesthistory");
      if (support.length > 0) {
        // 템플릿 초기화
        let template = "";

        // 응원글 데이터 반복하여 템플릿 생성
        support.forEach((item) => {
          template += `<tr>
                        <td>${item.user}</td>
                        <td class='changevalue'>${item.content}</td>
                        <td>
                            <div><img class='removeimg' src="./img/remove.png" alt="remove Image"></div>
                            <div><img class='editimg' src="./img/edit.png" alt="edit Image"></div>
                        </td>
                    </tr>`;
        });
        // 보드에 템플릿 삽입
        board.innerHTML = template;
      } else {
        // 응원글이 없을 때
        const thankyou = `<td id="thankyoutext" style="width:1300px">응원 감사합니다!</td>`;
        board.innerHTML = thankyou;
      }

      // 삭제 버튼 이벤트 리스너 추가
      const removeimg = document.querySelectorAll(".removeimg");
      removeimg.forEach((item, index) => {
        item.addEventListener("click", () => {
          // 클릭된 응원글 삭제 후 로컬 스토리지 업데이트 및 재렌더링
          support.splice(index, 1);
          localStorage.setItem(
            `supportData${memberindex}`,
            JSON.stringify(support)
          );
          renderGuestbook();
        });
      });

      // 수정 버튼 이벤트 리스너 추가
      const editimg = document.querySelectorAll(".editimg");
      editimg.forEach((item, index) => {
        item.addEventListener("click", () => {
          // 수정 영역 생성
          const tr = item.closest("tr");
          let input = tr.querySelector(".changevalue .editinvalue");
          const currentValue = tr.querySelector(".changevalue").innerHTML;
          if (input) {
            return;
          }
          tr.querySelector(".changevalue").innerHTML = `
                      <input class='editinvalue' type="text" value="${currentValue}">
                      <button class='completion'>완료</button>`;
          const completionButton = tr.querySelector(".completion");
          completionButton.addEventListener("click", () => {
            // 수정된 내용 저장 및 로컬 스토리지 업데이트 후 재렌더링
            const input = tr.querySelector(".editinvalue");
            const newValue = input.value;
            support[index].content = newValue;
            localStorage.setItem(
              `supportData${memberindex}`,
              JSON.stringify(support)
            );
            renderGuestbook();
          });
        });
      });
    };

    // 게스트북 렌더링 호출
    renderGuestbook();

    // 응원글 전송 버튼 이벤트 리스너 추가
    const sendInfoButton = document.querySelector(".sendinfo");
    sendInfoButton.addEventListener("click", async () => {
      // 새 응원글 데이터 추가 및 로컬 스토리지 업데이트 후 재렌더링
      const nickname = document.getElementById("nickname").value;
      const content = document.getElementById("supporttext").value;
      if (!content) {
        return;
      }
      support.push({ user: nickname, content: content });
      localStorage.setItem(
        `supportData${memberindex}`,
        JSON.stringify(support)
      );
      renderGuestbook();
    });
  };

  // 멤버 인덱스가 유효한 경우에만 게스트북 호출
  if (memberIndex !== -1) {
    guestbook(memberIndex);
  }
});
