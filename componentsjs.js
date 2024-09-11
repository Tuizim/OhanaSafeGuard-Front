function ErrorMessage(messageError, infoError) {
    SystemMessage('danger', 'ERRO', messageError, infoError)
}

function SuccessMessage(successMessage, successInfo) {
    SystemMessage('success', 'SUCESSO!', successMessage, successInfo)
}

function SystemMessage(typeMessage = 'primary', title = 'Message', message = 'Spam', error = 'Error') {
    $('#sysMessage').remove()
    $('body').append(
        `<div id="sysMessage" class="m-2 position-absolute bottom-0 end-0">
                    <div class="alert alert-${typeMessage}" role="alert">
                    <div class="row">
                    <div class="col">
                        <h4 class="alert-heading" id="teste">
                            ${title}!
                        </h4>
                    </div>
                        <div class="col text-end">
                            <button type="button" class="btn-close" 14 data-bs-dismiss="alert" aria- 15 label="Close"></button> 
                        </div>
                    </div>
                    <p>${message}</p>
                    <hr>
                    <p>${error}</p>
                    </div>
            </div>`
    )
    $('#sysMessage').css('opacity', '0.7');

    setTimeout(function () {
        $('#sysMessage').remove()
    }, 3000)
}

function Loading(state = 0) {
    if (state == 1) {
        $('body').append(`
    <div id="loadingContainer">
        <div class="vh-100 vw-100 bg-black position-absolute start-0 top-0 opacity-75" id="overlay"></div>
        <div class="spinner-border text-primary position-absolute top-50 end-50" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
        `)
    }
    else{
        $('#loadingContainer').remove()
    }
}

function VerifyCredentials() {
    const credentialuser = sessionStorage.getItem("UserCredential");
    const credentialpassword = sessionStorage.getItem("UserCredential");
    if ((credentialuser == null || credentialuser.length == 0) && (credentialpassword == null || credentialpassword.length == 0)) {
        window.location.href = '/Master/login/login.html';

    }
}

function PageHeader() {
    let header = `    
    
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div class="container-fluid">
          <span class="navbar-brand no-select" >Ohana Safe guard</span>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="HomeIndex.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="FiltersIndex.html">Filters</a>
              </li>
            </ul>
            <form class="d-flex d-none" role="search" id="search-autocomplete">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>`;
    $('header').append(header);
}

function ConfirmDelAction() {
    $('body').append(`<div class="vh-100 vw-100 bg-black position-absolute start-0 top-0 opacity-75" id="overlay"></div>
    <div class="bg-white position-absolute top-50 start-50 translate-middle shadow p-3 text-center" id="confirmDelAction">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="rgb(187, 45, 59)" class="bi bi-info-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
            <path
                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0">
            </path>
        </svg>
        <h1>Tem certeza?</h1>
        <p>Se eliminar, perderá completamente esses dados</p>
        <div class="row">
            <div class="col">
                <button class="btn btn-outline-secondary" id="cnclDelBtn">Cancelar</button>
                <button class="btn btn-primary" id="confirmDelBtn">Excluir</button>
            </div>
        </div>
    </div>`)

}

let DeleteId;

$(document).on('click', '#btnDelete', function (e) {
    e.preventDefault();
    ConfirmDelAction();
    let currentLi = $(this).closest('li');
    DeleteId = currentLi.find('#idElement').val();
});

$(document).on('click', '#cnclDelBtn', function (e) {
    e.preventDefault();
    CloseConfirmDel();
});
function CloseConfirmDel(){
    $('#confirmDelAction').remove()
    $('#overlay').remove()
}

function CheckCredentials() {
    let userId = sessionStorage.getItem('userId');
    let token = sessionStorage.getItem('token');
    if (userId == null | token == null) {
        window.location.href = 'index.html';
    }
    else if (userId.length <= 0 | token.length <= 0) {
        window.location.href = 'index.html';
    }
}