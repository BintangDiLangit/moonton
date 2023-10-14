<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movies = [
            [
                'name' => 'The Pirates of The Carribean',
                'slug' => 'the-pirates-of-the-carribean',
                'category' => 'Comedy',
                'video_url' => 'https://www.youtube.com/watch?v=6zTc2hD2npA',
                'thumbnail' => 'https://i.ytimg.com/vi/6zTc2hD2npA/maxresdefault.jpg',
                'rating' => 9.5,
                'is_featured' => false
            ],
            [
                'name' => 'The Pirates Trilogy is Pure Bliss',
                'slug' => 'the-pirates-trilogy-is-pure-bliss',
                'category' => 'Drama',
                'video_url' => 'https://www.youtube.com/watch?v=YtEYWMuw5c8',
                'thumbnail' => 'https://msmagazine.com/wp-content/uploads/2011/05/pirates-penelope-cruz-poster__oPt.jpg',
                'rating' => 8.5,
                'is_featured' => true
            ],
            [
                'name' => 'The Pirates of the Carribean 2',
                'slug' => 'the-pirates-of-the-carribean-2',
                'category' => 'Comedy',
                'video_url' => 'https://www.youtube.com/watch?v=yRh-dzrI4Z4',
                'thumbnail' => 'https://m.media-amazon.com/images/M/MV5BMTYyMTcxNzc5M15BMl5BanBnXkFtZTgwOTg2ODE2MTI@._V1_FMjpg_UX1000_.jpg',
                'rating' => 8.2,
                'is_featured' => false
            ]
        ];

        Movie::insert($movies);
    }
}
