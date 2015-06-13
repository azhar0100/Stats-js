PkgManager : {

	packages:[],

	BootController: {} ,	

	add : function add( pkg ){

		this.packages.push( pkg );

		if( pkg.type === 'Group' ){
			for (var i = 0; i < pkg.packages.length; i++) {
				add(pkg.packages[i]);
			}
		};
		
		if( pkg.type === 'BootControl' )						
			this.BootController = pkg;
		if( pkg. )
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