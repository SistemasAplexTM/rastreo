@extends('layouts.app')
@section('title', 'Documento' )
@section('content')
<div class="row" id="documento">
	<!-- Full Body Colorful Panel Items With Icon -->
	<div v-if="view == 2" class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
		<div class="card">
			<div class="header">
				<a class="btn bg-default btn-sm pull-right" @click.prevent="view=1;numero=''">Cancelar</a>
				<a v-if="!editing_estado" class="btn bg-teal btn-sm pull-right"
					@click.prevent="crear_estado">Guardar</a>
				<a v-else class="btn bg-teal btn-sm pull-right" @click.prevent="update_estado">Actualizar</a>
				<h2>
					<small>Número:</small> <strong> @{{ number }}</strong>
				</h2>
			</div>
			<div class="body">
						<div class="row">
                <div class="col-md-12">
									<div class="form-group">
										<label for="tipo">Estado:</label>
										<div :class="{'error focused': errors.has('number') }">
											<select class="form-control" v-model="estado" name="estado">
												<option value="">-- Seleccione estado --</option>
												<option v-for="estado in estados" :value="estado.value">@{{ estado.text }}</option>
											</select>
										</div>
									</div>
                  <label v-show="errors.has('number')" class="error">@{{ errors.first('estado') }}</label>
                </div>
            </div>
						<div class="row">
                <div class="col-md-12">
									<div class="form-group">
										<label for="fecha">Fecha:</label>
										<div :class="{'error focused': errors.has('fecha') }">
											<input type="date" name="fecha" v-model="fecha" class="form-control">
										</div>
									</div>
                  <label v-show="errors.has('fecha')" class="error">@{{ errors.first('fecha') }}</label>
                </div>
            </div>
						<div class="row clearfix">
              <div class="col-md-12">
								<div class="form-group">
									<label for="tipo">Observación:</label>
									<div class="form-line">
											<textarea rows="4" class="form-control no-resize" v-model="observacion" placeholder="Observación..."></textarea>
									</div>
								</div>
                <label v-show="errors.has('numero')" class="error">@{{ errors.first('estado') }}</label>
              </div>
            </div>
						<div class="row clearfix">
								<div class="col-xs-12 ol-sm-12 col-md-12 col-lg-12">
										<div class="panel-group" id="accordion_18" role="tablist" aria-multiselectable="true">
												<div class="panel" :style="'border: 1px solid' +  dato_estado.color" v-for="dato_estado in datos_estado">
														<div class="panel-heading" role="tab" :id="'heading_' + dato_estado.id">
															<a class="pull-right col-white" href="#" @click.prevent="delete_estado(dato_estado.id)"><i class="material-icons">delete</i></a>
															<a class="pull-right col-white" href="#" @click.prevent="edit_estado(dato_estado)"><i class="material-icons">edit</i></a>
																<h4 class="panel-title" :style="'background-color:' + dato_estado.color + '!important; color: white'">
																		<a role="button" data-toggle="collapse" data-parent="#accordion_18" :href="'#collapse' + dato_estado.id" aria-expanded="true" aria-controls="collapseOne_18">
																				@{{ dato_estado.descripcion }}
																				<br>
																				<span class="fecha" style="font-size: 13px">
																					Fecha: <strong>@{{ dato_estado.fecha }}</strong>
																				</span>
																		</a>
																</h4>
														</div>
														<div :id="'collapse' + dato_estado.id" class="panel-collapse collapse in" role="tabpanel" :aria-labelledby="'heading' + dato_estado.id">
																<div class="panel-body">
																	@{{ dato_estado.observacion }}
																</div>
														</div>
												</div>
										</div>
								</div>
						</div>
			</div>
		</div>
	</div>
	<!-- #END# Full Body Colorful Panel Items With Icon -->
	<div v-else class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
		{{-- FORMULARIO --}}
		<document></document>
	</div>
	<div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
		<div class="card">
			<div class="header">
				<h2>Guias</h2>
			</div>
			<div class="body">
				<div class="">
					<table class="table table-bordered table-striped table-hover dataTable" id="tbl-documento"
						style="width: 100% !important">
						<thead>
							<tr>
								<th width="5%" class="text-center"
									style="width: 5% !important;text-align: center !important">Tipo</th>
								<th width="20%">Número</th>
								<th>Fecha Embarque</th>
								<th>Fecha DEX</th>
								<th>Estado</th>
								<th width="15%">Acciones</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
@push('scripts')
<script src="{{ asset('js/documento.js') }}"></script>
@endpush