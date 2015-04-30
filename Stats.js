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

			create: function( params ){

				var classes = [];
				var constants = {
					sumOfFreq : 0 ,
					productOfFreq : 0,
					sumOfFx:0,
					sumOfFd:0,
					sumOfFu:0,
					sumOfFlogX:0,
					sumOfFReciX:0,	
				};

				for(var i = 0 ; i< params.classDoc.length; i++){

					var clas = {};
                    classes[i] = clas ;
					clas.lowerLimit = params.classDoc[i].lowerLimit;
					clas.upperLimit = params.classDoc[i].upperLimit;
					clas.lowerBoundary=clas.lowerLimit-0.5;
					clas.upperBoundary=clas.upperLimit+0.5;
					clas.midPoint=(clas.lowerLimit+clas.upperLimit)/2;
					clas.classSize=clas.upperBoundary-clas.lowerBoundary;
					clas.classElements = [];


					for( var j = 0 ; j < params.dataArray.length ; j++ )
						if( params.dataArray[j] >= params.classDoc[i].lowerLimit  &&
						  params.dataArray[j] <= params.classDoc[i].upperLimit )
							clas.classElements.push( params.dataArray[j] );

					clas.freq = clas.classElements.length;
					clas.fx = clas.freq * clas.midPoint ;

					if( "assumedMean" in params  ){

						clas.devi = clas.midPoint - params.assumedMean;
						clas.fD = clas.devi * clas.frequency ;

						if( "commonFactor" in params ){
							clas.u = clas.midPoint / params.commonFactor ;
							clas.fu = clas.u * clas.frequency ;
						}

					}


					clas.logX = window.log10( clas.midPoint );
					clas.fLogX = clas.freq * clas.logX;

					clas.reciX = 1 / clas.midPoint ;
					clas.fReciX = clas.reciX * clas.freq;


					constants.sumOfFreq += clas.freq;
					clas.cumulativFreq = constants.sumOfFreq;

					constants.sumOfFx += clas.fx;

					constants.productOfFreq  *= clas.freq;

					constants.sumOfFx += clas.fx;

					constants.sumOfFd += clas.fD;

					constants.sumOfFu += clas.fu;

					constants.sumOfFlogX += clas.fu;

					constants.sumOfFReciX += clas.fReciX;	

				}
				return this.extend({	
					classes :  classes,

					Constants: constants,

				});
			}
		},
		Mean:{
			Aritmetic:{
				create:function( params ){},
			},
			Geometric:{
				create:function( params ){},
			},
			Harmonic:{
				create:function( params ){},
			},
			create:function( params ){
				var Obj = {};
				if( "Arithmetic" in params )
					this.Arithmetic.create( params.Arithmetic );
				if(  )
				return this.extend({
					Arithmetic:this.Arithmetic.create( params.Arithmetic ),
					Geometric:this.Geometric.create( params.Geometric ),
					Harmonic:this.Harmonic.create( params.Harmonic ),
				});
			}
		}

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