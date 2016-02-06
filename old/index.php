<?php
require_once('fragments/constants.php');
include(SERVER_ROOT . 'fragments/header.php');
?>

<div id='smack-carousel' class='carousel slide' data-ride='carousel'>
  <!-- Wrapper for slides -->
  <ol class='carousel-indicators'>
    <li data-target='#smack-carousel' data-slide-to='0' class='active'></li>
    <li data-target='#smack-carousel' data-slide-to='1'></li>
    <li data-target='#smack-carousel' data-slide-to='2'></li>
    <li data-target='#smack-carousel' data-slide-to='3'></li>
    <li data-target='#smack-carousel' data-slide-to='4'></li>
    <li data-target='#smack-carousel' data-slide-to='5'></li>
    <li data-target='#smack-carousel' data-slide-to='6'></li>
  </ol>
  <div class='row'>
    <div class='col-md-12'>
    <div class='col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4'>
      <div class='carousel-inner'>
        <div class='item active'>
          <div class='carousel-content'>
            <div>
              <h3>#1: Bill Friedman</h3>
              <p>Harvard is the best school on the planet!</p>
            </div>
          </div>
        </div>
        <div class='item'>
          <div class='carousel-content'>
            <div>
              <h3>#2: Sam Rang</h3>
              <p>
                This is another much longer item. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Animi, sint fuga temporibus nam
                saepe delectus expedita vitae.
              </p>
            </div>
          </div>
        </div>
        <div class='item'>
          <div class='carousel-content'>
            <div>
              <h3>#3: Jake Friedman</h3>
              <p>
                My name is Jake Friedman and I am a banana. I like big spoons
                and tend to be grouchy when its past my bedtime.
              </p>
            </div>
          </div>
        </div>
        <div class='item'>
          <div class='carousel-content'>
            <div>
              <h3>#4: Jake Friedman</h3>
              <p>
                This is another item but I am running out of ideas for what to put
                here so I'm just writing whatever comes into my head at the time.
              </p>
            </div>
          </div>
        </div>
        <div class='item'>
          <div class='carousel-content'>
            <div>
              <h3>#5: Jake Friedman</h3>
              <p>
                Dke is the best frat. All the others suck. Delta Kappa Epsilon.
                Ra ra duck.
              </p>
            </div>
          </div>
        </div>
        <div class='item'>
          <div class='carousel-content'>
            <div>
              <h3>#6: Mario</h3>
              <p>
                Its-a-meee!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <!-- Controls --> <a class='left carousel-control' href='#smack-carousel' data-slide='prev'>
    <span class='glyphicon glyphicon-chevron-left'></span>
  </a>
  <a class='right carousel-control' href='#smack-carousel' data-slide='next'>
    <span class='glyphicon glyphicon-chevron-right'></span>
  </a>

</div>
<div class='container main-content'>
  <div class='modal fade basic-modal' tabindex='-1' role='dialog' aria-labelledby='basic-modal' aria-hidden='true'>
    <div class='modal-dialog'>
      <div class='modal-content'>
        <div class='modal-header'>
          <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>x</button>
        </div>
        <form class='form-signin'>
          <h2 class='form-signin-heading'>Please Sign In</h2>
          <label for='inputemail' class='sr-only'>email address</label>
          <input type='email' id='inputemail' class='form-control' placeholder='email address' required autofocus>
          <label for='inputpassword' class='sr-only'>password</label>
          <input type='password' id='inputpassword' class='form-control' placeholder='password' required>
          <div class='checkbox'>
            <label>
              <input type='checkbox' value='remember-me'> remember me
            </label>
          </div>
          <button class='btn btn-lg btn-primary btn-block' type='submit'>Sign In</button>
        </form>
      </div>
    </div>
  </div>
  <!-- Example row of columns -->
  <div class='row'>
    <div class='jumbotron'>
      <h1 class='jumbo-title'>It's that time again!</h1>
      <p>
        It feels like the season just started an already it is tournament time, but this year we are unveiling
        our brand new site so wipe away those tears and click sign up now! We promise not to share any information<br />
        ...unless you don't pick Duke to win it all, in which case I know a Nigerian prince who is in dire need. But
        seriously this is our attempt to upgrade to the future of the interwebs and I personally hope you join us!!
      </p>
      <p>
        <a class='btn btn-primary btn-lg' href='<?php echo BASE_URL; ?>signup/'>Sign Up!</a>
        <button type='button' class='btn btn-success btn-lg' data-toggle='modal' data-target='.basic-modal'>Login</button>
      </p>
    </div>
  </div>
  <div class='row'>
    <div class='col-md-4 col-xs-12 app-content'>
      <h2>Standings</h2>
      <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
      <p><a class='btn btn-default' href='#' role='button'>View details &raquo;</a></p>
    </div>
    <div class='col-md-4 col-xs-12 app-content'>
      <h2>Brackets</h2>
      <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
      <p><a class='btn btn-default' href='<?php echo BASE_URL; ?>bracket/' role='button'>View details &raquo;</a></p>
    </div>
    <div class='col-md-4 col-xs-12 app-content'>
      <h2>Rules</h2>
      <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
      <p><a class='btn btn-default' href='#' role='button'>View details &raquo;</a></p>
    </div>
  </div>
</div>
</div>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<?php include(SERVER_ROOT . 'fragments/footer.php'); ?>
</body>
</html>
