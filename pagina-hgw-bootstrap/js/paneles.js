export function panelGestion(tableData, seccion) {
    return `
        <div class="contenedor">
            <div class="panel">
                <div class="acciones">
                    <button type="button" class="btn btn-success">crear ${seccion} </button>
                    <button type="button" class="btn btn-success">editar ${seccion} </button>
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping"><i class="bi bi-people"></i></span>
                        <input type="text" class="form-control" placeholder=${seccion} aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                </div>
                <div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre de ${seccion} </th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableData.map(row => `
                                <tr>
                                    <td>${row.id}</td>
                                    <td>${row.nombre}</td>
                                    <td>${row.descripcion}</td>
                                    <td>
                                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                                            <button type="button" class="btn btn-outline-success" location.href:${row.editarURL}>editar</button>
                                            <button type="button" class="btn btn-outline-danger">eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

export function panelCreacion(tableData, seccion){
    return `
    <div class="contenedor">
        <div class="panel">
            <div class="info">
                <div class="foto">
                    <img src="./img\catalogo\pat1.jpeg" alt="foto">
                </div>
                <div class="datos">
                    <div id='datosCreacion' class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="nombre ${seccion}" aria-label="Recipient's username" aria-describedby="basic-addon2">
                      <span class="input-group-text" id="basic-addon2">nombre</span>
                    </div>
                    <div id='datosCreacion' class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">@</span>
                        <input type="text" class="form-control" placeholder="descripción" aria-label="Username" aria-describedby="basic-addon1">
                      </div>
                      
                      <div class="btn-group" id="verificacion">
                          <button type="button" class="btn btn-outline-success">crear</button>
                          <button type="button" class="btn btn-outline-danger">cancelar</button>
                      </div>
                </div>
            </div>
            <div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de ${seccion} </th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableData.map(row => `
                            <tr>
                                <td>${row.id}</td>
                                <td>${row.nombre}</td>
                                <td>${row.descripcion}</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                                        <button type="button" class="btn btn-outline-success" location.href:${row.editarURL}>editar</button>
                                        <button type="button" class="btn btn-outline-danger">eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
`
 }

