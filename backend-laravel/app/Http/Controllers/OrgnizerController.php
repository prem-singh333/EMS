<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organizer;

class OrgnizerController extends Controller
{
    // created Event
    function createEvent(Request $req){
        try{
            $data = new Organizer();

            $data->title = $req->title;
            $data->description = $req->description;
            $data->location = $req->location;
            $data->date = $req->date;
            $data->time = $req->time;
            $data->price = $req->price;

            if($data->save()){
                return response()->json([
                    "ststus"=>"success",
                    "message" => "Event created successfuly",
                    "data"=> $data
                ], 200);
            }else{
                return response()->json([
                    "status"=>"error",
                    "message"=>"Failed to save Event"
                ], 400);
            }
        }catch(\Exception $e){
            return response()->json([
                "status"=> "Error",
                "msg"=> $e->getMessage()
            ], 500);
        }

    }

    //Fetched All Events
    function getAllEvents(){
        try{
            $data = Organizer::all();
            return response()->json([
                "status"=>"Success",
                "data"=>$data
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                "status"=>"Error",
                "msg"=> "Failed to fetch",
                "error"=>$e->getMessage()
            ], 400);
        }
    }

    function eventById($id){
        try{
            $data = Organizer::find($id);
            return response()->json([
                "status"=>"Success",
                "data"=>$data
            ], 200);
        }catch(\Exception $e){
            return respronse()->json([
                "status"=>"Error",
                "msg"=>"Failed to fetch",
                "error"=>$e->getMessage()
            ], 400);
        }
        // return Organizer::find($id);
    }

    //Delete event
    function deleteEvent($id){
        try{
            Organizer::destroy($id);
            return response()->json([
                "status"=>"Success",
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                "status"=>"Error",
                "msg"=>"Failed to delete",
                "error"=>$e->getMessage()
            ], 400);
        }
    }


    //Update/Edit Event
    function updateEvent(Request $req){
        try{
            $data = Organizer::find($req->id);
    
            $data->title = $req->title;
            $data->description = $req->description;
            $data->location = $req->location;
            $data->date = $req->date;
            $data->time = $req->time;
            $data->price = $req->price;

            if($data->save()){
                return response()->json([
                    "status"=>"Success",
                    "msg"=>"Event update successfuly",
                    "data"=>$data
                ], 200);
            }
        }catch(\Exception $e){
            return response()->json([
                "status"=>"Error",
                "msg"=> "updation failed",
                "error"=> $e->getMessage()
            ], 400);
        }

    }

}
