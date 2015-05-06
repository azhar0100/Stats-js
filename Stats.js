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

			Iterator = function Iterator( ClassObjects, bufferOperations ){
				for(var i = 0 ; i< ClassObjects.length; i++){
					var collectiveSpace = {},
					var bufer = ClassObjects[i],
					for(var j = 0 ; j<bufferOperations ; j++ )
						bufferOperations[i].func( bufer,collectiveSpace );
				}
				if( arguments.length > 2 )
					this.Iterator.call( this, ClassObjects , arguments[3] );
			};

			create: function( params ){		
				  
				var classes = Object.create(params.classDoc);

				var lowerBoundary = function( bufer ){
					bufer.lowerBoundary = bufer.lowerLimit - 0.5;
				}

				this.Iterator( classes, [lowerBoundary] )

				return this.extend({	
					classes :  classes,

					Constants: constants,

				});
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