<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>Activate Your {{ $tourney_name }} Account!</h2>

<div>
    Welcome {{ $name }} to the {{ $tourney_name }} site! Please verify your email by going to our <a href="{{ url('/verify/').$token }}">email verification page</a>
</div>

</body>
</html>
