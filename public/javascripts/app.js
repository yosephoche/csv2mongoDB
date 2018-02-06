$(function(){
    // fetch function
    function fetchData() {
        return $.get('/fetchdata', (data) => {
            let products = data['data'];
            $('#trdata').html('');
            $('#message').hide();
            let string = '';
            $.each(products, (index, product) => {
                string += '<tr><td>'+(index+1)+'</td><td>'+product['_id']+'</td><td>'+product['name']+'</td><td>'+product['category']+'</td><td>'+product['price']+'</td><td>'+product['manufacturer']+'</td></tr>';
            });
    
            $('#trdata').html(string);
        })
    }

    // fetch button click
    $('#fetchdata').on('click', () => {
        fetchData();
    })

    // import data button click
    $('#importdata').on('click', () => {
        $('input[type=file]').trigger('click');
    })

    // import csv proses
    $('input[type=file]').change(() => {
        // Get form
        var form = $('#import-form')[0];

        // Create an FormData object
        var data = new FormData(form);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/import2",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                $('#message').show().html(data['success'])
                fetchData();
            }
        });
    });
})