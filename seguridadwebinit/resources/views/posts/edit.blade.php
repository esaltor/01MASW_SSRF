@extends('layouts.app')

@section('content')
    <h1>Edit Post</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('posts.update', $post) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label class="form-label">Title</label>
            <input name="title" class="form-control" value="{{ old('title', $post->title) }}">
        </div>

        <div class="mb-3">
            <label class="form-label">Content</label>
            <textarea name="content" rows="6" class="form-control">{{ old('content', $post->content) }}</textarea>
        </div>

        <button class="btn btn-primary">Update</button>
    </form>
@endsection