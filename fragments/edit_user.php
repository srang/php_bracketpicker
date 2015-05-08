<form class='form-horizontal'>
  <fieldset>
    <!--<legend>Legend</legend>-->
    <div class='row'>
      <div class='col-lg-6'>
        <div class='form-group'>
          <label for='inputFirstName' class='col-lg-2 control-label'>First</label>
          <div class='col-lg-10 col-md-12'>
            <input id='inputFirstName' class='form-control' placeholder='First Name' type='text' name='firstName'>
          </div>
        </div>
      </div>
      <div class='col-lg-6'>
        <div class='form-group'>
          <label for='inputLastName' class='col-lg-2 control-label'>Last</label>
          <div class='col-lg-10 col-md-12'>
            <input id='inputLastName' class='form-control' placeholder='Last Name'type='text' name='lastName'>
          </div>
        </div>
      </div>
    </div>
    <div class='form-group'>
      <label for='inputEmail' class='col-lg-1 control-label'>Email</label>
      <div class='col-lg-11'>
        <input class='form-control' id='inputEmail' placeholder='Email' type='email'>
      </div>
    </div>
    <div class='form-group'>
      <label for='inputPassword' class='col-lg-1 control-label'>Password</label>
      <div class='col-lg-11'>
        <input class='form-control' id='inputPassword' placeholder='Password' type='password' name='password'>
      </div>
    </div>
    <div class='form-group'>
      <label for='confirmPassword' class='col-lg-1 control-label'>Confirm</label>
      <div class='col-lg-11'>
        <input class='form-control' id='confirmPassword' placeholder='Retype Password' type='password' name='confirm'>
      </div>
    </div>
    <div class='form-group'>
      <label for='textArea' class='col-lg-2 control-label'>Textarea</label>
      <div class='col-lg-10'>
        <textarea class='form-control' rows='3' id='textArea'></textarea>
        <span class='help-block'>A longer block of help text that breaks onto a new line and may extend beyond one line.</span>
      </div>
    </div>
    <div class='form-group'>
      <label class='col-lg-2 control-label'>Radios</label>
      <div class='col-lg-10'>
        <div class='radio'>
          <label>
            <input name='optionsRadios' id='optionsRadios1' value='option1' checked='' type='radio'>
            Option one is this
          </label>
        </div>
        <div class='radio'>
          <label>
            <input name='optionsRadios' id='optionsRadios2' value='option2' type='radio'>
            Option two can be something else
          </label>
        </div>
      </div>
    </div>
    <div class='form-group'>
      <label for='select' class='col-lg-2 control-label'>Selects</label>
      <div class='col-lg-10'>
        <select class='form-control' id='select'>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <br>
        <select multiple='' class='form-control'>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    <div class='form-group'>
      <div class='col-lg-10 col-lg-offset-2'>
        <button type='reset' class='btn btn-default'>Cancel</button>
        <button type='submit' class='btn btn-primary'>Submit</button>
      </div>
    </div>
  </fieldset>
</form>
