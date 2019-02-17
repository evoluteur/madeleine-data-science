var cs={
	'Oeuf': 'background-color:#0288D1;',
	'Farine': 'background-color:#689F38;',
	'Sucre': 'background-color:#AA00FF;',
	'Beurre': 'background-color:#FFA000;',
}
function list(){
	var color;
	return ingredients.map(function(r){
		return '<div>'+
					'<div class="iTitle"><span>'+r.count+'</span> '+
						'<span>'+percent(r.count)+'</span> '+
						r.name+
					'</div>'+
					'<div class="hh-bar">'+
						'<div class="h-bar" style="width:'+(r.count*3)+'px;'+(cs[r.name]||'')+'"></div>'+
					'</div>'+
				'</div>';
	}).join('');
}

function percent(x){
	return (x/1.57).toFixed(1)+'%'
}
function render(){
	document.getElementById('i-list').innerHTML = list();
}

var prevSort='';
function sort(n){
	var fnSort;

	if(n==='name'){
		fnSort = function(a, b){
			return a.name.localeCompare(b.name);
		}
	}else{
		fnSort = function(a, b){
			return b.count-a.count;
		}
	}
	if(prevSort==n){
		ingredients.sort(function(a,b){return -1*fnSort(a,b)});
		prevSort=n+'-asc';
	}else{
		ingredients.sort(fnSort);
		prevSort=n;
	}
	render();
}

render();

