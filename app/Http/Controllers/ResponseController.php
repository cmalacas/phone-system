<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Response;

class ResponseController extends Controller
{
    public function get() {

        $responses = Response::orderBy('name')->get();

        $data['responses'] = $responses;

        return response()->json($data, 200, [], JSON_NUMERIC_CHECK);

    }

    public function save(Request $request) {

        $response = new Response;

        $response->name = $request->get('name');
        $response->response = $request->get('response');

        $response->save();

        return $this->get($request);

    }

    public function update(Request $request) {

        $response = Response::find($request->get('id'));

        $response->name = $request->get('name');
        $response->response = $request->get('response');

        $response->save();

        return $this->get($request);

    }
}
