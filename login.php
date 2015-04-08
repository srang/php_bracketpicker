<?php include("/fragments/meta.php"); ?>
    <link rel="stylesheet" href="css/frontend.css"></link>
  </head>

  <body>
    <div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form class="form-signin">
                  <h2 class="form-signin-heading">Please sign in</h2>
                  <label for="inputEmail" class="sr-only">Email address</label>
                  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                  <label for="inputPassword" class="sr-only">Password</label>
                  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value="remember-me"> Remember me
                    </label>
                  </div>
                  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&amp;times;</button>
                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div class="modal-body">
                    <h3>Modal Body</h3>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
      </div>
    </div>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->

    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
