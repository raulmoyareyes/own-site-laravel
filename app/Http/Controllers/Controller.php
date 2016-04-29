<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, AuthorizesResources, DispatchesJobs, ValidatesRequests;

    /**
     * Controller for index
     *
     * @return Response
     */
    public function showIndex()
    {
        return view('index.layout', ['name' => 'raul']);
    }

    /**
     * Controller for send email
     *
     * @param Request $request
     * @return \Illuminate\View\View|string
     */
    public function sendMail(Request $request)
    {
        $data["name"] = $request->input('name');
        $data["email"] = $request->input('email');
        $data["content"] = $request->input('message');
        $message = view('mail.contact', $data);
        $headers = "Content-Type: text/html; charset=ISO-8859-1\r\n";
        if (mail('info@raulmoya.es', 'Formulario de contacto - raulmoya.es', $message, $headers)) {
            return response()->json(array(
                'status' => 'send',
                'message' => 'Message send!'
            ), 200);
        } else {
            return response()->json(array(
                'status' => 'error',
                'message' => 'An error occurred!'
            ), 500);
        }
//        $sent = Mail::send('mail.contact', $data, function($message)
//        {
//            $message->from('info@raulmoya.es', 'raulmoya.es');
//            $message->to('info@raulmoya.es');
//            $message->subject('Formulario de contacto - raulmoya.es');
//        });
//        if( ! $sent) dd("something wrong");
    }
}
