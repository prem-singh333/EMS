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


    function booking(Request $req){
        $bookingList = Bookedevent::with(['user', 'event'])->get()->groupBy('event_id');

        $result = $bookingList->map(function($items){
            return [
                "event"=>$items[0]->event,
                "total_users"=>$items->count(),
                "users"=>$items->pluck('user')
            ];
    });

        return $result->values();
        
    }

    function myBookings(){
        $user = auth()->id();
       $bookings = Bookedevent::with('event')->where("user_id", $user)->get();
        return $bookings;
    }
}
