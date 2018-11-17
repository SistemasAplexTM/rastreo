const objVue = new Vue({
    el: '#rastreo',
    data: {
        numero: "",
        fecha_embarque: "",
        fecha_dex: "",
        datos: [],
    },
    methods: {
        rastrear: function(){
          if (!this.numero) {
            return false;
          }
            let me = this;
            axios.get('rastrear/' + this.numero)
            .then(function (response){
                me.datos = response.data.data;
                me.fecha_embarque = "";
                me.fecha_dex = "";
                if (me.datos.length > 0) {
                  me.fecha_embarque = me.datos[0].fecha_embarque;
                  me.fecha_dex = me.datos[0].fecha_embarque;
                }
            })
            .catch(function(error){
                alert(error);
            });
        },
        findMontToDate: function(mont) {
            var monthsShort = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
            return monthsShort[parseInt(mont) - 1];
        }
    }
});
