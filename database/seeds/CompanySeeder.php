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
        if (($handle = fopen(storage_path("/csv/company.csv"), "r")) !== FALSE) {
            
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {

                list($phone_number, $direct, $name) = $data;
                
                DB::table('companies')
                    ->insert(
                        [
                            'name' => $name,
                            'phone_number' => $phone_number,
                            'direct' => $direct,
                        ]
                    ); 
            
            }

            fclose($handle);
        }
        
    }
}
