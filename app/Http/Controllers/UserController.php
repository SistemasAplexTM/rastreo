<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DataTables;
use Illuminate\Support\Facades\Hash;
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

    public function store(Request $request){
      return User::create([
          'name' => $request['name'],
          'email' => $request['email'],
          'password' => Hash::make($request['password']),
      ]);
    }

    public function update(Request $request, $id){
      User::where('id', $id)->update($request->all());
    }

    public function all()
    {
    	$data = User::where('id', '<>', \Auth::user()->id)->get();
      return Datatables::of($data)->make(true);
    }

    public function validateEmail($email)
    {
        try {
            $data = User::withTrashed()->where('email', $email)->first();
            if ($data){
                $answer=array(
                    "valid" => false,
                    "message" => "El correo ya existe."
                );
            }else{
                $answer=array(
                    "valid" => true,
                    "message" => ""
                );
            }
            return $answer;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function destroy($id){
      User::where('id', $id)->forceDelete();
    }
}
