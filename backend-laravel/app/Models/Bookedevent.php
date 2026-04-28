<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bookedevent extends Model
{
    protected $fillable = [
        'user_id',
        'event_id'
    ];

    function user(){
        return $this->belongsTO(User::class);
    }
    function event(){
        return $this->belongsTO(Organizer::class);
    }
}
