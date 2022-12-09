<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Company;
use App\Greeting;
use App\Response;

use DB;

class CompanyController extends Controller
{

    public function get() {

        $companies = Company::select(
                            'companies.*',
                            DB::raw('(SELECT GROUP_CONCAT(CONCAT(firstname, " ", lastname) SEPARATOR ", ") FROM contacts WHERE company_id = companies.id LIMIT 1) as names')
                        )
                        ->orderBy('name')
                        ->where('deleted', '=', 0)
                        ->get();

        $data = [
                    'companies' => $companies,
                    'greetings' => Greeting::orderBy('name')->get(),
                    'responses' => Response::orderBy('name')->get()
                ];

        return response()->json($data, 200, [], JSON_NUMERIC_CHECK);

    }


    public function save(Request $request) {

        $company = new Company;

        $company->name = $request->get('name');
        $company->phone_number = $request->get('phone_number');
        $company->direct = $request->get('direct');
        $company->email = $request->get('email');
        $company->business_activity = $request->get('business_activity');

        $company->save();

        return $this->get();

    }

    public function update(Request $request) {

        $company = Company::find($request->get('id'));

        $company->name = $request->get('name');
        $company->phone_number = $request->get('phone_number');
        $company->direct = $request->get('direct');
        $company->email = $request->get('email');
        $company->business_activity = $request->get('business_activity');

        $company->save();

        return $this->get();

    }

    public function delete(Request $request) {

        $company = Company::find($request->get('id'));

        $company->deleted = 1;

        $company->save();

        return $this->get();

    }

    public function saveScripts(Request $request) {

        $company = Company::find($request->get('id'));

        $company->greeting = $request->get('greeting');
        $company->response = $request->get('response');
        $company->call_answering = $request->get('call_answering');
        $company->voicemail = $request->get('voicemail');

        $company->save();

        return response()->json(['success' => 1], 200, [], JSON_NUMERIC_CHECK);

    }

    public function greetings(Request $request) {

        $company = Company::find($request->get('company_id'));

        $g = Greeting::find($request->get('greeting_id'));

        $str = ['[company]'];

        $values = [$company->name];

        $greeting = str_replace($str, $values, $g->greeting);

        return response()->json(['greeting' => $greeting], 200, [], JSON_NUMERIC_CHECK);

    }

    public function responses(Request $request) {

        $company = Company::find($request->get('company_id'));

        $res = Response::find($request->get('response_id'));

        $str = ['[company]'];

        $values = [$company->name];

        $response = str_replace($str, $values, $res->response);

        return response()->json(['response' => $response], 200, [], JSON_NUMERIC_CHECK);

    }

    public function script(Request $request) {

        $phone = $request->get('phone');

        $company = DB::table('companies')
                    ->select(
                            'companies.*',
                            DB::raw('(SELECT GROUP_CONCAT(CONCAT(firstname, " ", lastname) SEPARATOR ", ") FROM contacts WHERE company_id = companies.id LIMIT 1) AS names')
                        )
                    ->whereRaw("REPLACE(phone_number, ' ', '') = '$phone'")
                    ->first();

    
        $data['company'] = $company;

        return response()->json($data, 200, [], JSON_NUMERIC_CHECK);


    }
    
}
