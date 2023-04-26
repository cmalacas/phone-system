<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public function logs() {

        return $this->hasMany('App\ChangeLog', 'table_id');

    }
}
