export const forms = () => {
    const pageForms = document.querySelectorAll("form"),
          inputs = document.querySelectorAll("input");
          phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach((phoneInput) => {
        phoneInput.addEventListener('input', (e) => {
            phoneInput.value = phoneInput.value.replace(/\D/, '');
        })
    })

    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Наши специалисты свяжутся с Вами в ближайшее время",
        failue: "Что-то пошло не так :-("
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data;

        });

        return await res.text();
    }

    const clearInputs = () => {
        inputs.forEach((input) => {
            input.value = '';
        })
    }

    pageForms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add("status");
            form.appendChild(statusMessage);

            const formData = new FormData(form)

            postData("assets/server.php", formData)
                .then(result => {
                    console.log(result);
                    statusMessage.textContent = message.success;
                })
                .catch((error) => {
                    console.log(error);
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 5000);
                })
        })
    })


}