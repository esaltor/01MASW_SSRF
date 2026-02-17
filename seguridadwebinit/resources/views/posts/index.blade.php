@extends('layouts.app')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>Posts</h1>
        <a href="{{ route('posts.create') }}" class="btn btn-primary">Create Post</a>
    </div>

    @foreach($posts as $post)
        <div class="card mb-2">
            <div class="card-body">
                <h5 class="card-title">{{ $post->title }}</h5>
                <p class="card-text">{{ Str::limit($post->content, 200) }}</p>
                <a href="{{ route('posts.show', $post) }}" class="btn btn-sm btn-outline-secondary">View</a>
                @can('update', $post)
                    <a href="{{ route('posts.edit', $post) }}" class="btn btn-sm btn-warning">Edit</a>
                @endcan
                @role('admin')
                    <a href="{{ route('posts.edit', $post) }}" class="btn btn-sm btn-warning">Edit</a>
                <!--@can('delete', $post)-->
                    <form action="{{ route('posts.destroy', $post) }}" method="POST" class="d-inline"
                        onsubmit="return confirm('Delete this post?');">
                        @csrf
                        @method('DELETE')
                        <button class="btn btn-sm btn-danger">Delete</button>
                    </form>
                <!--@endcan-->
                @endrole
            </div>
        </div>
    @endforeach
@endsection
