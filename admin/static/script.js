const date = new Date()

$(document).ready(function () {

    var myTable = $('#myTable')
    $(".cancel-button").click(function () {
        event.preventDefault();
        $("#popup-form").css({ 'display': 'none' })
    })
    
    $('#myTable').DataTable({
        "ajax": {
            "url": "http://127.0.0.1:3000/api/data",
            "dataSrc": ''
        },
        "columnDefs": [
            { "orderable": false, "targets": 12 },
            { "orderable": false, "targets": 13 }
        ],
        "columns": [
            { "data": "first_name" },
            { "data": "last_name" },
            { "data": "email" },
            { "data": "phone" },
            { "data": "country" },
            { "data": "city" },
            { "data": "10th_marks" },
            { "data": "12th_marks" },
            { "data": "req_branch" },
            {
                "data": "dob",
                render: function (data, type, row) {
                    var date = new Date(data);
                    return date.toLocaleDateString();
                }
            },
            { "data": "appointment_time" },
            {
                "data": "appointment_date",
                render: function (data, type, row) {
                    var date = new Date(data);
                    if (date == "Invalid Date") {
                        return "00-00-0000"
                    }
                    return date.toLocaleDateString();
                }
            },
            {
                "data": null,
                "ordering": false,
                render: function (data, type, row) {

                    return '<button id="appointBtn" class="btn btn-primary" data-id="' + row.id + '">Appoint</button>';
                }
            },
            {
                "data": null,
                "ordering": false,
                render: function (data, type, row) {

                    return '<button id="rejectBtn" class="btn btn-danger" data-id="' + row.id + '">Reject</button>';
                }
            }
        ],

        // Appoint Button code
        "createdRow": function (row, data, dataIndex) {
            $(row).on('click', '#appointBtn', function () {

                var id = $(this).data('id');
                var name = $(this).data('fname')
                var dob = new Date(data.dob);

                $('#fname').val(data.first_name);
                $('#lname').val(data.last_name);
                $('#email').val(data.email);
                $('#phone').val(data.phone);
                $('#country').val(data.country);
                $('#city').val(data.city);
                $('#10th').val(data["10th_marks"]);
                $('#12th').val(data["12th_marks"]);
                $('#branch').val(data.req_branch);
                $('#dob').val(dob.toLocaleDateString());
                $('#popup-form').fadeIn();
                $('.timepicker').timepicker({
                    timeFormat: 'hh:mm p',
                    interval: 30,
                    minTime: '10:00am',
                    maxTime: '06:00pm',
                    defaultTime: '10',
                    startTime: '10',
                    dynamic: false,
                    dropdown: true,
                    scrollbar: true
                });
                // console.log(data)
            });

            // Reject Button Code
            $(row).on('click', '#rejectBtn', function () {
                var emailData = {
                    email: data.email
                }
                $.ajax({
                    type: "DELETE",
                    url: "http://127.0.0.1:3000/api/delete",
                    data: JSON.stringify(emailData),
                    contentType: "application/json",
                    success: function (res) {
                        // location.reload();
                    },
                    error: function (xhr, status, error) {
                        console.error(xhr.responseText); // log any errors
                    }
                });
                location.reload();
                console.log(data.email)
            });
        }

    });
});

