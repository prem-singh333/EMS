<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookedevent;
use Illuminate\Support\Facades\Auth;

class BookinController extends Controller
{
    function joinEvent(Request $req){
        $user = Auth::user();
        $event_id = $req->event_id;

        $exists = Bookedevent::where('user_id', $user->id)->where("event_id", $event_id)->exists();

        if($exists){
            return response()->json([
                "msg"=>"Already exist"
            ], 400);
        }

        Bookedevent::create([
            'user_id'=>$user->id,
            "event_id"=> $event_id
        ]);

        return response()->json([
            "msg"=>"joined successfully",

        ], 200);
    }
}
