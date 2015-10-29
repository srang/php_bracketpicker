function displayNextRoundWinValue( val )
{
	window.status = "A win in the next round for this team is worth " + val;
	return true;
}

function clearStatus()
{
	window.status = "";
	return true;
}
