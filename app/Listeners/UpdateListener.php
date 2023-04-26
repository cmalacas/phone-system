<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\ChangeLog;
use App\User;

class UpdateListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $old = $event->old;
        $updated = $event->updated;

        $module = 'company';

        $results = array_diff_assoc($old, $updated->toArray());

        unset($results['updated_at']);

        if ($results) {

            $user = User::find(auth()->id());

            foreach ($results as $field => $result) {

                $change_log = new ChangeLog;

                $oldValue = $old[$field];
                $newValue = $updated->$field;

                $oldValue = !empty($oldValue) ? $oldValue : '0';
                $newValue = !empty($newValue) ? $newValue : '0';
                
                $change_log['table_id'] = $updated->id;
                $change_log['table_name'] = $module;
                $change_log['field'] = $field;
                $change_log['description'] =  sprintf("%s %s has updated the product field  %s  value from %s to %s", $user->firstname, $user->lastname, $field, $oldValue, $newValue);
                $change_log['old_value'] = $oldValue;
                $change_log['new_value'] = $newValue;
                
                $change_log['modified_user_id'] = auth()->id();

                $change_log->save();
            }
        }
    }
}
