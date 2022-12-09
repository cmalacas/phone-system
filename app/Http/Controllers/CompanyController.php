<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Company;

class CompanyController extends Controller
{

    public function get() {

        $companies = Company::orderBy('name')->where('deleted', '=', 0)->get();


        return response()->json(['companies' => $companies], 200, [], JSON_NUMERIC_CHECK);

    }


    public function save(Request $request) {

        $company = new Company;

        $company->name = $request->get('name');
        $company->phone_number = $request->get('phone_number');
        $company->direct = $request->get('direct');
        $company->business_activity = $request->get('business_activity');

        $company->save();

        return $this->get();

    }

    public function update(Request $request) {

        $company = Company::find($request->get('id'));

        $company->name = $request->get('name');
        $company->phone_number = $request->get('phone_number');
        $company->direct = $request->get('direct');
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
}
