function showTip( e, val, delay )
{
	if(!e)
	{
		Tip(val,DELAY,delay, FADEIN, 200, FADEOUT, 200);

	}
	else
	{
		// firefox and safari
		Tip(val,DELAY,delay, FADEIN, 200, FADEOUT, 200);
	}

	return true;
}

function clearTip()
{
	UnTip();
	return true;
}
