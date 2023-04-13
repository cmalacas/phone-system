<?php

use Illuminate\Database\Seeder;



class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (($handle = fopen(storage_path("/csv/scripts13.csv"), "r")) !== FALSE) {

            $row = 0;
            
            while (($data = fgetcsv($handle, 10000, ",")) !== FALSE) {

                if ($row > 0) {

                    

                    list($id,               //a
                        $name,              //b
                        $first_name,        //c
                        $last_name,         //d
                        $email,             //e
                        $phone_number,      //f
                        $direct,             //g
                        $business_activity, //h
                        $deleted,           //i
                        $user_id,           //j
                        $created_at,        //k
                        $updated_at,        //l
                        $script,            //m
                        $response,          //n
                        $call_answering,    //o
                        $voice_mail,        //p
                        $company,           //q
                        $temp1,             //r
                        $temp2,             //s
                        $temp3,             //t
                        $script2,           //u
                        $script3            //v
                        ) = $data;

                    echo sprintf("%s: %s\n", $id, trim($name));

                    $company = DB::table('companies')
                                ->where('name', '=', trim($name))
                                ->first();

                    if ($company) {

                        DB::table('companies')
                            ->where('id', $company->id)
                            ->update(['greeting' => $script2]);

                    }
                    
                    /* DB::table('companies')
                        ->insert(
                            [
                                'name' => $name,
                                'phone_number' => $phone_number,
                                'direct' => $direct,
                                'contact_firstname' => $first_name,
                                'contact_lastname' => $last_name,
                                'email' => $email,
                                'business_activity' => $business_activity,
                                'greeting' => $script,
                                'call_answering' => (int)$call_answering,
                                'voicemail' => (int)$voice_mail,
                                'company' => $company
                            ]
                        );  */

                    } 

                    $row++;
            
            }

            fclose($handle);
        }
        
    }
}
