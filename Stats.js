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

function toType (obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function log10( val ){
	return Math.log(val) / Math.LN10;		
}

(function( window ){

	var Stats = {

		Classes : {

			PkgManager : {
				packages:[],
				/*
				#EXPERIMENTAL#
				Package manager is a way to make the classes construct extensible.
				This way the Classes module could be spread over several files or areas.
				The Packages object will be containing some expected constructs.
				It will have a 'level parameter' that can be used to optimize performance.
				Some packages will have to access the classes objects as a whole while some
				of them will not do more than do a one time property manipulation.
				Care must be taken to not introduce modules which are very small(that will cause maintnance to be hard) 
				or modules which are very large(beats the purpose of this PackageManager).
				*/

				add : function add( pkg ){
					/*+++Error Handling code to be added here in the future+++*/
					this.packages.push( pkg );
				},
			},

			Iterator : function Iterator( ClassObjects, bufferOperations ){
				for(var i = 0 ; i < ClassObjects.length; i++){
					var collectiveSpace = {};
					var bufer = ClassObjects[i];
					for(var j = 0 ; j<bufferOperations.length ; j++ )
						bufferOperations[j]( bufer,collectiveSpace );
				}
				return collectiveSpace;
			},

			create: function( params ){

				var core			
			}
		},

		paramsHandler:function( params , type){
			if( type === "Classes" ){
				var output = params.Classes;

				output.dataArray = params.dataArray;

				if( "Mean" in params )
					if( "Arithmetic" in params.Mean )
						if( "assumedMean" in params.Mean.Arithmetic ){
							output.assumedMean = params.Mean.Arithmetic.assumedMean;
							if( "commonFactor" in params.Mean.Arithmetic )
								output.commonFactor = params.Mean.Arithmetic.commonFactor;
						}

				return output;
			}
		},

		create:function( params ){

			var Obj = {};
			Obj = this.extend({
				Classes : this.Classes.create.call( this.Classes, this.paramsHandler( params , "Classes") )
			});
			return Obj;
		}
	};

	Stats.create = Stats.create.bind(Stats);

	window.Stats = Stats;

})( window );



function test(){
	var St1 = Stats.create({
		dataArray:[ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 ],
		Classes:{
			create : true,
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
		},
		Mean:{
			Arithmetic:{
				assumedMean: 5
			}
		},
	});
	window.St1 = St1;
}
debugger;