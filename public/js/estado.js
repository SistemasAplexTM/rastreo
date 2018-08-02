$(document).ready(function(){
    $('.colorpicker').colorpicker();
    var table = $('#tbl-estado').DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: 'estado/all',
        columns: [
            { data: "descripcion", name: 'descripcion'},
            {
                "render": function (data, type, full, meta) {
                    return '<span class="label label-danger" style="background-color: '+full.color+'">Color</span>';
                }
            },
            {
                sortable: false,
                "render": function (data, type, full, meta) {
                    var params = [
                        full.id,
                        "'" + full.descripcion + "'",
                        "'" + full.color + "'"
                    ];
                    return imp_btn(true, full.id, params);
                }
            }
        ]
    });
});

function edit(id, descripcion, color){
    var data ={
        id:id,
        descripcion: descripcion,
        color: color
    };
    $('#color').val(color);
    objVue.edit(data);
}


const objVue = new Vue({
    el: '#estado',
    data: {
        descripcion: "",
        color: "",
        editing: false
    },
    methods: {
        store: function(){
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let me = this;
                    axios.post('estado',{
                        'descripcion': me.descripcion,
                        'color': $('#color').val()
                    })
                    .then(function (response){
                        notifyMesagge('bg-teal','Registrado con éxito');
                        me.resetForm();
                    })
                    .catch(function(error){
                        alert(error);
                    });
                }
            });
        },
        edit: function(data){
            this.id = data['id'];
            this.descripcion = data['descripcion'];
            this.color = data['color'],
            this.editing = true;
        },
        update: function(){
             this.$validator.validateAll().then((result) => {
                if (result) {
                    let me = this;
                    axios.put('estado/'+this.id,{
                        'descripcion': me.descripcion,
                        'color': $('#color').val()
                    })
                    .then(function (response){
                        notifyMesagge('bg-teal','Actualizado con éxito');
                        me.resetForm();
                    })
                    .catch(function(error){
                        alert(error);
                    });
                }
            });
        },
        delete: function(id){
            let me = this;
            axios.delete('estado/' + id)
            .then(function (response){
                notifyMesagge('bg-teal','Registro eliminado con éxito');
                me.updateTable();
            })
            .catch(function(error){
                notifyMesagge('bg-red','Error');
            });
        },
        updateTable: function(){
            recargarTabla('tbl-estado');
        },
        resetForm: function(){
            this.descripcion = "";
            this.color = "";
            $('#color').val('');
            this.updateTable();
        },
        cancel: function(){
            this.resetForm();
            this.editing = false;
            this.$validator.reset();
        }
    }
});
