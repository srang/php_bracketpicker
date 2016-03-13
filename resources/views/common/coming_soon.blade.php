<div class="jumbotron">
    <h2>Welcome, {{ $user->name }}!</h2>
    <p>
        This part of the site is still under construction. We will let you know when
        more content is available here but for now, this is a place holder to let you
        know that more stuff is coming! If you have ideas what you want most in this
        area feel free to send us some <a href="{{ url('/feedback') }}">Feedback</a>
        and we will take it into consideration!
    </p>
</div>
@include('common.back_button',[ 'back_link'=>url('/home')])
