'use strict'

import $ from 'jquery';
import tableApi from './table-api';
import pagin from './pagination';

$(document).ready(function () {
	tableApi.getData(pagin.q, pagin.limit, pagin.offset);
	pagin.pagInit();

	$('#search').keyup((e) => {
		if(e.keyCode == 32) return;
		else if($(e.target).val()) tableApi.getData($(e.target).val());                             
		else tableApi.getData(pagin.q, pagin.limit, pagin.offset);
	});

	$('#table').click((e) => { 
		if(e.target.type == 'button') {
		alert(e.target.closest('tr').id);
		} else if(e.target.type == 'checkbox') {
		tableApi.addCheckedElem(e);
		}
	});

	$('#show-but').click(() => {tableApi.showCheckedElems()});

	$('#nav').click((e) => {
		$('#search').val('');

		let direct = e.target.id;
		pagin.changePage(direct);
		});
	});



