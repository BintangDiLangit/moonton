<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;


class ImageService
{

    public function storeImage($imageFile, $path, $previousImage = null)
    {
        // Generate unique filename with .webp extension
        $filename = $this->generateUniqueFilename('webp');

        // Resize the image
        $resizedImage = $this->resizeImage($imageFile);

        // Stream to S3 and get path
        $this->storeToS3($filename, $resizedImage, $path);

        // If there's a previous image, delete it
        if ($previousImage) {
            $pathPrev = $path;
            $this->deleteFromS3($pathPrev, $previousImage);
        }

        return $filename;
    }

    public function deleteFromS3($pathPrev, $filename)
    {
        Storage::disk('s3')->delete($pathPrev . $filename);
    }

    protected function generateUniqueFilename($extension)
    {
        return uniqid() . strtolower(Str::random(10)) . '.' . $extension;
    }

    protected function resizeImage($imageFile)
    {
        return Image::make($imageFile)
            ->resize(800, null, function ($constraint) {
                $constraint->aspectRatio();
            })
            ->encode('webp', 85);
    }

    protected function storeToS3($filename, $image, $path)
    {
        $s3Path = config('filesystems.disks.s3.path', $path) . $filename;
        Storage::disk('s3')->put($s3Path, (string) $image, 'public');

        return $s3Path;
    }
}
