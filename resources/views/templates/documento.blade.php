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
					<small>Número:</small> <strong> @{{ numero }}</strong>
				</h2>
			</div>
			<div class="body">
				{{-- FORMULARIO --}}
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