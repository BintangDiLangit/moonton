<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Movie\Store;
use App\Models\Movie;
use Illuminate\Support\Str;
use App\Helpers\ImageService;

class MovieController extends Controller
{
    public function index()
    {
        return inertia('Admin/Movie/Index');
    }

    public function create()
    {
        return inertia('Admin/Movie/Create');
    }

    public function store(Store $request, ImageService $imageService)
    {
        $data = $request->validated();

        $data['thumbnail'] = $imageService->storeImage($request->file('thumbnail'), 'storage/movies/');

        $data['slug'] = Str::slug($data['name']);

        $movie = Movie::create($data);

        return redirect(route('admin.dashboard.movie.index'))->with([
            'message' => 'Movie inserted successfully',
            'type' => 'success'
        ]);
    }
}
