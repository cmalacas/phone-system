<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Greeting;

class GreetingController extends Controller
{

    public function get() {

        $greetings = Greeting::orderBy('name')->get();

        $data['greetings'] = $greetings;

        return response()->json($data, 200, [], JSON_NUMERIC_CHECK);

    }

    public function save(Request $request) {

        $greeting = new Greeting;

        $greeting->name = $request->get('name');
        $greeting->greeting = $request->get('greeting');

        $greeting->save();

        return $this->get($request);

    }

    public function update(Request $request) {

        $greeting = Greeting::find($request->get('id'));

        $greeting->name = $request->get('name');
        $greeting->greeting = $request->get('greeting');

        $greeting->save();

        return $this->get($request);

    }
}
