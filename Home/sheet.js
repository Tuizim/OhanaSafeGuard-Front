$(document).ready(function () {
    PageHeader()
    data = [
        {
            id: 1,
            name: "Netflix",
            filter: "Streaming"
        },
        {
            id: 2,
            name: "Amazon",
            filter: "Loja"
        }
    ];
    $('#listItens')
        .empty()
        .append(homePopulate(data));
});

$('#filterField').change(function (e) {
    filter($('#filterField').val())
});



$(document).on('click', '#btnEdit', function (e) {
    e.preventDefault();
    const idElement= $(this).closest('li').find('#idElement').val();
    formPopUp({id:idElement});
});

$('#btnNew').click(function (e) {
    e.preventDefault();
    formPopUp({id:idElement});
});

$(document).on('click', '#closeForm', function (e) {
    e.preventDefault();
    $('#spanForm').remove();
    $('#overlay').remove();
});

$(document).on('click', '#btnSave', function (event) {
    data = {
        id: $('#idLabel').val(),
        name: $('#nomeInput').val(),
        email: $('#emailInput').val(),
        password: $('#senhaInput').val(),
        url: $('#urlInput').val(),
        filter: $('#filterField').val()
    }
});

function formPopUp({ id = -1, nome = '', email = '', senha = '', url = '', dataOptionList = null }) {
    let options = selectPopulate(dataOptionList)
    const overlay = '<div class="vh-100 vw-100 bg-black position-absolute start-0 top-0 opacity-75" id="overlay"></div>'
    let formSpan =
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
                    <div class="mb-3 col-lg-6">
                        <label for="nomeInput" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nomeInput" tabindex="1" value="${nome}">
                    </div>
                    <div class="mb-3 col-lg-6">
                        <label for="emailInput" class="form-label">Email</label>
                        <input type="text" class="form-control" id="emailInput" tabindex="2" value="${email}">
                    </div>
                    <div class="mb-3 col-lg-6">
                        <label for="senhaInput" class="form-label">senha</label>
                        <input type="text" class="form-control" id="senhaInput" tabindex="3" value="${senha}">
                    </div>
                    <div class="mb-3 col-lg-6">
                        <label for="urlInput" class="form-label">Url</label>
                        <input type="text" class="form-control" id="urlInput" tabindex="4" value="${url}">
                    </div>
                    <div class="input-group mb-3 col mt-3">
                        <span class="input-group-text" id="basic-addon1">Filtro</span>
                        <select class="form-select" id="filterField">
                            ${options}
                        </select>
                    </div>

                    <div class="col-12 text-center mt-5">
                        <button class="btn btn-success w-50" tabindex="7" id="btnSave"> Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>`;
    $('body').append(overlay)
             .append(formSpan);
}

function selectPopulate(dataOptionList = null) {
    var options = ''
    if (dataOptionList != null) {
        for (i = 0; i < dataOptionList.length; i++) {
            options += `<option value="${dataOptionList[i].id}"> ${dataOptionList[i].name}</option>`
        }
    }
    return options;
}

function homePopulate(dataList = null) {
    var html = '';
    if (dataList == null) {
        ErrorMessage('Não foi possivel popular a tela', 'Contate o administrador')
        return html
    }
    for (i = 0; i < dataList.length; i++) {
        let filter = `<span class="badge text-bg-secondary fs-5" id="filterName">${dataList[i].filter}</span>`
        html += `
        <li class="list-group-item">
                    <div class="row">
                        <div class="col-1 d-none d-lg-block">
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">Id</span>
                                <input type="text" class="form-control" id="idElement" value="${dataList[i].id}" disabled>
                            </div>
                        </div>
                        <div class="col-2 text-start m-auto">
                            <h4>${dataList[i].name}</h4>
                        </div>
                        <div class="col-3 m-auto d-none d-lg-block">
                            ${filter}
                        </div>
                        <div class="col-4 col-lg-2 text-end">
                            <div class="row m-auto">
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
                </li>
        `

    }
    return html

}

function filter(name) {
    showAllListItems();
    if (name != 'All') {
        $('li').has('span#filterName').each(function () {
            // Verifica se o texto do <span>
            if ($(this).find('span#filterName').text().trim() !== name) {
                // Adiciona a classe "d-none" para ocultar o <li> inteiro
                $(this).addClass('d-none');
            }
        });
    }
}

function showAllListItems() {
    $('li').removeClass('d-none');
}