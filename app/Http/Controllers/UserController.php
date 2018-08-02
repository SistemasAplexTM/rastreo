<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DataTables;
use App\User;

class UserController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('templates.user');
    }

    public function all()
    {
    	$data = User::all();
        return Datatables::of($data)->make(true);
    }
}
