$(document).ready(function(){
    var table = $('#tbl-users').DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: 'users/all',
        columns: [
            { data: "name", name: 'name'},
            { data: "email", name: 'email'},
            {
                sortable: false,
                "render": function (data, type, full, meta) {
                    var params = [
                        full.id,
                        "'" + full.name + "'",
                        "'" + full.email + "'"
                    ];
                    return imp_btn(true, full.id, params);
                }
            }
        ]
    });
});

function edit(id, name, email){
    var data ={
        id:id,
        name: name,
        email: email
    };
    objVue.edit(data);
}


const objVue = new Vue({
    el: '#users',
    data: {
        name: "",
        email: "",
        password: "",
        password_confirm: "",
        editing: false
    },
    created() {
        const isUnique = (value) => {
          return axios.get('user/validateEmail/' + value).then((response) => {
            // Notice that we return an object containing both a valid property and a data property.
            return {
              valid: response.data.valid,
              data: {
                message: response.data.message
              }
            };
          });
        };

        // The messages getter may also accept a third parameter that includes the data we returned earlier.
        this.$validator.extend('unique', {
          validate: isUnique,
          getMessage: (field, params, data) => {
            return data.message;
          }
        });
    },
    methods: {
        store: function(){
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let me = this;
                    axios.post('users',{
                        'name': me.name,
                        'email': me.email,
                        'password': me.password
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
        update: function(){
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let me = this;
                    axios.put('users/' + this.id,{
                        'name': me.name,
                        'email': me.email
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
        edit: function(data){
            this.id = data['id'];
            this.name = data['name'];
            this.email = data['email'],
            this.editing = true;
        },
        delete: function(id){
            let me = this;
            axios.delete('user/' + id)
            .then(function (response){
                notifyMesagge('bg-teal','Registro eliminado con éxito');
                me.updateTable();
            })
            .catch(function(error){
                notifyMesagge('bg-red','Error');
            });
        },
        updateTable: function(){
            recargarTabla('tbl-users');
        },
        resetForm: function(){
            this.name = "";
            this.email = "";
            this.password = "";
            this.password_confirm = "";
            this.editing = false;
            this.updateTable();
        },
        cancel: function(){
            this.resetForm();
            this.editing = false;
            this.$validator.reset();
        }
    }
});
