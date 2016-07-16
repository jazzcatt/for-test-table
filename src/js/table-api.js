'use strict'
import $ from 'jquery';
import pagin from './pagination.js';

const URL = 'https://pure-island-2586.herokuapp.com/v1/customers';
var checkedElems = [];

function createTable(data) {

	let table = document.getElementById('table');
	let tbody = document.createElement('tbody');
	tbody.id = 'data';

	//redraw table if table contains old data

	if(table.contains(document.getElementById('data'))) {
		table.removeChild(document.getElementById('data'));
	}

	if(data.results.length) {
	let props = Object.keys(data.results[0]);

	for(let i = 0; i<data.results.length; i++) {
		
		let tr = document.createElement('tr');
		tr.id = data.results[i]._id;

		for(let j = 1; j<props.length+2; j++) {
			let td = document.createElement('td');
			if(j<props.length) {
				td.textContent = data.results[i][props[j]];
				tr.appendChild(td);
			} else {

				// add 2 cells for controls

				if(j == props.length) {
	            	let checkBox = document.createElement('input');
	            	checkBox.type = 'checkbox';
			    	td.appendChild(checkBox)
				} else {
			   		let button = document.createElement('input');
					button.type = 'button';
					button.value = 'Get Id';
					td.appendChild(button);
				}
				tr.appendChild(td);
			}
		}	
	tbody.appendChild(tr);	
	}

	document.getElementById('table').appendChild(tbody);
  }

}
/*
/ returns checked rows in the table
/ params (Object) event object checkbox change
*/
function addCheckedElem(e) {
	let elem = e.target;
    let row = elem.closest('tr');

    if(elem.checked){	
    	let elemData = '';

    	elemData = '  '+row.children[0].textContent+' '+row.children[1].textContent;
    	elemData +=' : '+ row.id;
    	row.classList.add('check-row');
        checkedElems.push(elemData);
    }else{
        checkedElems.splice(elem.closest('tr').id, 1);
        row.classList.remove('check-row');
    }
}

function showCheckedElems() {
	alert(checkedElems);
}

/*
/ gets data through ajax. pass got data in create table
/ params q - search param. limit - count  data notes getting, 
/ offset - value from wich start sampling
*/
function getData(q = pagin.q, limit = pagin.limit, offset = pagin.offset) {

	let requestKeys = {};
	requestKeys.limit = limit;
	requestKeys.offset = offset;
	q ? requestKeys.q = q : null;

	 // block navigation buttons until get data
	pagin.toggleNav(false);
	$.ajax({
		type: 'GET',
  		url: URL,
 		data: requestKeys,
 		success: (data) => { pagin.toggleNav(true);  createTable(data); },
  });
}


var table_api = {};
table_api.createTable = createTable;
table_api.addCheckedElem = addCheckedElem;
table_api.showCheckedElems = showCheckedElems;
table_api.getData = getData;
export default table_api;