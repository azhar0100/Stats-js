Object.prototype.extend = function (extension) {
	var hasOwnProperty = Object.hasOwnProperty;
	var object = Object.create(this);

	for (var property in extension)
		if (hasOwnProperty.call(extension, property) ||
			typeof object[property] === "undefined")
				object[property] = extension[property];

	return object;
};

Object.prototype.add = function( extension ){
	for (var property in extension )
		this[ property ] = extension[ property ];
	return this;
};

Object.prototype.hasProperty = function( property ){
	var hasOwnProperty = Object.hasOwnProperty;
	if( hasOwnProperty( this, property ) )
		return true;
	else
		return this.prototype.hasProperty( property );
};
Object.prototype.bindMethods = function(){
	var obj = this;
	for(var prop in obj)
		if( typeof prop === 'function' )
			prop = prop.bind(obj);
}
Function.prototype.selfThisify = function(){
	var fun = this;
	fun = fun.bind(fun);	
}

function toType (obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function log10( val ){
	return Math.log(val) / Math.LN10;		
}

(function( window ){

	var Stats = {};

		Stats.Classes = {

			PkgManager : {

				packages:[],

				BootController: {} ,

				add : function add( pkg ){
					/*+++Error Handling code to be added here in the future+++*/
					this.packages.push( pkg );
					if( pkg.type === 'Group' ){
						for (var i = 0; i < pkg.packages.length; i++) {
							test(pkg.packages[i]);
						};
					};
					function test( pkg ){
						if( pkg.type === 'BootControl' )						
						this.BootController = pkg;
					}
				};,
				query : function query(pkgName){
					/*
					This is a function that will be used by packages to refer to other packages.
					Packages using heirarichal structure will use the '.' as seperator'
					 */
					
					function query(pkgName,packages){

						if(typeof packages === 'undefined' )
							packages = this.packages;

						if( pkgName.indexOf('.') === -1 ){
							for (var i = 0; i < packages.length; i++) {
								if(packages[i].name === pkgName)
									return packages[i];
							}
							return false;
						}else{
							var str = pkgName.split('.',1);
							return query( str[1] , str[0].packages );
						}			
					}
				}
			},

			Iterate : function Iterate( Classes, functions , params){
				var space = {};
				for(var i = 0 ; i < Classes.length; i++){
					var classes = Classes[i];
					for(var j = 0 ; j<functions.length ; j++ )
						functions[j]( Classes , space , params );
				}
			},

			create: function( params ){

				var classes = [];
				for (var i = 0; i < params.classDoc.length; i++) {
					classes[i]={};
					classes[i].add(params.classDoc[i]);
				}

				var PkgManager = this.PkgManager;

				var core = {
					name     :  'core',	
					type :  'Group',
					packages : [
						{
							name : 'core.main',
							type : 'BootControl',
							run : function( params ){
								this.iterate( classes, [PkgManager.query('core.iterate')] , params );
							}
						},
						{
							name : 'core.iterate',
							type : 'Bootstrap',
							run  : function( clas, space, params ){
								clas.lowerBoundary = clas.lowerLimit - 0.5;
								clas.upperBoudary  = clas.upperLimit + 0.5;
								clas.midPoint = clas.lowerBoundary + clas.upperLimit;
								clas.elements = [];
								for (var i = 0; i < params.dataArray.length; i++) {
									if( clas.lowerLimit <= params.dataArray[i] >= clas.upperLimit )
										clas.elements.push(params.dataArray[i]);
								}
							}
						}
					]
				};
				PkgManager.add(core);

				PkgManager.BootController.run();
			}
		};

	Stats.Classes.create = Stats.Classes.create.bind(Stats.Classes);
	Stats.Classes.PkgManager.bindMethods();


	window.Stats = Stats;

})( window );



function test(){
	var St1 = Stats.Classes.create({
		classDoc:[
			{
				lowerLimit:1,
				upperLimit:5
			},
			{
				lowerLimit:6,
				upperLimit:10
			}

		]
	});
	window.St1 = St1;
}
debugger;