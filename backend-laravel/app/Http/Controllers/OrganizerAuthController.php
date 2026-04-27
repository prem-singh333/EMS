<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class OrganizerAuthController extends Controller
{
    //Login
    function login(Request $req){
        $user = User::where('email', $req->email)->first();
        if(!$user || !Hash::check($req->password, $user->password)){
            return ["result"=>"user not found", "success"=>false];
        }

         $success['token'] = $user->createToken('EventApp')->plainTextToken;
        $user['name']=$user->name;
        return ['success'=>true, 'result'=>$success, "msg"=>"user login successfully"];
        
    }

    //Sign up
    function signup(Request $req){
        $input = $req->all();
        $input["password"] = bcrypt($input["password"]);
        $user = User::create($input);
        $success['token'] = $user->createToken('EventApp')->plainTextToken;
        $user['name']=$user->name;
        return ['success'=>true, 'result'=>$success, "msg"=>"user registered successfully"];
    }
}
