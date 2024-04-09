$(document).ready(function() {
    $('#searchForm').submit(function (e) {
        e.preventDefault();
        const searchTerm = $('#searchTerm').val(); //user input ----search term

    const params = {
        term: searchTerm,                   //change this to user input - value from form
        limit: 25,
        media: 'music'
    }


    $.get(
        'https://itunes.apple.com/search', //endpoint
        params,
        function (data) {
            console.log('results', data);
            $('#results').empty();

            //data.items is unique to google books
            for (let result of data.results) {
                $('#results').append(`
                    <div class="card mb-3 bg-secondary text-light">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${result.artworkUrl100}" class="img-fluid rounded-start custom-img"  alt="artwork">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                <h2 class="card-title">${result.artistName}</h2>                                
                                <h5 class="card-text">${result.trackName}</h5>
                                <h6 class="card-text">${result.collectionName ?? ''}</h6>
                                <p class="card-text">Genre: ${result.primaryGenreName}</p>
                                <p class="card-text">Released: ${result.releaseDate.split('T')[0]}</p>
                                <p class="card-text"><small class="text-light">Album Price: ${result.collectionPrice}</small></p>
                                <p class="card-text"><small class="text-light">Track Price: ${result.trackPrice}</small></p>
                                <!-- found via w3-->
                                <audio controls class="track-preview">
                                    <source src="${result.previewUrl}" type="audio/mp4">
                                    Your browser does not support the audio element.
                                </audio>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            }
        },
        'json'
    );
});
    console.log('done loading');
});