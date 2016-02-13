@if (Session::has('alert'))
    <div class="alert alert-{{ Session::get('alert')['level'] }} alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {{ Session::get('alert')['message'] }}
    </div
    {{ Session::forget('alert') }}
@endif
