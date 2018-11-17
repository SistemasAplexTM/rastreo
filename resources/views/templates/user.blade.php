@extends('layouts.app')
@section('title', 'Usuarios' )
@section('content')
<div class="row" id="users">
	<div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="header">
                <h2>Registrar usuario</h2>
            </div>
            <div class="body">
                <div class="row">
                	<div class="col-md-10 col-md-offset-1 text-center">
                        <div class="image">
            				<img class="img-circle" src="{{ asset('img/logo_impocargo_mundo.png') }}" width="70" height="70" alt="User" />
                    	</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">person</i>
                            </span>
                            <div class="form-line" :class="{'error focused': errors.has('name') }">
                                <input
                                    name="name"
                                    v-model="name"
                                    v-validate.disable="'required'"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nombre completo">
                            </div>
                            <label v-show="errors.has('name')" class="error">@{{ errors.first('name') }}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">email</i>
                            </span>
                            <div class="form-line" :class="{'error focused': errors.has('email') }">
                                <input
                                    name="email"
                                    v-model="email"
                                    v-validate.disable="'required|email'"
                                    {{-- v-validate="'required|email|unique'" --}}
                                    class="form-control"
                                    type="text"
                                    placeholder="Correo">
                            </div>
                            <label v-show="errors.has('email')" class="error">@{{ errors.first('email') }}</label>
                        </div>
                    </div>
                </div>
                <div class="row" v-show="editing==false">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">vpn_key</i>
                            </span>
                            <div class="form-line" :class="{'error focused': errors.has('password') }">
                                <input
                                    name="password"
                                    v-model="password"
                                    v-validate.disable="[editing ? '': 'required|min:6']"
                                    type="password"
                                    class="form-control"
                                    placeholder="Contraseña">
                            </div>
                            <label v-show="errors.has('password')" class="error">@{{ errors.first('password') }}</label>
                        </div>
                    </div>
                </div>
                <div class="row" v-show="editing==false">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">vpn_key</i>
                            </span>
                            <div class="form-line" :class="{'error focused': errors.has('password_confirm') }">
                                <input
                                    name="password_confirm"
                                    v-model="password_confirm"
                                    {{-- v-validate="'required|confirmed:password'" --}}
                                    type="password"
                                    class="form-control"
                                    placeholder="Confirmar contraseña">
                            </div>
                            <label v-show="errors.has('password_confirm')" class="error">
                                @{{ errors.first('password_confirm') }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10 col-md-offset-1 text-center">
                    	<button type="button" class="btn btn-sm bg-teal waves-effect"  @click.prevent="store" v-if="editing==false">
                            <i class="material-icons">save</i>
                            <span>GUARDAR</span>
                        </button>
                        <button type="button" class="btn btn-sm btn-primary waves-effect"  @click.prevent="update" v-if="editing==true">
                            <i class="material-icons">edit</i>
                            <span>EDITAR</span>
                        </button>
                        <button type="button" class="btn btn-sm btn-default waves-effect"  @click.prevent="cancel" v-if="editing==true">
                            <i class="material-icons">close</i>
                            <span>CANCELAR</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="header">
                <h2>Usuarios</h2>
            </div>
            <div class="body">
                <table class="table table-bordered table-striped table-hover dataTable" id="tbl-users">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script src="{{ asset('js/user.js') }}"></script>
@endpush
