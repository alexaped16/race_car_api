
{
    let form = document.getElementById('motorForm');
    console.log(form)
    
    async function handleSubmit(e){
        e.preventDefault();
        let season = e.target.season.value;
        let round = e.target.round.value;
        console.log(season, round);

        let motor = await getMotorInfo(season, round)
        console.log(motor)
        
       
        await buildMotorCard(season, round);
        e.target.season.value = '';
        e.target.round.value = '';
        }

    async function getMotorInfo(season, round){
        try{
            let res = await fetch(`http://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
            let data = await res.json()
            return data['DriverStandings']
        } catch(e){
            console.error(e)
        }}
    


     // function to build the card 
     async function buildMotorCard(driverStandings)
        const card = document.createElement('div');
        card.className = 'card';

        // Create card body div
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body'

        
        const motorTitle = document.createElement('h5');
        motorTitle.className = 'card-title';
        motorTitle.innerHTML = driver 

        const position = document.createElement('p');
        position.className = 'card-text';
        position.innerHTML = `Position: ${driverStandings.position}`;

        const driverName = document.createElement('p');
        driverName.className = 'card-text';
        driverName.innerHTML = `Driver Name: ${driverStandings.driverName}`;

        // Append 
        cardBody.append(motorTitle);
        cardBody.append(position);
        cardBody.append(driverName)

        // Add card body to card div
        card.append(cardBody);

        // Create column div
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3';

        // Add the card to the column
        col.append(card);

        // Get the country Display row
        const motorDisplayRow = document.getElementById('motorDisplay');

        // Add new column to the display
        motorDisplayRow.append(col);

    }

    // Add submit event listener to form
    form.addEventListener('submit', handleSubmit);

}

