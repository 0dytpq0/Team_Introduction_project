
window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');

    let member = ['박요셉', '이성찬', '박하린', '조민수', '김용', '이효현']

    switch (from) {
        case '박요셉':
            guestbook(0)
            break
        case '이성찬':
            guestbook(1)
            break
        case '박하린':
            guestbook(2)
            break
        case '조민수':
            guestbook(3)
            break
        case '김용':
            guestbook(4)
            break
        case '이효현':
            guestbook(5)
            break
    }
    function guestbook(memberindex) {

        document.getElementById('membername').innerHTML = ''
        document.getElementById('membername').innerHTML = `${member[memberindex]}`

        let support = []  //응원자의 닉네임과 응원글을 저장

        document.querySelector('.sendinfo').addEventListener('click', () => {
            let nickname = document.getElementById('nickname').value; //닉네임내용
            let content = document.getElementById('supporttext').value;//응원글내용

            let arr = { user: nickname, content: content };//각각 받고 object자료로 저장  
            support.push(arr);//object자료를 어레이에 넣는다.

            localStorage.setItem(`supportData${memberindex}`, JSON.stringify(support)); // 로컬 스토리지에 데이터 저장
            let board = document.getElementById('guesthistory');

            let data = JSON.parse(localStorage.getItem(`supportData${memberindex}`)); // supportData 가져오기
            location.reload();
            if (data.length > 0) {
                let template = ''; // 템플릿 문자열 초기화
                let [removeimgname, edditimgname] = ['remove.png', 'edit.png']
                data.forEach(item => {
                    template += `<tr><td>${item.user}</td><td>${item.content}</td>
                        <td>
                        <div>
                        <img class='removeimg' src="./img/${removeimgname}" alt="remove Image">
                        </div>
                        <div>
                        <img class='editimg' src="./img/${edditimgname}" alt="edit Image">
                        </div>
                        </td>
                        </tr>`; // 템플릿 문자열에 데이터 추가
                });
                board.innerHTML = template;
            } else {
                let thankyou = `<td id="thankyoutext" style="width:1300px">응원 감사합니다!</td>`;
                board.innerHTML = thankyou
            }
            let removeimg = document.querySelectorAll('.removeimg');
            removeimg.forEach((item, index) => {
                item.addEventListener('click', () => {
                    // 클릭된 이미지의 부모 요소인 <tr>을 삭제합니다.
                    console.log(support);
                    support.splice(index, 1);
                    localStorage.setItem(`supportData${memberindex}`, JSON.stringify(support)); // 변경된 데이터를 로컬 스토리지에 저장

                    // 삭제 후에는 해당 요소를 다시 렌더링합니다.
                    guestbook(memberindex);
                    location.reload();
                });
            });

            let editimg = document.querySelectorAll('.editimg');
            editimg.forEach((item, index) => {
                item.addEventListener('click', () => {
                    // location.reload();
                    let tr = item.closest('tr');
                    let input = tr.querySelector('.changevalue input');
                    let currentValue = tr.querySelector('.changevalue').innerHTML;
                    tr.querySelector('.changevalue').innerHTML = `<input class='editinvalue' type="text" value="${currentValue}">
                    <button class='completion'>완료</button>`;
                    if (input) {
                        return
                    }
                    

                    let completionButton = tr.querySelector('.completion');
                    completionButton.addEventListener('click', () => {
                        let tr = item.closest('tr');
                        let input = tr.querySelector('.changevalue input');
                        let currentValue = input.value;
                        // 입력 필드로부터 값을 가져와서 수정 셀로 변경
                        tr.querySelector('.changevalue').innerHTML = `<td class='changevalue'>${currentValue}</td>`;
                    });
                })
            })

        })


        window.addEventListener('load', () => {
            let supportData = localStorage.getItem(`supportData${memberindex}`);
            if (supportData) {  //로컬스토리지에 supportData가 있으면 아래코드실행
                support = JSON.parse(supportData);
                let board = document.getElementById('guesthistory');
                if (support.length > 0) {
                    let template = '';
                    let [removeimgname, edditimgname] = ['remove.png', 'edit.png']

                    support.forEach(item => {
                        template += `<tr>
                        <td>${item.user}</td>
                        <td class='changevalue'>${item.content}</td>
                        <td>
                        <div>
                        <img class='removeimg' src="./img/${removeimgname}" alt="remove Image">
                        </div>
                        <div>
                        <img class='editimg' src="./img/${edditimgname}" alt="edit Image">
                        </div>
                        </td>
                        </tr>`; // 템플릿 문자열에 데이터 추가
                    });
                    board.innerHTML = template;
                } else {
                    let thankyou = `<td id="thankyoutext" style="width:1300px">응원 감사합니다!</td>`;
                    board.innerHTML = thankyou
                }
                let removeimg = document.querySelectorAll('.removeimg');
                removeimg.forEach((item, index) => {
                    item.addEventListener('click', () => {
                        support.splice(index, 1);
                        localStorage.setItem(`supportData${memberindex}`, JSON.stringify(support)); // 변경된 데이터를 로컬 스토리지에 저장
                        // 삭제 후에는 해당 요소를 다시 렌더링합니다.
                        guestbook(memberindex);
                        location.reload();
                    });
                });

                let editimg = document.querySelectorAll('.editimg');
                editimg.forEach((item, index) => {
                    item.addEventListener('click', () => {
                        let tr = item.closest('tr');
                        let input = tr.querySelector('.changevalue input');
                        let currentValue = tr.querySelector('.changevalue').innerHTML;
                        if (input) {
                            return
                        }
                        tr.querySelector('.changevalue').innerHTML = `
                        <input class='editinvalue' type="text" value="${currentValue}">
                        <button class='completion'>완료</button>`;

                        let completionButton = tr.querySelector('.completion');
                        completionButton.addEventListener('click', () => {
                            let tr = item.closest('tr');
                            let input = tr.querySelector('.changevalue input');
                            let currentValue = input.value;
                            // 입력 필드로부터 값을 가져와서 수정 셀로 변경
                            tr.querySelector('.changevalue').innerHTML = `
                <td class='changevalue'>${currentValue}</td>`;
                            support[index].content = currentValue
                            localStorage.setItem(`supportData${memberindex}`, JSON.stringify(support)); 
                            guestbook(memberindex);


                        });
                    })
                })


            }


        });
    }
});