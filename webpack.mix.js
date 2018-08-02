let mix = require('laravel-mix');
mix.styles([
		'resources/assets/plugins/bootstrap/css/bootstrap.css',
		'resources/assets/plugins/node-waves/waves.css',
		'resources/assets/plugins/animate-css/animate.css',
		'resources/assets/plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css',
		'resources/assets/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.css',
		'resources/assets/plugins/morrisjs/morris.css',
		'resources/assets/css/style.css'
	], 'public/css/main.css');
mix.js('resources/assets/js/app.js', 'public/js');

mix.scripts([
		'resources/assets/plugins/jquery/jquery.min.js',
		'resources/assets/plugins/bootstrap/js/bootstrap.js',
		'resources/assets/plugins/bootstrap-select/js/bootstrap-select.js',
		'resources/assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
		'resources/assets/plugins/bootstrap-notify/bootstrap-notify.js',
		// 'resources/assets/plugins/jquery-slimscroll/jquery.slimscroll.js',
		'resources/assets/plugins/jquery-datatable/jquery.dataTables.js',
	    'resources/assets/plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js',
	    'resources/assets/plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js',
	    'resources/assets/plugins/jquery-datatable/extensions/export/buttons.flash.min.js',
	    'resources/assets/plugins/jquery-datatable/extensions/export/jszip.min.js',
	    'resources/assets/plugins/jquery-datatable/extensions/export/pdfmake.min.js',
	    'resources/assets/plugins/jquery-datatable/extensions/export/vfs_fonts.js',
	    'resources/assets/plugins/jquery-datatable/extensions/export/buttons.html5.min.js',
	    'resources/assets/plugins/jquery-datatable/extensions/export/buttons.print.min.js',
		'resources/assets/plugins/node-waves/waves.js',
		'resources/assets/js/script.js',
		'resources/assets/js/admin.js'
	], 'public/js/main.js');
mix.copyDirectory('resources/assets/images', 'public/images');
mix.copyDirectory('resources/assets/img', 'public/img');
mix.copyDirectory('resources/assets/js/templates', 'public/js');
