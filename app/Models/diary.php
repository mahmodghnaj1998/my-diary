<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class diary extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'loction','urlimage','infoimage','description','data','createorid'
    ];

}
