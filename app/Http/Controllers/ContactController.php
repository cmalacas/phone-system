<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Contact;

use DB;

class ContactController extends Controller
{
    public function get(Request $request, $id)  {

        $contacts = Contact::select(
                                DB::raw('contacts.*'),
                                DB::raw('CONCAT(firstname, " ", lastname) as contact_name')
                            )
                        ->where('company_id','=', $id)
                        ->where('deleted', '=', 0)
                        ->get();


        return response()->json(['contacts' => $contacts], 200, [], JSON_NUMERIC_CHECK);

    }

    public function save(Request $request) {

        $contact = new Contact;

        $contact->firstname = $request->get('firstname');
        $contact->lastname = $request->get('lastname');
        $contact->position = $request->get('position');
        $contact->phone_number = $request->get('phone_number');
        $contact->email = $request->get('email');
        $contact->company_id = $request->get('company_id');

        $contact->save();

        return $this->get($request, $contact->company_id);


    }

    public function update(Request $request) {

        $contact = Contact::find($request->get('id'));

        $contact->firstname = $request->get('firstname');
        $contact->lastname = $request->get('lastname');
        $contact->position = $request->get('position');
        $contact->phone_number = $request->get('phone_number');
        $contact->email = $request->get('email');
     
        $contact->save();

        return $this->get($request, $contact->company_id);

        
    }

    public function delete(Request $request) {

        $contact = Contact::find($request->get('id'));

        $contact->deleted = 1;

        $contact->save();

        return $this->get($request, $contact->company_id);
    }

}
