<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Movie\Store;
use App\Models\Movie;
use Illuminate\Support\Str;
use App\Helpers\ImageService;
use App\Http\Requests\Admin\Movie\Update;

class MovieController extends Controller
{
    private $imageUrl;

    public function __construct()
    {
        $this->imageUrl = env('IMAGE_URL');
    }

    public function index()
    {
        $movies = Movie::withTrashed()->orderBy('deleted_at')->get();
        return inertia('Admin/Movie/Index', [
            'movies' => $movies,
            'imageUrl' => $this->imageUrl
        ]);
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

    public function edit(Movie $movie)
    {
        return inertia('Admin/Movie/Edit', [
            'movie' => $movie,
            'imageUrl' => $this->imageUrl
        ]);
    }

    public function update(Update $request, ImageService $imageService, Movie $movie)
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $imageService->storeImage($request->file('thumbnail'), 'storage/movies/');
            $imageService->deleteFromS3('storage/movies/', $movie->thumbnail);
        } else {
            $data['thumbnail'] = $movie->thumbnail;
        }


        $movie->update($data);

        return redirect(route('admin.dashboard.movie.index'))->with(
            [
                'message' => 'Movie updated successfully',
                'type' => 'success'
            ]
        );
    }

    public function destroy(Movie $movie)
    {
        $movie->delete();
        return redirect(route('admin.dashboard.movie.index'))->with(
            [
                'message' => 'Movie deleted successfully',
                'type' => 'success'
            ]
        );
    }

    public function restore($movie)
    {
        $movie = Movie::withTrashed()->findOrFail($movie);
        $movie->restore();
        return redirect(route('admin.dashboard.movie.index'))->with(
            [
                'message' => 'Movie restored successfully',
                'type' => 'success'
            ]
        );
    }
}
