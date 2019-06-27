
function list(){
	return recipes.map(function(r){
		return '<div>'+
					//'<img src="'+r['image-src']+'">'+
					'<div class="ing-chart">'+
						bar(r, 'farine')+bar(r, 'sucre')+bar(r, 'beurre')+bar(r, 'oeuf')+
					'</div>'+
					//'<div>'+r.title+'</div>'+
					'<div><a target="_blank" href="'+r.url+'" class="r-title">'+r.title+'</a></div>'+
					'<div class="votes">'+
						(r.votes?(stars(r.score)+' ('+r.votes+' votes)'):'(0 votes)')+
					'</div>'+
					'<div class="xtra">'+
						r.description+
					'</div>'+
				'</div>';
	}).join('');
}
function stars(n){
	return Array(n+1).join('★')
}
var usNames={
	'farine': 'flour',
	'sucre': 'sugar',
	'beurre': 'butter',
	'oeuf': 'egg',
}
function bar(r, name){
	var n=Math.round(r['pc_'+name]);
	return '<div class="bar" style="height:'+n+'px;"><div>'+n+'% '+usNames[name]+'</div></div>'
}

function render(){
	document.getElementById('m-list').innerHTML = list();
}

var prevSort='';
function sort(n){
	var fnSort;

	if(n==='title'){
		fnSort = function(a, b){
			return a.title.localeCompare(b.title);
		}
	}else if(n==='score'){
		fnSort = function(a, b){
			return (1000*b[n]+b.votes) - (1000*a[n]+a.votes);
		}
	}else{
		fnSort = function(a, b){
			return b[n] - a[n];
		}
	}

	if(prevSort==n){
		recipes.sort(function(a,b){return -1*fnSort(a,b)});
		prevSort=n+'-asc';
	}else{
		recipes.sort(fnSort);
		prevSort=n;
	}
	render();
}

document.addEventListener("DOMContentLoaded", function(event) { 
  render();
});
