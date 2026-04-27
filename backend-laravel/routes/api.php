<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrgnizerController;
use App\Http\Controllers\OrganizerAuthController;
use App\Http\Controllers\BookinController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//authentication rout
//Sigh Up
Route::post("/signup", [OrganizerAuthController::class, 'signup']);

//Log In
Route::post("/login", [OrganizerAuthController::class, 'login']);


Route::group(['middleware'=>"auth:sanctum"], function(){
    //Get route
    Route::get('/add', [OrgnizerController::class, 'getAllEvents']);
    
    //Post route
    Route::post('/add', [OrgnizerController::class, 'createEvent']);
    
    //Delete Route
Route::delete('/add/{id}', [OrgnizerController::class, 'deleteEvent']);

//Edit Route
Route::put('/add/{id}', [OrgnizerController::class, 'updateEvent']);

//show product by id
Route::get('/add/{id}', [OrgnizerController::class, 'eventById']);

//Event booking by user
Route::post('/join-event', [BookinController::class, 'joinEvent']);
});


Route::get("/login", [OrganizerAuthController::class, 'login'])->name('login');
