@extends('layouts.app')
@section('title', 'Estados' )
@section('content')
<div class="row" id="estado">
	<div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="header">
                <h2>Registrar documento</h2>
            </div>
            <div class="body">
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">person</i>
                            </span>
                            <div class="form-line" :class="{'error focused': errors.has('descripcion') }">
                                <input
                                    name="descripcion"
                                    v-model="descripcion"
                                    v-validate.disable="'required'"
                                    type="text"
                                    class="form-control"
                                    placeholder="Descripción">
                            </div>
                            <label v-show="errors.has('descripcion')" class="error">@{{ errors.first('descripcion') }}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="input-group colorpicker colorpicker-element">
                            <div class="form-line focused">
                                <input type="text" class="form-control" id="color" placeholder="Color">
                            </div>
                            <span class="input-group-addon">
                                <i style="background-color: rgb(41, 154, 166);"></i>
                            </span>
                        </div>
                        {{-- <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">person</i>
                            </span>
                            <div class="form-line" :class="{'error focused': errors.has('descripcion') }">

                                <input
                                    name="descripcion"
                                    v-model="descripcion"
                                    v-validate="'required'"
                                    type="text"
                                    class="form-control"
                                    placeholder="Color">
                            </div>
                            <label v-show="errors.has('descripcion')" class="error">@{{ errors.first('descripcion') }}</label>
                        </div> --}}
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
                <h2>Estados registrados</h2>
            </div>
            <div class="body">
                <table class="table table-bordered table-striped table-hover dataTable" id="tbl-estado">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Color</th>
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
<script src="{{ asset('js/estado.js') }}"></script>
@endpush
