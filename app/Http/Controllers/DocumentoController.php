<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Guia as Documento;
use App\GuiaEstado;
use DataTables;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DocumentoController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return view('templates.documento');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
        Documento::create($request->all());
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    Documento::where('id', $id)->update($request->all());
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    Documento::where('id', $id)->delete();
  }

  public function all()
  {
    try {
      $data = DB::table('guias AS a')
        ->leftjoin('tipo_guias AS b', 'a.tipo_guia_id', 'b.id')
        ->select(
          'a.id',
          'a.numero AS number',
          'a.fecha_embarque AS shipping_date',
          'a.fecha_dex AS dex_date',
          'b.descripcion AS tipo_guia',
          'a.tipo_guia_id AS type_guide_id',
          DB::raw('(
            SELECT
        			z.descripcion AS estado
        		FROM
        			guia_estados AS x
        		INNER JOIN estados AS z ON x.estado_id = z.id
        		WHERE
        			x.guia_id = a.id
        		ORDER BY
        			x.id DESC
        		LIMIT 1
            ) AS estado'),
          DB::raw('(
          		SELECT
          			z.color AS estado_color
          		FROM
          			guia_estados AS x
          		INNER JOIN estados AS z ON x.estado_id = z.id
          		WHERE
          			x.guia_id = a.id
          		ORDER BY
          			x.id DESC
          		LIMIT 1
          	) AS estado_color')
        )
        ->orderBy('a.id', 'desc')
        ->get();
      return DataTables::of($data)->make(true);
    } catch (\Exception $e) {
      return response()->json([
        'code' => $e->getCode(),
        'message' => $e->getMessage(),
      ]);
    }
  }

  public function crearEstado(Request $request)
  {
    if ($this->validarestado($request->pk, $request->value)) {
      return array('code' => 300);
    }

    GuiaEstado::create([
      'guia_id' => $request->pk,
      'estado_id' => $request->value,
      'fecha' => $request->fecha,
      'observacion' => $request->observacion,
      'user_id' => Auth::id(),
    ]);
    return array('code' => 200);
  }

  public function updateEstado(Request $request)
  {
    GuiaEstado::where([['guia_id', $request->pk], ['estado_id', $request->value]])->update([
      'guia_id' => $request->pk,
      'estado_id' => $request->value,
      'fecha' => $request->fecha,
      'observacion' => $request->observacion,
      'user_id' => Auth::id(),
    ]);
    return array('code' => 200);
  }

  public function rastreo()
  {
    return view('templates.rastreo');
  }

  public function destroy_estado($id, $estado)
  {
    DB::table('guia_estados')->where([['guia_id', $id], ['estado_id', $estado]])->delete();
  }

    public function rastrear($numero)
  {
    try {
      $data = DB::table('estados AS a')
        ->leftjoin('guia_estados AS b', 'b.estado_id', 'a.id')
        ->leftjoin('guias AS c', 'b.guia_id', 'c.id')
        ->select(
          'a.id',
          'a.color',
          'a.descripcion',
          'c.numero AS number',
          'c.fecha_embarque AS shipping_date',
          'c.fecha_dex AS dex_date',
          'c.tipo_guia_id AS type_guide_id',
          'b.fecha',
          'b.observacion',
          DB::raw("DATE_FORMAT(a.created_at,'%d - %m - %Y') AS fecha_creacion"),
          DB::raw('YEAR(a.created_at) as year_data, MONTH(a.created_at) as mont_data, DAY(a.created_at) as day_data')
        )
        ->where('c.numero', $numero)
        ->get();

      return array('code' => 200, 'data' => $data);
    } catch (\Exception $e) {
      return response()->json([
        'code' => $e->getCode(),
        'message' => $e->getMessage(),
      ]);
    }
  }

  public function validarestado($guia, $estado)
  {
    $data = DB::table('guia_estados AS a')
      ->select(
        DB::raw('count(a.id) AS cantidad')
      )
      ->where([['a.guia_id', $guia], ['a.estado_id', $estado]])
      ->first();
    $result = false;
    if ($data->cantidad >= 1) {
      $result = true;
    }
    return $result;
  }
}
