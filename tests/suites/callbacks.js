module('Callbacks', {
	setup: function(){},
	teardown: function(){}
});

test('ColumnCallback', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    prepareDayTd: function(td) {
						td.addClass("added-class");
						return td;
                    }
                }),
        dp = input.data('datepicker'),
        picker = dp.picker;

	var addedClasses = picker.find('.datepicker-days tbody td.added-class');
	var tds = picker.find('.datepicker-days tbody td');

	// Number of tds should equal number of added classes
	equal(addedClasses.length, tds.length);

	// Should be the same after an update
	var addedClassesAfterUpdate = picker.find('.datepicker-days tbody td.added-class');
	var tdsAfterUpdate = picker.find('.datepicker-days tbody td');
	dp.update();
	equal(addedClassesAfterUpdate.length, tdsAfterUpdate.length);
});

test('ColumnArguments', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2013-04-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    prepareDayTd: function(td, date) {
						// Every tuesday
						if (date.getDay() == 2)
							td.addClass("tuesday");
						return td;
                    }
                }),
        dp = input.data('datepicker'),
        picker = dp.picker;

	var tuesdayTds = picker.find('.datepicker-days tbody td.tuesday');

	// 2013-04 has 5 tuesdays, and bootstrap-datepicker adds 1 extra row for 2013-04
	equal(tuesdayTds.length, 6);
});
