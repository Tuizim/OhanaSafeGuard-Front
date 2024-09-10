const apiUrl = 'https://ohanasafeguard-fceyhucrdbatc2bz.brazilsouth-01.azurewebsites.net/'
const userId = sessionStorage.getItem('userId');
$(document).ready(function () {
    CheckCredentials();
    PageHeader();
    LoadPage();
});


$(document).on('click', '#btnEdit', async function (e) {
    e.preventDefault();
    const idElement = $(this).closest('li').find('#idElement').val();
    let name = await FindFilter(idElement);
    FormPopUp({ id: idElement, nome:name});
});

$('#btnNew').click(function (e) {
    e.preventDefault();
    FormPopUp({});
});

$(document).on('click', '#closeForm', function (e) {
    e.preventDefault();
    $('#spanForm').remove();
    $('#overlay').remove();
    LoadPage();
});

$(document).on('click', '#btnSave', function (event) {
    event.preventDefault();
    let name = $('#nomeInput').val();
    SaveFilter({ name: name });
});

//EXCLUIR
$(document).on('click', '#confirmDelBtn', async function (e) {
    Loading(1);
    e.preventDefault();
    let endpoint = 'Filter'
    let data = {
        id: DeleteId,
        name: null,
        userId: userId,
    }
    $.ajax({
        type: "DELETE",
        url: apiUrl + endpoint,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json',
        success: function (response) {
            if (response.success == true) {
                SuccessMessage(response.message)
                Loading();
                CloseConfirmDel();
                LoadPage();
            }
            else {
                ErrorMessage(response.message)
                Loading();
                LoadPage();
            }
        }
    });
})

async function HomePopulate(dataobject = null) {
    var html = '';
    if (dataobject == null) {
        return html
    }
    for (i = 0; i < dataobject.length; i++) {

        html += `<li class="list-group-item">
                    <div class="row">
                        <div class="col-1 d-none d-lg-block">
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">Id</span>
                                <input type="text" class="form-control" id="idElement" value="${dataobject[i].id}" disabled>
                            </div>
                        </div>
                        <div class="col text-start mt-auto mb-auto">
                            <h4>${dataobject[i].name}</h4>
                        </div>
                        <div class="col-4 col-lg-2">
                            <div class="row d-flex justify-content-end">
                                <button class="btn btn-primary col m-1 col-lg-3" id="btnEdit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </button>
                                <button class="btn btn-danger col m-1 col-lg-3" id="btnDelete">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>`;
    }
    $('#listItens').empty().append(html);
}

function FormPopUp({ id = '', nome = '' }) {
    const overlay = '<div class="vh-100 vw-100 bg-black position-absolute start-0 top-0 opacity-75" id="overlay"></div>'
    var html =
        `<div class="p-4 position-absolute top-50 start-50 translate-middle w-75" id="spanForm">
            <div class="container bg-body-tertiary h-50 shadow" style="border-radius: 16px;">
                <form class="p-lg-5 p-3">
                    <div class="text-end">
                        <button class="btn-close" id="closeForm"></button>
                    </div>
                    <div class="row">
                        <div class="mb-3 col-lg-6 d-none">
                            <label for="idLabel" class="form-label">Id</label>
                            <input type="text" class="form-control" id="idLabel" value="${id}">
                        </div>
                        <div class="mb-3 col">
                            <label for="nomeInput" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nomeInput" tabindex="1" value="${nome}">
                        </div>
                        <div class="col-12 text-center mt-5">
                            <button class="btn btn-success w-50" tabindex="2" id="btnSave"> Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>`;
    $('body').append(overlay)
        .append(html);
}

async function LoadPage() {
    Loading(1);
    let endpoint = `Filter/UserId?userId=${userId}`
    let data = await new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: apiUrl + endpoint,
            success: function (response) {
                if (response.success == true) {
                    return resolve(response.response);
                }
                return reject(null);
            },
            error: function () {
                ErrorMessage('Consulte o admnistrador');
                reject(null);
            }

        });
    })
    await HomePopulate(data);
    Loading();
}

function SaveFilter({name }) {
    let data = {
        id: $('#idLabel').val(),
        name: name,
        userId: userId,
    }
    let endpoint = 'Filter';
    $.ajax({
        type: "POST",
        url: apiUrl + endpoint,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json',
        success: function (response) {
            if (response.success == true) {
                SuccessMessage(response.message);
            }
            else {
                ErrorMessage(response.message);
            }
        },
        error: function () {
            ErrorMessage('Consulte o admnistrador');
        }
    });
}

async function FindFilter(id) {
    let endpoint = `Filter/UserId/FilterId?id=${id}&userId=${userId}`
    let name = await new Promise((resolve,reject) => {
        $.ajax({
            type: "GET",
            url: apiUrl + endpoint,
            success: function (response) {
                return resolve(response.response.name)
            },
            error: function(){
                ErrorMessage('Consulte o admnistrador');
               return reject(null)
            }
        });
    })
    return name;
}