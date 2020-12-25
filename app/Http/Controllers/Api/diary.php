<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\diary as meetup;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class diary extends Controller
{
    public function storge(Request $re)
    {
        $v = Validator::make($re->all(), [
            "title" => "required|string",
            "loction" => "required|string",
            "description" => "required|string",
            "data" => "required|string"
        ]);
        if ($v->fails()) {
            return response()->json([
                "error" => "true",
                "error_stute" => $v->errors()
            ], 201);
        }
        $meet = meetup::create([
            "title" => $re->title,
            "loction" => $re->loction,
            "urlimage" => $re->urlimage,
            "infoimage"=>$re->infoimage,
            "description" => $re->description,
            "data" => $re->data,
            "createorid" => $re->createorid

        ]);
            return  response()->json([
                'sucsess Add Meetups dont image',
                "id" => $meet->id,
            ], 200);

    }
    public function show($id)
    {
        return meetup::where("createorid",$id)->get();
    }
    public function addimage(Request $re,$id){
        if ($re->hasFile('file')) {
            $path =  Storage::putFile('public', $re->file('file'));
            $meet= meetup::find($id);
            $meet->urlimage = substr($path, 7);
            $meet->save();
            return response()->json([
                "Add Meetups image",
                "id"=>$id,
                "path" => substr($path, 7)
            ], 200);
        }
    }
    public function update(Request $re,$id){
       $update= meetup::find($id);
        if($re->title){
            $update->title = $re->title;
            $update->save();
        }
        if($re->description){
            $update->description = $re->description;
            $update->save();
        }
        if($re->data){
            $update->data = $re->data;
            $update->save();
        }
        return response()->json([
            "success update"
        ],200);
    }
}
