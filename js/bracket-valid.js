function validateFields( alertText )
{
	for( var i=1; i<64; i++ )
	{
		var field = document.getElementsByName('game'+i)[0];
		if( field.value == "" )
		{
			alert( "You must pick a winner for this game." );
			field.focus();
			return false;
		}
	}
	
	var moreFields = new Array('bracketname','name','e-mail','tiebreaker');
	
	for( var i=0; i < moreFields.length; i++ )
	{
		var field = document.getElementsByName( moreFields[i] )[0];
		if( field.value == "" )
		{
			alert( "You must fill out this field");
			field.focus();
			return false;
		}
	}
	
	if( alertText != "" )
	{
		return window.confirm(alertText);
	}
	else
	{
		return true;
	}
}
