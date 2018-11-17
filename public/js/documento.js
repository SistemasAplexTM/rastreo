$(document).ready(function(){
    var table = $('#tbl-documento').DataTable({
        responsive: true,
        ajax: 'documento/all',
        columns: [
            {
              "render": function (data, type, full, meta) {
                var result = '<i class="material-icons" title="'+full.tipo_guia+'">local_airport</i>';
                if (full.tipo_guia_id == 2) {
                  var result = '<i class="material-icons" title="'+full.tipo_guia+'">directions_boat</i>';
                }
                return result;
              }
            },
            { data: "numero", name: 'numero'},
            { data: "fecha_embarque", name: 'fecha_embarque'},
            { data: "fecha_dex", name: 'fecha_dex'},
            {
                "render": function (data, type, full, meta) {
                  var result = '<a href="#" class="td_editable" data-type="select" data-pk="'+full.id+'" data-title="Seleccione un estado">Estado</a>';
                  if (full.estado) {
                    result =  full.estado + '<span class="badge pull-right" style="border-radius: 50%; background-color: '+full.estado_color+'">&nbsp;</span>';
                  }
                  return result;
                }
            },
            {
                sortable: false,
                "render": function (data, type, full, meta) {
                    var params = [
                        full.id,
                        "'" + full.numero + "'",
                        "'" + full.fecha_embarque + "'",
                        "'" + full.fecha_dex + "'",
                        "'" + full.estado + "'",
                        full.tipo_guia_id,
                        "'" + full.tipo_guia + "'"
                    ];
                    var btn_estados = '<a class="btn btn-default btn-xs" onclick="rastrear('+full.id+',\''+ full.numero + '\')"><i class="material-icons" title="Estados">arrow_forward</i></a>'
                    return imp_btn(true, full.id, params) + btn_estados;
                }
            }
        ],
    });
});
function rastrear(id, numero){
    objVue.rastrear(numero);
    objVue.id = id;
    objVue.numero = numero;
    objVue.view = 2;
}

function edit(id, numero, fecha_embarque, fecha_dex, estado, tipo_guia_id, tipo_guia){
    var data ={
        id:id,
        numero: numero,
        fecha_embarque: fecha_embarque,
        fecha_dex: fecha_dex,
        estado: estado,
        tipo_guia_id: tipo_guia_id,
        tipo_guia: tipo_guia,
    };
    objVue.edit(data);
}

const objVue = new Vue({
    el: '#documento',
    data: {
        id: "",
        view: 1,
        tipo_guia_id: "",
        tipo_guia: "",
        numero: "",
        fecha_embarque: "",
        fecha_dex: "",
        estado: "",
        fecha: "",
        observacion: "",
        estados: "",
        datos_estado: "",
        result: false,
        tipos_guia: {},
        editing: false,
        editing_estado: false
    },
    created(){
      this.getTipos();
      this.getEstados();
    },
    methods: {
        store: function(){
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let me = this;
                    axios.post('documento',{
                        'tipo_guia_id': me.tipo_guia,
                        'numero': me.numero,
                        'fecha_embarque': me.fecha_embarque,
                        'fecha_dex': me.fecha_dex
                    })
                    .then(function (response){
                      me.resetForm();
                        notifyMesagge('bg-teal','Registrado con éxito');
                    })
                    .catch(function(error){
                        alert(error);
                    });
                }
            });
        },
        edit: function(data){
            this.id = data['id'];
            this.view = 1;
            this.numero = data['numero'];
            this.fecha_embarque = data['fecha_embarque'];
            this.fecha_dex = data['fecha_dex'];
            this.estado = data['estado'],
            this.tipo_guia = data['tipo_guia_id']
            this.editing = true;
        },
        update: function(){
             // this.$validator.validateAll().then((result) => {
             //    if (result) {
                    let me = this;
                    axios.put('documento/'+this.id,{
                        'tipo_guia_id': me.tipo_guia,
                        'numero': me.numero,
                        'fecha_embarque': me.fecha_embarque,
                        'fecha_dex': me.fecha_dex
                    })
                    .then(function (response){
                        notifyMesagge('bg-teal','Actualizado con éxito');
                        me.resetForm();
                    })
                    .catch(function(error){
                        alert(error);
                    });
            //     }
            // });
        },
        delete: function(id){
            let me = this;
            axios.delete('documento/' + id)
            .then(function (response){
                notifyMesagge('bg-teal','Registro eliminado con éxito');
                me.updateTable();
            })
            .catch(function(error){
                notifyMesagge('bg-red','Error');
            });
        },
        getTipos: function(){
            let me = this;
            axios.get('tipo_guia/all')
            .then(function (response){
                me.tipos_guia = response.data;
            })
            .catch(function(error){
                notifyMesagge('bg-red','Error');
            });
        },
        getEstados: function(){
            let me = this;
            axios.get('estado/allSelect')
            .then(function (response){
                me.estados = response.data;
            })
            .catch(function(error){
                notifyMesagge('bg-red','Error');
            });
        },
        crear_estado: function(guia, estado){
            let me = this;
            axios.post('crearEstado', {
              'pk' : this.id,
              'value' : this.estado,
              'fecha' : this.fecha,
              'observacion' : this.observacion,
            })
            .then(function (response){
              if (response.data.code == 300) {
                notifyMesagge('bg-red','Registro duplicado');
                return false;
              }
              me.rastrear(me.numero);
              me.estado = "";
              me.fecha = "";
              me.observacion = "";
              me.updateTable();
              notifyMesagge('bg-teal','Registrado con éxito');
            })
            .catch(function(error){
                return true;
            });
        },
        update_estado: function(){
            let me = this;
            axios.put('updateEstado', {
              'pk' : this.id,
              'value' : this.estado,
              'fecha' : this.fecha,
              'observacion' : this.observacion,
            })
            .then(function (response){
              if (response.data.code == 300) {
                notifyMesagge('bg-red','Registro duplicado');
                return false;
              }
              me.rastrear(me.numero);
              me.estado = "";
              me.fecha = "";
              me.observacion = "";
              me.editing_estado = false;
              me.updateTable();
              notifyMesagge('bg-teal','Actualizado con éxito');
            })
            .catch(function(error){
                return true;
            });
        },
        edit_estado: function(estado){
            let me = this;
            me.estado = estado.id;
            me.fecha = estado.fecha;
            me.observacion = estado.observacion;
            me.editing_estado = true;
            console.log(estado);
        },
        delete_estado: function(estado){
            let me = this;
            axios.delete('estado/' + me.id + '/' + estado)
            .then(function (response){
              me.rastrear(me.numero);
              notifyMesagge('bg-teal','Registro eliminado con éxito');
              me.updateTable();
            })
            .catch(function(error){
                notifyMesagge('bg-red','Error');
            });
        },
        rastrear: function(numero){
          let me = this;
          axios.get('rastrear/' + numero)
          .then(function (response){
              me.datos_estado = response.data.data;
          })
          .catch(function(error){
              alert(error);
          });
        },
        updateTable: function(){
            recargarTabla2('tbl-documento');
        },
        resetForm: function(){
            this.tipo_guia = "";
            this.numero = "";
            this.fecha_embarque = "";
            this.fecha_dex = "";
            this.updateTable();
        },
        cancel: function(){
            this.resetForm();
            this.editing = false;
            this.$validator.reset();
        }
    }
});
