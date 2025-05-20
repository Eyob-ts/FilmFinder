<<<<<<< HEAD

=======
>>>>>>> f2459fa161e10511d226eef39e58ec0ae3c681b0
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
<<<<<<< HEAD
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getUser']);
});
=======

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
>>>>>>> f2459fa161e10511d226eef39e58ec0ae3c681b0
