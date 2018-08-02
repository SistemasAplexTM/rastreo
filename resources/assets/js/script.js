function imp_btn(edit,id, params){

    var btn_cancel = " <a id='btn_cancel_"+id+"' onclick=\"cancel('_cancel_'," + id + ")\" class='btn btn-outline btn-danger btn-xs hide' data-toggle='tooltip' title='Cancelar'><i class='material-icons'>close</i></a> ";    
    var btn_confirm = " <a id='btn_confirm_"+id+"' onclick=\"confirm('_confirm_',"+id+")\" class='btn btn-outline btn-danger btn-xs' data-toggle='tooltip' title='Eliminar'><i class='material-icons'>delete</i></a>";
    var btn_delete = " <a id='btn_delete_"+id+"' onclick=\"delete_function(" + id + ")\" class='btn btn-outline btn-primary btn-xs hide' data-toggle='tooltip' title='Confirmar'><i class='material-icons'>check</i></a> ";
    var btn_edit = '';
    if (edit == true) {
        btn_edit = " <a onclick=\"edit("+params+")\" class='btn btn-outline btn-primary btn-xs' data-toggle='tooltip' title='Editar'><i class='material-icons'>edit</i></a>";
    }
    return  btn_edit + btn_delete + btn_confirm + btn_cancel;
}
 /*-- Función para recargar datatables --*/
function recargarTabla(tabla){
    $('#' + tabla).dataTable()._fnAjaxUpdate();
    table =  $('#' + tabla).DataTable();
            table
             .search( '' )
             .columns().search( '' )
             .draw();
};

function notifyMesagge(colorName, text) {
    $.notify({
        message: text
    }, {
        type: colorName,
        allow_dismiss: true,
        newest_on_top: true,
        timer: 700,
        placement: {
            from: 'bottom',
            align: 'center'
        },
        template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (true ? "p-r-35" : "") + '" role="alert">' 
        + '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' 
        + '<span data-notify="icon"></span> ' + '<span data-notify="title">{1}</span> ' 
        + '<span data-notify="message">{2}</span>' 
        + '<div class="progress" data-notify="progressbar">' 
        + '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' 
        + '</div>' 
        + '<a href="{3}" target="{4}" data-notify="url"></a>' 
        + '</div>'
    });
}
