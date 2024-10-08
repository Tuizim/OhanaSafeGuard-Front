$(document).ready(function () {
    $('#loginBtn').click(async function (e) {
        e.preventDefault();
        Loading(1);
        if ($('#TokenInput').val() == "" | $('#loginInput').val() == "" | $('#passwordInput').val() == "") {
            ErrorMessage('Todos os campos devem ser preenchidos')
            $('#loginInput').addClass('is-invalid');
            $('#passwordInput').addClass('is-invalid');
            $('#TokenInput').addClass('is-invalid');
            Loading();
            return
        }
        let token = deriveKeyFromPassword($('#TokenInput').val());
        let login = $('#loginInput').val();
        let password = encryptMessage($('#passwordInput').val(), token);
        let endpoint = `User?login=${login}&password=${password}`;
        await $.ajax({
            type: "GET",
            url: apiUrl + endpoint,
            success: function (response) {
                if (response.success == true) {
                    sessionStorage.setItem('userId', response.response);
                    sessionStorage.setItem('token', token);
                    window.location.href = 'home/index.html';

                }
                else {
                    $('#loginInput').addClass('is-invalid');
                    $('#passwordInput').addClass('is-invalid');
                    $('#TokenInput').addClass('is-invalid');
                    Loading();
                    ErrorMessage(response.message, 'Erro na conta? consulte o admnistrador')
                }
            },
            error: function () {
                Loading();
                ErrorMessage('ServerErro, Fale com o admnistrador');
            }
        });

        Loading();
    });
});
