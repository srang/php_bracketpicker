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
  </ol>
  <div class='row'>
    <div class='col-xs-offset-3 col-xs-6'>
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
              <p>This is another much longer item. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, sint fuga temporibus nam saepe delectus expedita vitae magnam necessitatibus dolores tempore consequatur dicta cumque repellendus eligendi ducimus placeat! Sapiente, ducimus, voluptas, mollitia voluptatibus nemo explicabo sit blanditiis laborum dolore illum fuga veniam quae expedita libero accusamus quas harum ex numquam necessitatibus provident deleniti tenetur iusto officiis recusandae corporis culpa quaerat?</p>
            </div>
          </div>
        </div>
        <div class='item'>
          <div class='carousel-content'>
            <div>
              <h3>#3: Anon</h3>
              <p>This is the third item.</p>
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
    <div class='col-md-4 col-xs-12 app-content'>
      <h2>Standings</h2>
      <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
      <p><a class='btn btn-default' href='#' role='button'>View details &raquo;</a></p>
    </div>
    <div class='col-md-4 col-xs-12 app-content'>
      <h2>Brackets</h2>
      <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
      <p><a class='btn btn-default' href='#' role='button'>View details &raquo;</a></p>
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
