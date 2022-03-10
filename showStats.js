module.exports = function showStats(key=turn) {
	if (!player[key].human) return;
	var HTML, sq, p;
	var mortgagetext,
	housetext;
	var write;
	HTML = "<table align='center'><tr>";

	for (var x = 1; x <= pcount; x++) {
		write = false;
		p = player[x];
		if (x == 5) {
			HTML += "</tr><tr>";
		}
		HTML += "<td class='statscell' id='statscell" + x + "' style='border: 2px solid " + p.color + "' ><div class='statsplayername'>" + p.name + "</div>";

		for (var i = 0; i < 12; i++) {
			sq = square[i];

			if (sq.owner == x) {
				mortgagetext = "",
				housetext = "";

				if (sq.mortgage) {
					mortgagetext = "title='Hypothek aufgenommen' style='color: grey;'";
				}

				if (!write) {
					write = true;
					HTML += "<table>";
				}

				if (sq.house > 0) {
					housetext += "<span style='float: right; font-weight: bold;'>" + sq.house + "&nbsp;x&nbsp;<img src='./client/images/house.png' alt='' title='House' class='house' style='float: none;' /></span>";
				}

				HTML += "<tr><td class='statscellcolor' style='background: " + sq.color + ";";

				HTML += "' onmouseover='showdeed(" + i + ");' onmouseout='hidedeed();'></td><td class='statscellname' " + mortgagetext + ">" + sq.name + housetext + "</td></tr>";
			}
		}

		if (!write) {
			HTML += p.name + " hat keine Grundstücke.";
		} else {
			HTML += "</table>";
		}

		if (p.motorrad) {
			HTML += "<span><img src='https://upload.wikimedia.org/wikipedia/commons/0/06/Motorrad_aus_Zusatzzeichen_1046-12.svg' title='Motorrad' class='asset' /></span>";
		}
		if (p.yacht) {
			HTML += "<span><img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Segeln_2.svg' title='Yacht' class='asset' /></span>";
		}
		if (p.auto) {
			HTML += "<span><img src='https://upload.wikimedia.org/wikipedia/commons/b/b2/CH-Zusatztafel-Leichte_Motorwagen.svg' title='Auto' class='asset' /></span>";
		}

		HTML += "</td>";
	}
	HTML += "</tr></table><div id='titledeed'></div>";

  SOCKET_LIST[key].emit('showstats', HTML);
}