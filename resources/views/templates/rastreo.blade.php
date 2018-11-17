<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Rastrear - Rastreo</title>

    <!-- Scripts -->
    {{-- <script src="{{ asset('js/app.js') }}" defer></script> --}}

    <!-- Favicon-->
    <link rel="icon" href="{{ asset('images/cropped-favicon.png') }}" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- login Css -->
    <link href="{{ asset('css/main.css') }}" rel="stylesheet">

</head>

<body class="theme-teal" style="background-color: white;">
    <div class="row" id="rastreo">
      <div class="col-lg-4 col-lg-offset-4">
          <div class="">
            <div class="header text-center">
                <h3>
                    Rastrea tu mercancia
                    <br>
                    <small>Ingrese el numero de tracking, warehouse o guia que desea rastrear.</small>
                </h3>
            </div>
            <div class="body">
                <form class="text-center" method="POST">
                    <br>
                    <div class="input-group {{ $errors->has('email') ? 'has-error' : '' }}">
                        <div class="form-line">
                            <input type="text" class="form-control" v-model="numero" name="numero" placeholder="Número de guia" autofocus>
                        </div>
                        <span class="input-group-addon">
                          <button class="btn pull-right bg-teal waves-effect" @click.prevent="rastrear"> Rastrear</button>
                        </span>
                        @if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>
                </form>
                <div class="pull-right" v-if="Object.keys(datos).length != 0">
                  <br>
                  <i class="material-icons md-48">@{{ (datos[0].tipo_guia_id == 1) ? 'local_airport' : 'directions_boat' }}</i>
                </div>
                <h3><small>Número: </small>@{{ numero }}</h3>
                <div v-if="Object.keys(datos).length === 0" class="text-center">
                  <h4>No hay datos</h4>
                </div>
                <template v-else>
                    <p>Fecha de embarque: <strong>@{{ fecha_embarque }}</strong></p>
                    {{-- <p>Fecha de DEX: <strong>@{{ fecha_dex }}</strong></p> --}}
                    <hr>
                  <table class="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Estado</th>
                        <th>Observación</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="dato in datos">
                        <td style="vertical-align: middle">
                          <i class="material-icons" :style="'color:' + dato.color + '!important' ">donut_large</i>
                        </td>
                        <td>
                          <span class="font-bold" style="font-size: 18px">
                            @{{ dato.descripcion }}
                          </span>
                          <br>
                          @{{ dato.fecha }}
                        </td>
                        <td>@{{ dato.observacion }}</td>
                      </tr>
                    </tbody>
                  </table>
              </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Js -->
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/rastreo.js') }}"></script>
</body>

</html>
