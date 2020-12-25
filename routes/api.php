<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\authapi;
use Illuminate\Routing\RouteGroup;
use App\Http\Controllers\Api\diary;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middeware' => 'auth:api'], function () {
    Route::post('/login', [authapi::class, 'login']); //login
    Route::post('/register',[authapi::class, 'register']);
    Route::post('/logout', [authapi::class, 'logout']); //logout
    Route::post('/refresh', [authapi::class, 'refresh']); //refresh token
    Route::post('/user', [authapi::class, 'me']); //fache data user
    Route::Post('/createMeetups', [diary::class, "storge"]);//strong diary in database
    Route::Post('/addimage/{id}', [diary::class, "addimage"]);//add image to diary
    Route::Post('/update/{id}', [diary::class, "update"]);//update diary
    Route::get('/loademeetup/{id}', [diary::class, "show"]);//show all diary by id
});
