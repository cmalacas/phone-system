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
        if (($handle = fopen(storage_path("/csv/phone_sys10.csv"), "r")) !== FALSE) {

            $row = 0;
            
            while (($data = fgetcsv($handle, 10000, ",")) !== FALSE) {

                if ($row > 0) {

                    

                    list($id, 
                        $name, 
                        $first_name, 
                        $last_name, 
                        $email, 
                        $phone_number,
                        $direct,
                        $business_activity,
                        $deleted,
                        $user_id,
                        $created_at,
                        $updated_at,
                        $script,
                        $response, 
                        $call_answering,
                        $voice_mail,
                        $company
                        ) = $data;

                    echo sprintf("%s: %s\n", $id, $name);
                    
                    DB::table('companies')
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
                        ); 

                    }

                    $row++;
            
            }

            fclose($handle);
        }
        
    }
}
