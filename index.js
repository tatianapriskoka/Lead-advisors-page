document.addEventListener('DOMContentLoaded', () => {

    //функция для таймера
    const deadline = new Date(2023, 0o6, 24);

    let timerId = null;

    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');

    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId)
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

        $days.textContent = days;
        $hours.textContent = hours;
        $minutes.textContent = minutes;
        $seconds.textContent = seconds;

    }

    countdownTimer();

    timerId = setInterval(countdownTimer, 1000);



    //функция для валидации формы

    const form = document.querySelector('.footer__form')


    form.addEventListener('submit', sendForm)

    async function sendForm(e) {
        e.preventDefault();

        let error = formValidate(form);

        if (error === 0) {
            let response = await fetch('https://httpbin.org/#/HTTP_Methods/post_post',
                {
                    method: 'POST',
                    body: new FormData(form),

                });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
            } else {
                alert('ошибка')
            }

        } else {
            alert('Введите email')
        }
    }

    function formValidate(form) {
        let error = 0;

        let formReq = document.querySelectorAll('._req');



        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
}

);