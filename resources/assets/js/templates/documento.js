$(document).ready(function () {
    var table = $('#tbl-documento').DataTable({
        responsive: true,
        ajax: 'documento/all',
        columns: [
            {
                "render": function (data, type, full, meta) {
                    var result = '<i class="material-icons" title="' + full.tipo_guia + '">local_airport</i>';
                    if (full.type_guide_id == 2) {
                        var result = '<i class="material-icons" title="' + full.tipo_guia + '">directions_boat</i>';
                    }
                    return result;
                }
            },
            { data: "number", name: 'number' },
            { data: "shipping_date", name: 'shipping_date' },
            { data: "dex_date", name: 'dex_date' },
            {
                "render": function (data, type, full, meta) {
                    var result = '<a href="#" class="td_editable" data-type="select" data-pk="' + full.id + '" data-title="Seleccione un estado">Estado</a>';
                    if (full.estado) {
                        result = full.estado + '<span class="badge pull-right" style="border-radius: 50%; background-color: ' + full.estado_color + '">&nbsp;</span>';
                    }
                    return result;
                }
            },
            {
                sortable: false,
                "render": function (data, type, full, meta) {
                    var params = [
                        full.id,
                        "'" + full.number + "'",
                        "'" + full.shipping_date + "'",
                        "'" + full.dex_date + "'",
                        "'" + full.estado + "'",
                        full.type_guide_id,
                        "'" + full.tipo_guia + "'"
                    ];
                    var btn_estados = '<a class="btn btn-default btn-xs" onclick="rastrear(' + full.id + ',\'' + full.number + '\')"><i class="material-icons" title="Estados">arrow_forward</i></a>'
                    return imp_btn(true, full.id, params) + btn_estados;
                }
            }
        ],
    });
});
function rastrear(id, number) {
    objVue.rastrear(number);
    objVue.id = id;
    objVue.number = number;
    objVue.view = 2;
}

function edit(id, number, shipping_date, dex_date, estado, type_guide_id, tipo_guia) {
    var data = {
        id: id,
        number: number,
        shipping_date: shipping_date,
        dex_date: dex_date,
        estado: estado,
        type_guide_id: type_guide_id,
        tipo_guia: tipo_guia,
    };
    objVue.edit(data);
}

const objVue = new Vue({
    el: '#documento',
    data: {
        id: "",
        view: 1,
        type_guide_id: "",
        tipo_guia: "",
        number: "",
        shipping_date: "",
        dex_date: "",
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
    created() {
        //   this.getTipos();
        this.getEstados();
    },
    methods: {
        // store: function () {
        //     this.$validator.validateAll().then((result) => {
        //         if (result) {
        //             let me = this;
        //             axios.post('documento', {
        //                 'type_guide_id': me.tipo_guia,
        //                 'number': me.number,
        //                 'shipping_date': me.shipping_date,
        //                 'dex_date': me.dex_date
        //             })
        //                 .then(function (response) {
        //                     me.resetForm();
        //                     notifyMesagge('bg-teal', 'Registrado con éxito');
        //                 })
        //                 .catch(function (error) {
        //                     alert(error);
        //                 });
        //         }
        //     });
        // },
        edit: function (data) {
            this.id = data['id'];
            this.view = 1;
            this.number = data['number'];
            this.shipping_date = data['shipping_date'];
            this.dex_date = data['dex_date'];
            this.estado = data['estado'],
                this.tipo_guia = data['type_guide_id']
            this.editing = true;
        },
        // update: function () {
        //     // this.$validator.validateAll().then((result) => {
        //     //    if (result) {
        //     let me = this;
        //     axios.put('documento/' + this.id, {
        //         'type_guide_id': me.tipo_guia,
        //         'number': me.number,
        //         'shipping_date': me.shipping_date,
        //         'dex_date': me.dex_date
        //     })
        //         .then(function (response) {
        //             notifyMesagge('bg-teal', 'Actualizado con éxito');
        //             me.resetForm();
        //         })
        //         .catch(function (error) {
        //             alert(error);
        //         });
        //     //     }
        //     // });
        // },
        delete: function (id) {
            let me = this;
            axios.delete('documento/' + id)
                .then(function (response) {
                    notifyMesagge('bg-teal', 'Registro eliminado con éxito');
                    me.updateTable();
                })
                .catch(function (error) {
                    notifyMesagge('bg-red', 'Error');
                });
        },
        // getTipos: function(){
        //     let me = this;
        //     axios.get('tipo_guia/all')
        //     .then(function (response){
        //         me.tipos_guia = response.data;
        //     })
        //     .catch(function(error){
        //         notifyMesagge('bg-red','Error');
        //     });
        // },
        getEstados: function () {
            let me = this;
            axios.get('estado/allSelect')
                .then(function (response) {
                    me.estados = response.data;
                })
                .catch(function (error) {
                    notifyMesagge('bg-red', 'Error');
                });
        },
        crear_estado: function (guia, estado) {
            let me = this;
            axios.post('crearEstado', {
                'pk': this.id,
                'value': this.estado,
                'fecha': this.fecha,
                'observacion': this.observacion,
            })
                .then(function (response) {
                    if (response.data.code == 300) {
                        notifyMesagge('bg-red', 'Registro duplicado');
                        return false;
                    }
                    me.rastrear(me.number);
                    me.estado = "";
                    me.fecha = "";
                    me.observacion = "";
                    me.updateTable();
                    notifyMesagge('bg-teal', 'Registrado con éxito');
                })
                .catch(function (error) {
                    return true;
                });
        },
        update_estado: function () {
            let me = this;
            axios.put('updateEstado', {
                'pk': this.id,
                'value': this.estado,
                'fecha': this.fecha,
                'observacion': this.observacion,
            })
                .then(function (response) {
                    if (response.data.code == 300) {
                        notifyMesagge('bg-red', 'Registro duplicado');
                        return false;
                    }
                    me.rastrear(me.number);
                    me.estado = "";
                    me.fecha = "";
                    me.observacion = "";
                    me.editing_estado = false;
                    me.updateTable();
                    notifyMesagge('bg-teal', 'Actualizado con éxito');
                })
                .catch(function (error) {
                    return true;
                });
        },
        edit_estado: function (estado) {
            let me = this;
            me.estado = estado.id;
            me.fecha = estado.fecha;
            me.observacion = estado.observacion;
            me.editing_estado = true;
            console.log(estado);
        },
        delete_estado: function (estado) {
            let me = this;
            axios.delete('estado/' + me.id + '/' + estado)
                .then(function (response) {
                    me.rastrear(me.number);
                    notifyMesagge('bg-teal', 'Registro eliminado con éxito');
                    me.updateTable();
                })
                .catch(function (error) {
                    notifyMesagge('bg-red', 'Error');
                });
        },
        rastrear: function (number) {
            let me = this;
            axios.get('rastrear/' + number)
                .then(function (response) {
                    me.datos_estado = response.data.data;
                })
                .catch(function (error) {
                    alert(error);
                });
        },
        updateTable: function () {
            recargarTabla2('tbl-documento');
        },
        // resetForm: function () {
        //     this.tipo_guia = "";
        //     this.number = "";
        //     this.shipping_date = "";
        //     this.dex_date = "";
        //     this.updateTable();
        // },
        // cancel: function () {
        //     this.resetForm();
        //     this.editing = false;
        //     this.$validator.reset();
        // }
    }
});
