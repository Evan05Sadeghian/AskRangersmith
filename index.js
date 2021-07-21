const submitBtn = document.getElementById("search");
const userInput = document.getElementById("userNameInput");

const infoTab = document.getElementById("infoTab");
const alertsTab = document.getElementById("alertsTab");
const discoverTab = document.getElementById("discoverTab");

submitBtn.addEventListener("click", function (event) {
	event.preventDefault();

	const searchedPark = userInput.value;

	if (!searchedPark) {
		console.log("No user input");
		return;
	}

	console.log(searchedPark);

	fetch(
		`https://developer.nps.gov/api/v1/parks?limit=1000&api_key=6epIsxoIg6qDk5kVJG3Wbc2Wkz3uUT7dr2Jah841`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log("data", data);

			var userPark = data.data.filter(function (park) {
				return park.fullName === searchedPark;
			});

			if (userPark.length == 0) {
				console.log("No results from search");

				discoverTab.innerHTML = `
				<h1 class="red-text"> No park found with this name </h1>

				<h4 class="red-text"> Please note, parks are case sensitive </h4>
				`;
			}

			console.log("User Searched Park", userPark);

			// Park Description
			// Directions URL
			// Entrance Fees - Array
			// Activities - Array

			var activities = document.createElement("div");
			var fees = document.createElement("div");

			userPark[0].activities.forEach(function (activity) {
				let p = document.createElement("p");

				p.classList.add("col");
				p.classList.add("s3");

				p.innerHTML = `${activity.name}`;

				activities.append(p);
			});

			userPark[0].entranceFees.forEach(function (fee) {
				let p = document.createElement("p");

				p.innerHTML = `
					<h5> ${fee.title} | $${fee.cost} </h5>
					<p> ${fee.description} </p>
				`;

				fees.append(p);
			});

			infoTab.innerHTML = `
				<p> ${userPark[0].description} </p>
				<br/>
				<div>
					<h5 class="#1565c0 blue-text text-darken-3">Fees</h5>
					<div id="fees">
					</div>
				</div>
				<br/>
				<div>
					<h5 class="#1565c0 blue-text text-darken-3">Activities</h5>

					<div class="row" id="activities">
					</div>
				</div>
			`;

			const feesDiv = document.getElementById("fees");
			const activitiesDiv = document.getElementById("activities");

			feesDiv.append(fees);
			activitiesDiv.append(activities);

			// Addresses
			// Phone Numbers

			// Created div to append all addresses to
			var addresses = document.createElement("div");

			// Appending each address to created address div
			userPark[0].addresses.forEach(function (address) {
				let p = document.createElement("p");

				p.innerHTML = `
					<div> ${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode} </div>
				`;

				addresses.append(p);
			});

			// Created phone number div
			var phones = document.createElement("div");

			// Appending each Phone number to created phone number div
			userPark[0].contacts.phoneNumbers.forEach(function (number) {
				let p = document.createElement("p");

				p.innerHTML = `
					<p> ${number.type} </p>
					<h5> ${number.phoneNumber}</h5>
				`;

				phones.append(p);
			});

			discoverTab.innerHTML = `
			<img src="${userPark[0].images[0].url}" alt=" ${userPark[0].images[0].altText}" class="responsive-img materialboxed" />

			<h1 class="#1565c0 blue-text text-darken-3"> ${userPark[0].fullName} </h1>
			<br/>

			<div>
				<h5 class="#1565c0 blue-text text-darken-3">Weather Info</h5>
				<div> ${userPark[0].weatherInfo} </div>
			</div>

			<br/>

			<div>
				<h5 class="#1565c0 blue-text text-darken-3">Address</h5>

				<div id="addresses"> 
				</div>
				<a href="${userPark[0].directionsUrl}" target="_blank">Driving Directions</a>
			</div>

			<br/>

			<div>
				<h5 class="#1565c0 blue-text text-darken-3" >Hours of Operation</h5>
				<div> ${userPark[0].operatingHours[0].description} </div>
			</div>

			<br/>

			<div>
				<h5 class="#1565c0 blue-text text-darken-3">Contact Info</h5>

				<div id="phoneNumbs">
				</div>

				<a href="${userPark[0].url}" target="_blank">More Info</a>
			</div>
			`;

			const addressDiv = document.getElementById("addresses");
			const phoneDiv = document.getElementById("phoneNumbs");
			addressDiv.append(addresses);
			phoneDiv.append(phones);

			fetch(
				`https://developer.nps.gov/api/v1/alerts?parkCode=${userPark[0].parkCode}&api_key=6epIsxoIg6qDk5kVJG3Wbc2Wkz3uUT7dr2Jah841`
			)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log(data);

					let div = document.createElement("div");

					data.data.forEach(function (alert) {
						let p = document.createElement("p");

						p.innerHTML = `
							<h4> ${alert.category} </h4> 
							<div> ${alert.description} </div>
						`;

						div.append(p);
					});

					alertsTab.append(div);
				});
		})
		.catch(function (error) {
			console.log("Catch Error", error);
		});
});

//phone number
//<div> ${userPark[0].contacts[0].phoneNumbers[1].phoneNumber} </div>
//email
//<div> ${userPark[0].contacts[0].emailAddresses[o].emailAddress} <div>

// console.log("User Searched Park, userPark")
//fetch(
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={bd54b8f9736f266e782c32ce446f882a}
// )
