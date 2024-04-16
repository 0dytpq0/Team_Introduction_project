
window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');

    let member = ['박요셉', '이성찬', '박하린', '조민수', '김용', '이효현']

    switch (from) {
        case '박요셉':
            gestbook(0)
            break
        case '이성찬':
            gestbook(1)
            break
        case '박하린':
            gestbook(2)
            break
        case '조민수':
            gestbook(3)
            break
        case '김용':
            gestbook(4)
            break
        case '이효현':
            gestbook(5)
            break
    }

    function gestbook(memberindex) {

        document.getElementById('membername').innerHTML = ''
        document.getElementById('membername').innerHTML = `${member[memberindex]}`

        let support = []  //응원자의 닉네임과 응원글을 저장

        document.querySelector('.sendinfo').addEventListener('click', () => {
            let nickname = document.getElementById('nickname').value; //닉네임내용
            let content = document.getElementById('supporttext').value;//응원글내용

            let arr = { user: nickname, content: content };//각각 받고 object자료로 저장  
            support.push(arr);//object자료를 어레이에 넣는다.

            localStorage.setItem(`supportData${memberindex}`, JSON.stringify(support)); // 로컬 스토리지에 데이터 저장
            let board = document.getElementById('gesthistory');

            let data = JSON.parse(localStorage.getItem(`supportData${memberindex}`)); // supportData 가져오기
            let template = ''; // 템플릿 문자열 초기화
            data.forEach(item => {
                template += `<tr><td>${item.user}</td><td>${item.content}</td></tr>`; // 템플릿 문자열에 데이터 추가
            });
            board.innerHTML = template;
        })

        window.addEventListener('load', () => {
            let supportData = localStorage.getItem(`supportData${memberindex}`);
            if (supportData) {  //로컬스토리지에 supportData가 있으면 아래코드실행
                support = JSON.parse(supportData);
                let board = document.getElementById('gesthistory');
                let template = ''
                support.forEach(item => {
                    template += `<tr><td>${item.user}</td><td>${item.content}</td></tr>`; // 템플릿 문자열에 데이터 추가
                });
                board.innerHTML = template;
            }
        });
    }
});