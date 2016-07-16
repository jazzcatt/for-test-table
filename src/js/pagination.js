'use strict'
import $ from 'jquery';
import tableApi from './table-api';

var limit = 10;
var offset = 0;
var q = null;
var page = 1;

/*
/ bloks navigation buttons untill not server request
*/
function toggleNav(flag) {
	if(flag) {
		$('.digit').prop('disabled', false);
	} else {
		$('.digit').prop('disabled', true);
	}
}

function pagInit() {
	$("input[type='button'][value='1']").addClass('current-page');
	
}

/*
/ changes view current page
*/
function marckChangePage() {
	$('.digit').map((i, elem) => {$(elem).removeClass('current-page')});
	$("input[type='button'][value='"+page+"']").addClass('current-page');
}

/*
/ changed current page according to direction,
/ run function of fill data for new page
/ params string left, rignt 
*/
function changePage(direct) {
    let prevPage = page;
	if(direct == 'right') {	
		if( page %3 == 0){	
		$('.digit').map((i, elem) => {$(elem).val(+$(elem).val()+3)});
	}
	page += 1;
	offset += limit;
	} else if(direct == 'left'){
		page -= 1;
		if((page) % 3 == 0) {
			$('.digit').map((i, elem) => {$(elem).val(+$(elem).val()-3)});
		} 

		offset -= limit;
	} else {
	    
		offset = limit * (+$('#'+direct).val() -1);
		page = (offset / 10)+1;

	}

	if(page == 1) $('#left').prop('disabled', true);
	else $('#left').prop('disabled', false);

	tableApi.getData(q, limit, offset);
	marckChangePage();
}

var paginaion = {
	limit: limit,
	offset: offset,
	q: q,
	changePage: changePage,
	pagInit: pagInit,
	toggleNav:toggleNav
}

export default paginaion;