module.exports = function showStats(game, key) {
	if (!game.player[key].human) return;
	var HTML, sq, p;
	var mortgagetext,
	housetext;
	var write;
	HTML = "<table align='center'><tr>";

	for (var x = 1; x <= game.pcount; x++) {
		write = false;
		p = game.player[x];
		if (x == 5) {
			HTML += "</tr><tr>";
		}
		HTML += "<td class='statscell' id='statscell" + x + "' style='border: 2px solid " + p.color + "' ><div class='statsplayername'>" + p.name + "</div>";

		for (var i = 0; i < 12; i++) {
			sq = game.square[i];

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
					housetext += "<span style='float: right; font-weight: bold;'>" + sq.house + "&nbsp;x&nbsp;<i class=\"fa-solid fa-house\" title='House' class='house' style='float: none;' ></i></span>";
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
			HTML += "<span><i class=\"fa-solid fa-motorcycle\"></i></span>";
		}
		if (p.yacht) {
			HTML += "<span><i class=\"fa-solid fa-sailboat\"></i></span>";
		}
		if (p.auto) {
			HTML += "<span><i class=\"fa-solid fa-car\"></i></span>";
		}

		HTML += "</td>";
	}
	HTML += "</tr></table><div id='titledeed'></div>";

  	game.showStats(HTML, key);
}