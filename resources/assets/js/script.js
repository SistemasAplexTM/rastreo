$(document).ready(function(){
    //toggle `popup` / `inline` mode
    // $.fn.editable.defaults.mode = 'inline';
    $.fn.editable.defaults.params = function(params) {
        params._token = $('meta[name="csrf-token"]').attr('content');
        return params;
    };
    $.extend( true, $.fn.dataTable.defaults, {
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Siguiente",
            },
        //            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
            "info": "Registros del _START_ al _END_  de un total de _TOTAL_",
            "search": "Buscar",
            "lengthMenu": "Mostrar _MENU_ Registros",
            "infoEmpty": "Mostrando registros del 0 al 0",
            "emptyTable": "No hay datos disponibles en la tabla",
            "infoFiltered": "(Filtrando para _MAX_ Registros totales)",
            "zeroRecords": "No se encontraron registros coincidentes",
          }
    });
});
﻿function imp_btn(edit,id, params){
    var btn_cancel = " <a id='btn_cancel_"+id+"' onclick=\"cancel('_cancel_'," + id + ")\" class='btn btn-outline btn-danger btn-xs hide' data-toggle='tooltip' title='Cancelar'><i class='material-icons'>close</i></a> ";
    var btn_confirm = " <a id='btn_confirm_"+id+"' onclick=\"confirm('_confirm_',"+id+")\" class='btn btn-outline btn-danger btn-xs' data-toggle='tooltip' title='Eliminar'><i class='material-icons'>delete</i></a>";
    var btn_delete = " <a id='btn_delete_"+id+"' onclick=\"eliminar(" + id + ")\" class='btn btn-outline btn-primary btn-xs hide' data-toggle='tooltip' title='Confirmar'><i class='material-icons'>check</i></a> ";
    var btn_edit = '';
    if (edit == true) {
        btn_edit = " <a onclick=\"edit("+params+")\" class='btn btn-outline btn-primary btn-xs' data-toggle='tooltip' title='Editar'><i class='material-icons'>edit</i></a>";
    }
    return  btn_edit + btn_delete + btn_confirm + btn_cancel;
}
/*-- Función para pasar el id de jQuery  a vue para eliminarlo --*/
function eliminar(id){
    objVue.delete(id);
}

function confirm(btn, id){
    $("#btn"+ btn + id).removeClass('show');
    $("#btn"+ btn + id).addClass('hide');

    $("#btn_delete_"+ id).removeClass('hide');
    $("#btn_delete_"+ id).addClass('show');

    $("#btn_cancel_"+ id).removeClass('hide');
    $("#btn_cancel_"+ id).addClass('show');
}

function cancel(btn, id){
    $("#btn"+ btn + id).removeClass('show');
    $("#btn"+ btn + id).addClass('hide');

    $("#btn_delete_"+ id).removeClass('show');
    $("#btn_delete_"+ id).addClass('hide');

    $("#btn_confirm_" + id).removeClass('hide');
    $("#btn_confirm_" + id).addClass('show');
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
 /*-- Función para recargar datatables --*/
function recargarTabla2(tabla){
    table =  $('#' + tabla).DataTable();
    table.ajax.reload();
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
