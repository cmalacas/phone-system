<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use Illuminate\Http\Request;

use Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {

        $email = $request->get('email');

        $password = $request->get('password');

        $loginData = ['email' => $email, 'password' => $password];

        if (Auth::attempt($loginData)) {

            return response()->json(['success' => 1, 'redirect' => '/dashboard']);

        } else {

            return response()->json(['success' => 0, 'redirect' => '/login']);

        }

    }

    public function logout()
    {
        Auth::logout();
        return redirect()->to('/login');
    }
}
