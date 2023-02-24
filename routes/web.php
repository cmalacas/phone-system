<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/company/{id}/script', function() {
    return view('layouts.app');
});

Route::get('/company/{id}/vm', 'CompanyController@vm');

Route::get('/company/{id}/greeting', 'CompanyController@greeting');

Route::post('/companies/script', 'CompanyController@script');

Auth::routes();

Route::group(['middleware' => 'auth:web'], function() {

    Route::get('/', function () {
        return view('layouts.app');
    }); 


    Route::prefix('/dashboard')->group(function() {

        Route::get('/', function () {
            return view('layouts.app');
        });

        Route::post('/save', 'DashboardController@save');
        Route::get('/{id}/success', 'DashboardController@success');

    });

    Route::post('/get-user-data', 'UserController@get');

    Route::prefix('/companies')->group(function() {

        Route::post('/save', 'CompanyController@save');
        Route::post('/get', 'CompanyController@get');   
        Route::post('/update', 'CompanyController@update');
        Route::post('/delete', 'CompanyController@delete');     
        Route::post('/save-scripts', 'CompanyController@saveScripts');
        Route::post('/greetings', 'CompanyController@greetings');     
        Route::post('/responses', 'CompanyController@responses');     

        Route::post('/upload', 'CompanyController@upload');

    });

    Route::prefix('/contacts')->group(function() {

        Route::post('/{id}/get', 'ContactController@get');
        Route::post('/save', 'ContactController@save');   
        Route::post('/update', 'ContactController@update');
        Route::post('/delete', 'ContactController@delete');     
        

    });


    Route::prefix('/greetings')->group(function() {

        Route::get('/', function () {
            return view('layouts.app');
        });

        Route::post('/get', 'GreetingController@get');
        Route::post('/save', 'GreetingController@save');
        Route::post('/update', 'GreetingController@update');
        Route::post('/delete', 'GreetingController@delete');     
        
    });

    Route::prefix('/responses')->group(function() {

        Route::get('/', function () {
            return view('layouts.app');
        });

        Route::post('/get', 'ResponseController@get');
        Route::post('/save', 'ResponseController@save');
        Route::post('/update', 'ResponseController@update');
        Route::post('/delete', 'ResponseController@delete');

    });

});
