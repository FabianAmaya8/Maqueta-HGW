export function panel(tableData, seccion) {
    return `
        <div class="contenedor">
            <div class="panel">
                <div class="acciones">
                    <button type="button" class="btn btn-success">crear</button>
                    <button type="button" class="btn btn-success">editar</button>
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">@</span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
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
                                        <button class="btn-opt-edit" onclick="location.href='${row.editarURL}';"><i class='bx bxs-edit-alt'></i></button>
                                        <button class="btn-opt" id="eliminate"><i class='bx bx-trash'></i></button>
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

