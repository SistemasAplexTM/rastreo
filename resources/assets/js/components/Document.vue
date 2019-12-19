<template>
  <div class>
    <div class="card">
      <div class="header">
        <h2>Registrar documento</h2>
      </div>
      <div class="body">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="Tipo:" prop="type_guide_id">
            <el-select
              v-model="ruleForm.type_guide_id"
              placeholder="Tipo"
              clearable
              style="width: 100%;"
            >
              <el-option
                v-for="item in types"
                :key="item.id"
                :label="item.descripcion"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Número:" prop="number">
            <el-input v-model="ruleForm.number" clearable></el-input>
          </el-form-item>
          <el-form-item label="Fecha de Embarque:" prop="shipping_date">
            <el-date-picker
              type="date"
              placeholder="Seleccione fecha"
              v-model="ruleForm.shipping_date"
              style="width: 100%;"
              format="yyyy/MM/dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Fecha DEX::" prop="dex_date">
            <el-date-picker
              type="date"
              placeholder="Seleccione fecha"
              v-model="ruleForm.dex_date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">Guardar</el-button>
            <el-button @click="resetForm()">Cancelar</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: [],
      ruleForm: {
        type_guide_id: "",
        number: "",
        shipping_date: "",
        dex_date: ""
      },
      rules: {
        type_guide_id: [
          {
            type: "number",
            required: true,
            message: "Por favor seleccione un tipi",
            trigger: "change"
          }
        ],
        number: [
          {
            required: true,
            message: "Por favor ingrese un numero de guia",
            trigger: "blur"
          }
        ]
        // shipping_date: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "Por favor ingrese la fecha de embarque",
        //     trigger: "change"
        //   }
        // ]
      }
    };
  },
  created() {
    this.getTypes();
  },
  methods: {
    getTypes: function() {
      let me = this;
      axios
        .get("tipo_guia/all")
        .then(function(response) {
          me.types = response.data;
        })
        .catch(function(error) {
          notifyMesagge("bg-red", "Error");
        });
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.store();
        } else {
          notifyMesagge("bg-teal", "Error al enviar");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    },
    store: function() {
      let me = this;
      var data = this.ruleForm;
      axios
        .post("documento", {
          data
        })
        .then(function(response) {
          me.resetForm();
          recargarTabla2("tbl-documento");
          notifyMesagge("bg-teal", "Registrado con éxito");
        })
        .catch(function(error) {
          alert(error);
        });
    },
    update: function() {
      let me = this;
      axios
        .put("documento/" + this.id, {
          ruleForm
        })
        .then(function(response) {
          notifyMesagge("bg-teal", "Actualizado con éxito");
          me.resetForm();
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};
</script>
