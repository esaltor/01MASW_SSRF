@extends('layouts.app')

@section('content')
    <h1>Create Post</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('posts.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label class="form-label">Title</label>
            <input name="title" class="form-control" value="{{ old('title') }}">
        </div>

        <div class="mb-3">
            <label class="form-label">Content</label>
            <textarea name="content" rows="6" class="form-control">{{ old('content') }}</textarea>
        </div>

        <button class="btn btn-primary">Save</button>
    </form>
@endsection