export function formatAMPM(date) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	let currentTime = hours + ':' + minutes + '' + ampm;
	return currentTime;
}

export function checkIfMultiple(props) {}

export function checkifOverlap(props) {}

export function sortArrayByKey(party, key,value) {
	let partiesList;

	partiesList = party.filter((party) => {
		return party[key] === value;
	});

	

	let sortedPartiesList = partiesList.sort(function(p1, p2) {
		if (p1.times.timeStamp >= p2.times.timeStamp) {
			return 1;
		} else {
			// moves larger to the top of array
			return -1;
		}
	});

	return sortedPartiesList;
}
export function sortPartyArray(party, rowNum, seperateByRow) {
	let partiesList;

	if (seperateByRow) {
		partiesList = party.filter((party) => {
			return party.rowNum === rowNum;
		});
	} else {
		partiesList = party;
	}

	let sortedPartiesList = partiesList.sort(function(p1, p2) {
		if (p1.times.timeStamp >= p2.times.timeStamp) {
			return 1;
		} else {
			// moves larger to the top of array
			return -1;
		}
	});

	return sortedPartiesList;
}
